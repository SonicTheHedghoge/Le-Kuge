export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category: 'pizza' | 'panuozzo';
  image: string;
  tags?: string[];
}

export interface BusinessInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
  status: string;
  locationLink: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  social: {
    followers: number;
    following: number;
    instagram: string;
    facebook: string;
  };
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}
