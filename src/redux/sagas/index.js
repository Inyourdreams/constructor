import { all } from 'redux-saga/effects';

import coursesSaga from './coursesSaga';
import courseSaga from './courseSaga';
import lessonSaga from './lessonSaga';

export default function* rootSaga() {
  yield all([
    ...coursesSaga,
    ...courseSaga,
    ...lessonSaga,
  ]);
}
