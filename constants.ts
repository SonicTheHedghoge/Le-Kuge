import { BusinessInfo, MenuItem } from './types';

export const BUSINESS_INFO: BusinessInfo = {
  name: "Le Kugé – Pizzeria & Panuozzo",
  address: "En face de Papagallo, Route du Phare, Djerba Midun 4116, Tunisia",
  phone: "24 960 703",
  email: "lekuge4116@gmail.com",
  status: "Actuellement ouvert",
  locationLink: "https://maps.google.com/?q=Le+Kuge+Djerba",
  coordinates: { lat: 33.807, lng: 11.0 }, // Approx for Djerba
  social: {
    followers: 694,
    following: 17,
    instagram: "https://www.instagram.com/le_kuge_pizzeria/",
    facebook: "https://www.facebook.com/profile.php?id=61578169405923"
  }
};

export const LOGO_URL = "https://i.ibb.co/jk6D0g2n/grok-image-a969fa80-b630-411b-985f-3c8e998a2712.jpg";

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'p1',
    name: "Margherita D.O.P",
    description: "San Marzano tomato sauce, fresh mozzarella di bufala, basil, extra virgin olive oil.",
    price: "18 TND",
    category: 'pizza',
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80",
    tags: ['Vegetarian', 'Classic']
  },
  {
    id: 'p2',
    name: "Diavola",
    description: "Spicy salami, tomato sauce, mozzarella, chili oil, black olives.",
    price: "22 TND",
    category: 'pizza',
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80",
    tags: ['Spicy']
  },
  {
    id: 'p3',
    name: "Tartufo e Funghi",
    description: "Truffle cream, wild mushrooms, mozzarella, parmesan shavings.",
    price: "28 TND",
    category: 'pizza',
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
    tags: ['Gourmet', 'Vegetarian']
  },
  {
    id: 'pz1',
    name: "Panuozzo Classico",
    description: "Pizza dough sandwich filled with prosciutto, mozzarella, arugula, and cherry tomatoes.",
    price: "16 TND",
    category: 'panuozzo',
    image: "https://images.unsplash.com/photo-1595295333158-4742f28fbd85?auto=format&fit=crop&w=800&q=80",
    tags: ['Signature']
  },
  {
    id: 'pz2',
    name: "Panuozzo Pollo",
    description: "Grilled chicken, pesto genovese, roasted peppers, melted provolone.",
    price: "19 TND",
    category: 'panuozzo',
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80",
    tags: ['Popular']
  }
];

export const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1920&q=80", // Wood fire oven
  "https://images.unsplash.com/photo-1552539618-7eec9b4d1796?auto=format&fit=crop&w=1920&q=80", // Pizzaiolo hands
];
