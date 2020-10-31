import {
  put,
  takeEvery,
  call,
} from 'redux-saga/effects';

import {
  CREATE_CONSTRUCTOR,
  GET_CONSTRUCTOR,
  GET_CONSTRUCTOR_FULFILLED,
  GET_CONSTRUCTOR_REJECTED,
} from '@types/lesson';

import firebase from '@app-config/firebase';
import {setLoading} from "@actions/index";

const { firestore } = firebase;

function* getLesson({ payload: { courseId, lessonId } }) {
  yield put(setLoading(true));
  try {
    const course = yield call(firestore.getDocument, `courses/${courseId}`);
    yield put({
      type: GET_CONSTRUCTOR_FULFILLED,
      payload: {
        currentCourse: course.data(),
        lesson: course.data().lessons.find(({ id }) => id === +lessonId)
      },
    });
  } catch (error) {
    yield put({
      type: GET_CONSTRUCTOR_REJECTED,
      payload: error,
    });
  } finally {
    yield put(setLoading(false))
  }
}

function* createLesson({ payload: { courseId, lessonId, constructor } }) {
  yield put(setLoading(true));
  try {
    const courseSnapshot = yield call(firestore.getDocument, `courses/${courseId}`);
    const course = courseSnapshot.data();
    const updatedCourse = {
      ...course,
      lessons: course.lessons.map((lessonItem) => {
        if (lessonItem.id !== +lessonId) {
          return lessonItem;
        } else {
          return {
            ...lessonItem,
            constructor,
          };
        }
      })
    };
    // debugger;
    yield call(firestore.setDocument, `courses/${courseId}`, updatedCourse);
  } catch (error) {
    console.error(error)
    // yield put({
    //   type: GET_LESSON_REJECTED,
    //   payload: error,
    // });
  } finally {
    yield put(setLoading(false));
  }
}

function* watchGetLesson() {
  yield takeEvery(GET_CONSTRUCTOR, getLesson);
}

function* watchCreateLesson() {
  yield takeEvery(CREATE_CONSTRUCTOR, createLesson);
}

export default [
  watchGetLesson(),
  watchCreateLesson(),
];
