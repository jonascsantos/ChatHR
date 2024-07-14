import { all } from "redux-saga/effects";
import { watchIncrementAsync } from "@/lib/features/chat/saga";

export function* helloSaga() {
  console.log("Saga initialized");
}

export function* rootSaga() {
  yield all([helloSaga(), watchIncrementAsync()]);
}