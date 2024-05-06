import { CartState } from 'app/pages/Cart/slice/types';
import { HomePageState } from 'app/pages/HomePage/slice/types';
import { OrderState } from 'app/pages/Order/slice/types';
// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

/*
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  cart: CartState;
  homePage: HomePageState;
  order?: OrderState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
