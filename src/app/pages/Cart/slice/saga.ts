/* eslint-disable prettier/prettier */
import { call, put, takeLatest } from "redux-saga/effects";
import { cartActions } from "./index";
import { supabase } from "app/supabaseClient";
import axios from "axios";

function* addItem(action) {
  try {
    // Get user ID and auth token
    const authToken = yield call([supabase.auth, "getSession"]);
    const user_id = authToken?.id;

    const response = yield call(
      axios.post,
      `${process.env.REACT_APP_API_URL}/items`,
      {
        user_id,
        name: action.payload.name,
        price: Number(action.payload.price),
      },
      {
        headers: {
          "Content-Type": "application/json",
          apikey: `${process.env.REACT_APP_API_KEY}`, // replace with your actual API key
          Authorization: `Bearer ${authToken.data.session?.access_token}`,
        },
      },
    );

    const data = response.data;

    if (response.status !== 200) {
      throw new Error(data.error);
    }

    // Dispatch action to update Redux store with the newly added item
    yield put(cartActions.addItem(action.payload));
  } catch (error) {
    console.error("Failed to add item to cart:", error);
  }
}

export function* cartSaga() {
  yield takeLatest(cartActions.addItem.type, addItem);
}
