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
