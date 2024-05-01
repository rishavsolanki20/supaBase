/* --- STATE --- */
export interface CartItem {
  id: bigint;
  name: string;
  price: number;
}

export interface CartState {
  items: CartItem[];
  name: string;
  price: string;
}
