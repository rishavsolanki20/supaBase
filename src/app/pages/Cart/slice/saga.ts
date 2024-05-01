import { call, put, takeLatest } from 'redux-saga/effects';
import { cartActions } from './index';
import { supabase } from 'app/supabaseClient';

function* addItem(action) {
  try {
    // Insert data into the "users" table
    const { data, error } = yield call(
      [supabase.from('items'), 'insert'],
      action.payload,
    );

    if (error) {
      throw error;
    }

    // Dispatch action to update Redux store with the newly added item
    yield put(cartActions.addItem(action.payload));
  } catch (error) {
    console.error('Failed to add item to cart:', error);
  }
}

export function* cartSaga() {
  yield takeLatest(cartActions.addItem.type, addItem);
}
