/* eslint-disable prettier/prettier */
import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios"; // Import Axios

import {
  addToCartFailure,
  addToCartStart,
  addToCartSuccess,
  fetchDataFailure,
  fetchDataStart,
  fetchDataSuccess,
} from "./index";
import { supabase } from "app/supabaseClient";
import { CartItem } from "./types";
import { PayloadAction } from "@reduxjs/toolkit";

function* fetchDataSaga() {
  try {
    console.log("Fetching data start");

    const authToken = yield call([supabase.auth, "getSession"]);
    console.log("Auth token:", authToken);

    const response = yield call(
      axios.post,
      `${process.env.REACT_APP_API_URL}/items`,
      null,
      {
        headers: {
          apikey: `${process.env.REACT_APP_API_KEY}`,
          Authorization: `Bearer ${authToken.data.session?.access_token}`,
        },
      },
    );

    if (response.status === 200) {
      console.log("Fetched data:", response.data.items);
      yield put(fetchDataSuccess(response.data.items));
    } else {
      console.error("Failed to fetch data:", response.statusText);
      yield put(fetchDataFailure());
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    yield put(fetchDataFailure());
  }
}

function* addToCartSaga(action: PayloadAction<CartItem>) {
  try {
    console.log("Adding to cart start");
    const authToken = yield call([supabase.auth, "getSession"]);
    console.log("Auth token:", authToken);

    const response = yield call(
      axios.post,
      `${process.env.REACT_APP_API_URL}/cart`,
      action.payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken.data.session?.access_token}`,
        },
      },
    );

    if (response.status === 200) {
      console.log("Item added to cart successfully!");
      console.log("Added item:", action.payload);
      yield put(addToCartSuccess(action.payload));
    } else {
      console.error("Failed to add item to cart");
      yield put(addToCartFailure());
    }
  } catch (error) {
    console.error("Error adding item to cart:", error);
    yield put(addToCartFailure());
  }
}

export function* homePageSaga() {
  console.log("HomePage saga started");
  yield takeEvery(fetchDataStart.type, fetchDataSaga);
  yield takeEvery(addToCartStart.type, addToCartSaga);
}
