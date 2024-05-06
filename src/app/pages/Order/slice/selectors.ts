import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.order || initialState;

export const selectOrder = createSelector([selectSlice], state => state);
