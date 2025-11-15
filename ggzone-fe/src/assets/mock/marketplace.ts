export interface MarketplaceItem {
  id: string;
  seller_id: string;
  game_id: string;
  name: string;
  description: string;
  image_url: string;
  price: number;
  category: string;
  status: "available" | "sold";
}

export const mockMarketplaceItems: MarketplaceItem[] = [
  {
    id: "1",
    seller_id: "1",
    game_id: "1",
    name: "Neon Sword of Destruction",
    description: "Legendary weapon with 50% damage boost",
    image_url: "⚔️",
    price: 999,
    category: "Weapon",
    status: "available",
  },
  {
    id: "2",
    seller_id: "2",
    game_id: "2",
    name: "Dragon Armor Set",
    description: "Complete armor set with +30 defense",
    image_url: "🛡️",
    price: 1500,
    category: "Armor",
    status: "available",
  },
  {
    id: "3",
    seller_id: "3",
    game_id: "3",
    name: "Gold Sport Skin",
    description: "Exclusive golden car skin for racing",
    image_url: "🏎️",
    price: 599,
    category: "Skin",
    status: "available",
  },
  {
    id: "4",
    seller_id: "4",
    game_id: "4",
    name: "Ultimate Building Bundle",
    description: "Mega bundle with 1000+ building items",
    image_url: "🏰",
    price: 2000,
    category: "Bundle",
    status: "available",
  },
  {
    id: "5",
    seller_id: "5",
    game_id: "5",
    name: "Shadow Cloak",
    description: "Invisibility enhancement gear",
    image_url: "👻",
    price: 799,
    category: "Gear",
    status: "available",
  },
  {
    id: "6",
    seller_id: "1",
    game_id: "1",
    name: "Speed Boost Potion",
    description: "+50% movement speed for 1 hour",
    image_url: "⚡",
    price: 299,
    category: "Consumable",
    status: "available",
  },
];
