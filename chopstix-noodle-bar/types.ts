export type Category = 
  'Appetisers' | 
  'Chicken wing 鸡翅' |
  'Chopstix\'s Special New Dishes 新推荐' |
  'Chef Specials' |
  'Chopstix\'s set' |
  'Dim Sum' |
  'Sweet & Sour Dishes';

export interface Dish {
  type: 'dish';
  id: number;
  name: string;
  description: string;
  price: number;
  category: Category;
  isVegetarian: boolean;
}

export interface MenuHeading {
    type: 'heading';
    id: string;
    title: string;
    subtitle: string;
    category: Category;
}

export type MenuListItem = Dish | MenuHeading;

export interface OrderItem {
  dish: Dish;
  quantity: number;
  remarks?: string;
}

export type Screen = 'home' | 'menu' | 'login' | 'cart' | 'forgot-password' | 'signup' | 'checkout';