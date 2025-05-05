export interface Whiskey {
  id: string;
  name: string;
  type: string;
  origin: string;
  price: number;
  rating: number;
  age?: string;
  abv: number;
  imageUrl: string;
  excerpt: string;
  featured?: boolean;
  fullReview?: string;
  reviewDate?: string;
  character: number;
  complexity: number;
  balance: number;
  finish: number;
  aromas: {
    name: string;
    strength: number;
  }[];
}