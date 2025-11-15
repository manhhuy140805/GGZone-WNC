export interface Group {
  id: string;
  name: string;
  description: string;
  creator_id: string;
  image_url: string;
  member_count: number;
  game_id: string;
}

export const mockGroups: Group[] = [
  {
    id: "1",
    name: "Cyber Legends Pro",
    description: "Competitive team for Cyber Legends. Tournament players only!",
    creator_id: "1",
    image_url:
      "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=100",
    member_count: 45,
    game_id: "1",
  },
  {
    id: "2",
    name: "Fantasy Adventurers",
    description: "Casual guild for Mystic Quest players. All levels welcome!",
    creator_id: "2",
    image_url:
      "https://images.pexels.com/photos/3634539/pexels-photo-3634539.jpeg?auto=compress&cs=tinysrgb&w=100",
    member_count: 128,
    game_id: "2",
  },
  {
    id: "3",
    name: "Speed Racers United",
    description: "Daily racing events and tournaments",
    creator_id: "3",
    image_url:
      "https://images.pexels.com/photos/3550652/pexels-photo-3550652.jpeg?auto=compress&cs=tinysrgb&w=100",
    member_count: 89,
    game_id: "3",
  },
  {
    id: "4",
    name: "Strategic Minds",
    description: "Competitive strategy game group",
    creator_id: "4",
    image_url:
      "https://images.pexels.com/photos/3808517/pexels-photo-3808517.jpeg?auto=compress&cs=tinysrgb&w=100",
    member_count: 234,
    game_id: "4",
  },
  {
    id: "5",
    name: "Shadow Hunters",
    description: "Action game enthusiasts. Experienced players preferred.",
    creator_id: "1",
    image_url:
      "https://images.pexels.com/photos/3587620/pexels-photo-3587620.jpeg?auto=compress&cs=tinysrgb&w=100",
    member_count: 67,
    game_id: "5",
  },
];
