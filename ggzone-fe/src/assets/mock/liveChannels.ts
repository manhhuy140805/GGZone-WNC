export interface LiveChannel {
  id: string;
  name: string;
  game: string;
  category: string;
  thumbnailUrl: string;
  streamerName: string;
  streamerAvatar: string;
  viewers: number;
  isLive: boolean;
  createdAt: string;
}

export const mockLiveChannels: LiveChannel[] = [
  {
    id: "1",
    name: "Fire Strikers#27",
    game: "Playing Valorant",
    category: "FPS",
    thumbnailUrl:
      "https://www.dexerto.com/cdn-image/wp-content/uploads/2024/03/18/53596355649_c8e7bda112_k-1.jpg?width=1200&quality=60&format=auto",
    streamerName: "David Smith",
    streamerAvatar: "https://i.pravatar.cc/150?img=1",
    viewers: 1890,
    isLive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Haunting Shadows#21",
    game: "Beyond the Veil of Fear",
    category: "Horror",
    thumbnailUrl:
      "https://gfn.co.kr/en/games/media/images/screen_gSeVLa3.2e16d0ba.fill-992x558.format-webp.webpquality-50.webp",
    streamerName: "Robin Saint",
    streamerAvatar: "https://i.pravatar.cc/150?img=2",
    viewers: 1203,
    isLive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Flight Captain#56",
    game: "Astrophobia Speedway",
    category: "Racing",
    thumbnailUrl:
      "https://static1.squarespace.com/static/64c947429e47b803dc16c2cc/64c94ad0820fa0476fc3b034/67a102783d76303423a957f0/1738910063155/astro-bot-stellar-speedway-dlc-the-mini-review-v0-1gil5lb0w31e1.jpeg?format=1500w",
    streamerName: "William Alex",
    streamerAvatar: "https://i.pravatar.cc/150?img=3",
    viewers: 1780,
    isLive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Gridiron Glory#12",
    game: "Beyond the Veil of Fear",
    category: "Sports",
    thumbnailUrl:
      "https://static.wixstatic.com/media/259f32_f03b952dcf4d453f9ac760b4089bb3f3~mv2.jpg/v1/fill/w_1600,h_900,al_c/259f32_f03b952dcf4d453f9ac760b4089bb3f3~mv2.jpg",
    streamerName: "David Wilson",
    streamerAvatar: "https://i.pravatar.cc/150?img=4",
    viewers: 2090,
    isLive: true,
    createdAt: new Date().toISOString(),
  },
];
