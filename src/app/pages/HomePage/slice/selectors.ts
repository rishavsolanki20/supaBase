import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './types';

const selectSlice = (state: RootState) => state.homePage || initialState;

export const selectHomePage = createSelector([selectSlice], state => state);
