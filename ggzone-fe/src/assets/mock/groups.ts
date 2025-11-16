export interface Group {
  id: string;
  name: string;
  description?: string;
  coverImageUrl?: string;
  iconUrl?: string;
  visibility: "public" | "private";
  membersCount: number;
  posts: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export const mockGroups: Group[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655660000",
    name: "Gamers VN",
    description: "Vietnam gaming community for all types of gamers",
    coverImageUrl:
      "https://cdn.tgdd.vn/Files/2020/06/08/1261696/moi-tai-bo-hinh-nen-asus-rog-2020-moi-nhat-4_800x450.jpg",
    iconUrl: "https://cdn-icons-png.flaticon.com/512/4712/4712035.png",
    visibility: "public",
    membersCount: 156,
    posts: 230,
    createdBy: "550e8400-e29b-41d4-a716-446655440000",
    createdAt: "2024-01-10T08:30:00Z",
    updatedAt: "2024-11-15T10:20:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655660001",
    name: "FPS Lovers",
    description:
      "Dedicated community for FPS game enthusiasts - Valorant, CS2,...",
    coverImageUrl:
      "https://4kwallpapers.com/images/walls/thumbs/3950.png",
    iconUrl: "https://cdn-icons-png.flaticon.com/512/854/854894.png",
    visibility: "public",
    membersCount: 234,
    posts: 670,
    createdBy: "550e8400-e29b-41d4-a716-446655440001",
    createdAt: "2024-01-20T14:15:00Z",
    updatedAt: "2024-11-15T09:45:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655660002",
    name: "Competitive Esports",
    description: "Tournament preparation and competitive play discussions",
    coverImageUrl:
      "https://www.upwork.com/mc/documents/designelementsavatar2.png",
    iconUrl: "https://cdn-icons-png.flaticon.com/512/994/994393.png",
    visibility: "private",
    membersCount: 45,
    posts: 150,
    createdBy: "550e8400-e29b-41d4-a716-446655440005",
    createdAt: "2024-02-05T11:00:00Z",
    updatedAt: "2024-11-14T16:30:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655660003",
    name: "MOBA Players Unite",
    description: "For League of Legends and DOTA 2 enthusiasts",
    coverImageUrl:
      "https://massivelyop.com/wp-content/uploads/2021/07/pokemon_unite_preparations.jpg",
    iconUrl: "https://cdn-icons-png.flaticon.com/512/942/942748.png",
    visibility: "public",
    membersCount: 89,
    posts: 310,
    createdBy: "550e8400-e29b-41d4-a716-446655440002",
    createdAt: "2024-01-25T09:20:00Z",
    updatedAt: "2024-11-15T12:10:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655660004",
    name: "Casual Gamers Squad",
    description: "Relaxed gaming group for casual players and friends",
    coverImageUrl:
      "https://media.readyplayer.me/nexus/images/Posed-GroupShot.webp",
    iconUrl: "https://cdn-icons-png.flaticon.com/512/262/262831.png",
    visibility: "public",
    membersCount: 512,
    posts: 540,
    createdBy: "550e8400-e29b-41d4-a716-446655440003",
    createdAt: "2024-02-15T13:45:00Z",
    updatedAt: "2024-11-15T11:00:00Z",
  },
];
