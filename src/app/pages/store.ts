/* eslint-disable prettier/prettier */
import { AnyAction, CombinedState, Reducer } from "@reduxjs/toolkit";
import { applyMiddleware, combineReducers, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { createInjectorsEnhancer } from "redux-injectors";
import { rootSaga } from "./saga";
import { homePageReducer } from "./HomePage/slice/index";
import {
  HomePageState,
  initialState as homePageInitialState,
} from "./HomePage/slice/types";

// Define initial state
const initialState: CombinedState<{ homePage: HomePageState }> = {
  homePage: homePageInitialState,
};

// Define root reducer function
const createRootReducer = (
  injectedReducers: { [key: string]: Reducer<any, AnyAction> },
): Reducer<any, AnyAction> => {
  return combineReducers({
    homePage: homePageReducer,
    ...injectedReducers,
  });
};

const sagaMiddleware = createSagaMiddleware();

const enhancers = [
  createInjectorsEnhancer({
    createReducer: createRootReducer,
    runSaga: sagaMiddleware.run,
  }),
];

// Configure Redux store
export const store = createStore(
  createRootReducer({}), // Pass initial reducers
  initialState,
  applyMiddleware(sagaMiddleware),
);

// Run the root saga
sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
