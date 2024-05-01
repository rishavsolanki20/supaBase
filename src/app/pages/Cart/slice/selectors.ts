import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.cart || initialState;

export const selectCart = createSelector([selectSlice], state => state);
