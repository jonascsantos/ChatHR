import { put, takeEvery, call } from "redux-saga/effects";
import { delay } from "@/lib/utils";

export const incrementAsyncRequest = "chat/incrementAsyncRequest";

export function* incrementAsync() {
  try {
    yield call(delay, 1000);
    // yield put(setCurrentChatId());
  } catch {
    console.log("error happened incrementAsync");
  }
}

export function* watchIncrementAsync() {
  yield takeEvery(incrementAsyncRequest, incrementAsync);
}