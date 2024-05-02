import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { cartSaga } from './saga';
import { CartState } from './types';

export const initialState: CartState = {
  items: [],
  name: '',
  price: '',
};

export const slice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<any>) {
      state.items.push(action.payload);
    },
    setItem(state, action: PayloadAction<any>) {
      state.items = action.payload;
    },

    someAction(state, action: PayloadAction<any>) {},
  },
});

export const { actions: cartActions } = slice;

export const useCartSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: cartSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useCartSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
