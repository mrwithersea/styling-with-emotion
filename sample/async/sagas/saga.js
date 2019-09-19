import { takeLatest, delay } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { simpleAction, errorAction, DELAYED_SIMPLE_ACTION } from 'actions';

export function* delayedSimpleAction({ value }) {
  try {
    yield call(delay, 10000);
    yield put(simpleAction(value));
  } catch (error) {
    yield put(errorAction(error));
  }
}

export default function* delayedSimpleActionSaga() {
  yield* takeLatest(DELAYED_SIMPLE_ACTION, delayedSimpleAction);
}
