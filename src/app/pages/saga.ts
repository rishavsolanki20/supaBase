/* eslint-disable prettier/prettier */
import { all } from "redux-saga/effects";
import { homePageSaga } from "./HomePage/slice/saga"; // Import your homePage saga
import { cartSaga } from "./Cart/slice/saga";

// Root saga that combines all individual sagas
export function* rootSaga() {
  yield all([
    homePageSaga(),
    cartSaga(),
  ]);
}
