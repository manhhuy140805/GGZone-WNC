export interface Game {
  id: string;
  name: string;
  slug: string;
  description: string;
  coverImageUrl: string;
  iconUrl?: string;
  genre: string;
  platform: string;
  releaseDate: string;
  publisher: string;
  isActive: boolean;
  createdAt: string;
}

export const mockGames: Game[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655550000",
    name: "Valorant",
    slug: "valorant",
    description:
      "A competitive tactical 5v5 FPS game with unique agent abilities",
    coverImageUrl:
      "https://cmsassets.rgpub.io/sanity/images/dsfx7636/content_organization/731216ff2453134e530feabc9dbd3c44e480e352-1200x625.jpg",
    genre: "FPS",
    platform: "PC",
    releaseDate: "2020-06-02",
    publisher: "Riot Games",
    isActive: true,
    createdAt: "2020-06-02T00:00:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655550001",
    name: "League of Legends",
    slug: "league-of-legends",
    description: "The most popular MOBA game with strategic team fights",
    coverImageUrl:
      "https://cdn1.epicgames.com/offer/24b9b5e323bc40eea252a10cdd3b2f10/EGS_LeagueofLegends_RiotGames_S1_2560x1440-47eb328eac5ddd63ebd096ded7d0d5ab",
    genre: "MOBA",
    platform: "PC",
    releaseDate: "2009-10-27",
    publisher: "Riot Games",
    isActive: true,
    createdAt: "2009-10-27T00:00:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655550002",
    name: "Counter-Strike 2",
    slug: "cs2",
    description: "Counter-Strike 2 - The next evolution of the legendary FPS",
    coverImageUrl:
      "https://wallpapersbq.com/images/counter-strike-2/counter-strike-2-wallpaper-1.webp",
    genre: "FPS",
    platform: "PC",
    releaseDate: "2023-09-01",
    publisher: "Valve",
    isActive: true,
    createdAt: "2023-09-01T00:00:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655550003",
    name: "DOTA 2",
    slug: "dota-2",
    description: "Free-to-play MOBA with a massive esports community",
    coverImageUrl:
      "https://dmarket.com/blog/best-dota2-wallpapers/qop1_hu_867c7cf84c620e27.jpg?_gl=1*1w6dekl*_up*MQ..*_ga*Nzc5NTQxMzE5LjE3NjMyMTE4NzI.*_ga_NER4WDJQ1H*czE3NjMyMTE4NzEkbzEkZzAkdDE3NjMyMTE4NzEkajYwJGwwJGgw",
    genre: "MOBA",
    platform: "PC",
    releaseDate: "2013-07-09",
    publisher: "Valve",
    isActive: true,
    createdAt: "2013-07-09T00:00:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655550004",
    name: "Overwatch 2",
    slug: "overwatch-2",
    description:
      "Team-based FPS with diverse characters and exciting abilities",
    coverImageUrl:
      "https://images8.alphacoders.com/131/1318379.png",
    genre: "FPS",
    platform: "Multi-platform",
    releaseDate: "2022-10-04",
    publisher: "Blizzard Entertainment",
    isActive: true,
    createdAt: "2022-10-04T00:00:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655550005",
    name: "Minecraft",
    slug: "minecraft",
    description: "Creative sandbox game where you can build anything",
    coverImageUrl:
      "https://4kwallpapers.com/images/wallpapers/minecraft-spring-to-3840x2160-21999.jpg",
    genre: "Sandbox",
    platform: "Multi-platform",
    releaseDate: "2011-11-18",
    publisher: "Mojang Studios",
    isActive: true,
    createdAt: "2011-11-18T00:00:00Z",
  },
];

// Additional popular games
export const additionalMockGames: Game[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655550006",
    name: "Apex Legends",
    slug: "apex-legends",
    description: "Fast-paced battle royale with unique legends and abilities",
    coverImageUrl:
      "https://cdn1.epicgames.com/offer/cbd5b3d310a54b12bf3fe8c41994174f/EGS_ApexLegends_RespawnEntertainment_S1_2560x1440-b45d4c5e6e0e9f45e6e8e5e5e5e5e5e5",
    genre: "Battle Royale",
    platform: "Multi-platform",
    releaseDate: "2019-02-04",
    publisher: "Electronic Arts",
    isActive: true,
    createdAt: "2019-02-04T00:00:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655550007",
    name: "Fortnite",
    slug: "fortnite",
    description: "Popular battle royale with building mechanics",
    coverImageUrl:
      "https://cdn2.unrealengine.com/fortnite-chapter-4-season-1-key-art-3840x2160-3840x2160-e5e5e5e5e5e5.jpg",
    genre: "Battle Royale",
    platform: "Multi-platform",
    releaseDate: "2017-07-25",
    publisher: "Epic Games",
    isActive: true,
    createdAt: "2017-07-25T00:00:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655550008",
    name: "Rocket League",
    slug: "rocket-league",
    description: "Soccer meets racing in this high-octane sports game",
    coverImageUrl:
      "https://cdn1.epicgames.com/offer/9773aa1aa54f4f7b80e44bef04986cea/EGS_RocketLeague_PsyonixLLC_S1_2560x1440-e5e5e5e5e5e5",
    genre: "Sports",
    platform: "Multi-platform",
    releaseDate: "2015-07-07",
    publisher: "Psyonix",
    isActive: true,
    createdAt: "2015-07-07T00:00:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655550009",
    name: "Rainbow Six Siege",
    slug: "rainbow-six-siege",
    description: "Tactical FPS with destructible environments",
    coverImageUrl:
      "https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/e5e5e5e5e5e5/rainbow-six-siege.jpg",
    genre: "FPS",
    platform: "Multi-platform",
    releaseDate: "2015-12-01",
    publisher: "Ubisoft",
    isActive: true,
    createdAt: "2015-12-01T00:00:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655550010",
    name: "Among Us",
    slug: "among-us",
    description: "Social deduction game with crewmates and impostors",
    coverImageUrl:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/945360/header.jpg",
    genre: "Party",
    platform: "Multi-platform",
    releaseDate: "2018-06-15",
    publisher: "Innersloth",
    isActive: true,
    createdAt: "2018-06-15T00:00:00Z",
  },
];
