export interface CartItem {
  id: string;
  name: string;
  price: number;
}

export interface HomePageState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
}

export const initialState: HomePageState = {
  items: [],
  loading: false,
  error: null,
};
