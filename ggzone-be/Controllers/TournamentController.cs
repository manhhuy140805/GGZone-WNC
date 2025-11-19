using ggzone_be.Data;
using ggzone_be.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ggzone_be.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TournamentController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TournamentController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/tournament
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetTournaments(
            [FromQuery] string? status = null,
            [FromQuery] Guid? gameId = null)
        {
            var query = _context.Tournaments.AsQueryable();

            if (!string.IsNullOrEmpty(status))
                query = query.Where(t => t.Status == status);

            if (gameId.HasValue)
                query = query.Where(t => t.GameId == gameId);

            var tournaments = await query
                .OrderByDescending(t => t.StartDate)
                .Include(t => t.Game)
                .Include(t => t.Creator)
                .Select(t => new
                {
                    t.Id,
                    t.Name,
                    t.Description,
                    t.CoverImageUrl,
                    t.StartDate,
                    t.EndDate,
                    t.MaxParticipants,
                    t.CurrentParticipants,
                    t.PrizePool,
                    t.Status,
                    t.CreatedAt,
                    Game = t.Game != null ? new
                    {
                        t.Game.Id,
                        t.Game.Name,
                        t.Game.IconUrl
                    } : null,
                    Creator = t.Creator != null ? new
                    {
                        t.Creator.Id,
                        t.Creator.Username,
                        t.Creator.AvatarUrl
                    } : null
                })
                .ToListAsync();

            return Ok(tournaments);
        }

        // GET: api/tournament/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<object>> GetTournament(Guid id)
        {
            var tournament = await _context.Tournaments
                .Include(t => t.Game)
                .Include(t => t.Creator)
                .Where(t => t.Id == id)
                .Select(t => new
                {
                    t.Id,
                    t.Name,
                    t.Description,
                    t.CoverImageUrl,
                    t.StartDate,
                    t.EndDate,
                    t.MaxParticipants,
                    t.CurrentParticipants,
                    t.PrizePool,
                    t.Status,
                    t.CreatedAt,
                    Game = t.Game != null ? new
                    {
                        t.Game.Id,
                        t.Game.Name,
                        t.Game.IconUrl
                    } : null,
                    Creator = t.Creator != null ? new
                    {
                        t.Creator.Id,
                        t.Creator.Username,
                        t.Creator.FullName,
                        t.Creator.AvatarUrl
                    } : null
                })
                .FirstOrDefaultAsync();

            if (tournament == null)
                return NotFound();

            return Ok(tournament);
        }

        // POST: api/tournament
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Tournament>> CreateTournament([FromBody] Tournament tournament)
        {
            tournament.Id = Guid.NewGuid();
            tournament.CreatedAt = DateTime.UtcNow;
            tournament.CurrentParticipants = 0;

            _context.Tournaments.Add(tournament);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTournament), new { id = tournament.Id }, tournament);
        }

        // GET: api/tournament/{id}/participants
        [HttpGet("{id}/participants")]
        public async Task<ActionResult<IEnumerable<object>>> GetParticipants(Guid id)
        {
            var participants = await _context.TournamentParticipants
                .Where(tp => tp.TournamentId == id)
                .Include(tp => tp.User)
                .OrderBy(tp => tp.Rank ?? int.MaxValue)
                .ThenByDescending(tp => tp.Score)
                .Select(tp => new
                {
                    tp.Id,
                    tp.Rank,
                    tp.Score,
                    tp.JoinedAt,
                    User = new
                    {
                        tp.User.Id,
                        tp.User.Username,
                        tp.User.FullName,
                        tp.User.AvatarUrl
                    }
                })
                .ToListAsync();

            return Ok(participants);
        }

        // POST: api/tournament/{id}/join
        [HttpPost("{id}/join")]
        [Authorize]
        public async Task<ActionResult> JoinTournament(Guid id, [FromBody] TournamentParticipant participant)
        {
            var tournament = await _context.Tournaments.FindAsync(id);
            if (tournament == null)
                return NotFound();

            if (tournament.Status != "upcoming")
                return BadRequest("Tournament is not open for registration");

            if (tournament.CurrentParticipants >= tournament.MaxParticipants)
                return BadRequest("Tournament is full");

            var existing = await _context.TournamentParticipants
                .FirstOrDefaultAsync(tp => tp.TournamentId == id && tp.UserId == participant.UserId);

            if (existing != null)
                return BadRequest("Already joined");

            participant.Id = Guid.NewGuid();
            participant.TournamentId = id;
            participant.JoinedAt = DateTime.UtcNow;
            participant.Score = 0;

            _context.TournamentParticipants.Add(participant);
            
            tournament.CurrentParticipants++;
            await _context.SaveChangesAsync();

            return Ok(new { message = "Successfully joined tournament" });
        }

        // DELETE: api/tournament/{id}/leave
        [HttpDelete("{id}/leave")]
        [Authorize]
        public async Task<ActionResult> LeaveTournament(Guid id, [FromQuery] Guid userId)
        {
            var participant = await _context.TournamentParticipants
                .FirstOrDefaultAsync(tp => tp.TournamentId == id && tp.UserId == userId);

            if (participant == null)
                return NotFound();

            var tournament = await _context.Tournaments.FindAsync(id);
            if (tournament?.Status != "upcoming")
                return BadRequest("Cannot leave tournament after it has started");

            _context.TournamentParticipants.Remove(participant);
            
            if (tournament != null)
            {
                tournament.CurrentParticipants--;
            }
            
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // PUT: api/tournament/{id}/status
        [HttpPut("{id}/status")]
        [Authorize]
        public async Task<ActionResult> UpdateTournamentStatus(Guid id, [FromBody] string status)
        {
            var tournament = await _context.Tournaments.FindAsync(id);
            if (tournament == null)
                return NotFound();

            tournament.Status = status;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // PUT: api/tournament/{id}
        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult> UpdateTournament(Guid id, [FromBody] Tournament updatedTournament)
        {
            var tournament = await _context.Tournaments.FindAsync(id);
            if (tournament == null)
                return NotFound();

            tournament.Name = updatedTournament.Name;
            tournament.Description = updatedTournament.Description;
            tournament.CoverImageUrl = updatedTournament.CoverImageUrl;
            tournament.StartDate = updatedTournament.StartDate;
            tournament.EndDate = updatedTournament.EndDate;
            tournament.MaxParticipants = updatedTournament.MaxParticipants;
            tournament.PrizePool = updatedTournament.PrizePool;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/tournament/{id}
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult> DeleteTournament(Guid id)
        {
            var tournament = await _context.Tournaments.FindAsync(id);
            if (tournament == null)
                return NotFound();

            _context.Tournaments.Remove(tournament);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
