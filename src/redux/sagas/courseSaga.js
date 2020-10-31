import {
  put,
  takeEvery,
  call,
} from 'redux-saga/effects';

import {
  GET_LESSONS,
  GET_LESSONS_FULFILLED,
  GET_LESSONS_REJECTED,
  CREATE_LESSON,
  CREATE_LESSON_FULFILLED,
  CREATE_LESSON_REJECTED,
  DELETE_LESSON,
  DELETE_LESSON_FULFILLED,
  DELETE_LESSON_REJECTED,
  DUPLICATE_LESSON,
  DUPLICATE_LESSON_FULFILLED,
  DUPLICATE_LESSON_REJECTED,
} from '@types/lessons';

import firebase from '@app-config/firebase';

const { firestore } = firebase;

function* getLessons({ payload: { courseId } }) {
  try {
    const course = yield call(firestore.getDocument, `courses/${courseId}`);
    yield put({
      type: GET_LESSONS_FULFILLED,
      payload: course.data(),
    });
  } catch (error) {
    yield put({
      type: GET_LESSONS_REJECTED,
      payload: error,
    });
  }
}

function* createLesson({ payload: { courseId, lesson }}) {
  try {
    const courseSnapshot = yield call(firestore.getDocument, `courses/${courseId}`);
    const course = courseSnapshot.data();
    let updatedLessons;
    if (!course.lessons.length) {
      updatedLessons = [{
        id: 0,
        constructor: [{
          id: 0,
          name: 'Название страницы',
          pageState: [],
        }],
        ...lesson,
      }];
    } else {
      updatedLessons = [
        ...course.lessons,
        {
          id: course.lessons[course.lessons.length - 1].id++,
          constructor: [{
            id: 0,
            name: 'Название страницы',
            pageState: [],
          }],
          ...lesson,
        }
      ];
    }
    yield call(firestore.setDocument, `courses/${courseId}`, {
      ...course,
      lessons: updatedLessons,
    });
    yield call(getLessons,{ payload: { courseId } });
    yield put({
      type: CREATE_LESSON_FULFILLED,
    });
  } catch (error) {
    yield put({
      type: CREATE_LESSON_REJECTED,
      payload: error,
    });
  }
}

function* deleteLesson({ payload: { courseId, lessonId }}) {
  try {
    const courseSnapshot = yield call(firestore.getDocument, `courses/${courseId}`);
    const course = courseSnapshot.data();
    const updatedLessons = course.lessons.filter(({ id }) => lessonId !== id);
    yield call(firestore.setDocument, `courses/${courseId}`, {
      ...course,
      lessons: updatedLessons,
    });
    yield call(getLessons,{ payload: { courseId } });
    yield put({
      type: DELETE_LESSON_FULFILLED,
    });
  } catch (error) {
    yield put({
      type: DELETE_LESSON_REJECTED,
      payload: error,
    });
  }
}

function* duplicateLesson({ payload: { courseId, lessonId }}) {
  try {
    const courseSnapshot = yield call(firestore.getDocument, `courses/${courseId}`);
    const course = courseSnapshot.data();
    const updatedLessons = [
      ...course.lessons,
      {
        ...course.lessons.find((lesson) => {
          if (lessonId !== lesson.id) {
            return lesson;
          } else {
            return ({
              id: course.lessons[course.lessons.length - 1].id++,
              ...lesson,
            });
          }
        }),
      }
    ];
    yield call(firestore.setDocument, `courses/${courseId}`, {
      ...course,
      lessons: updatedLessons,
    });
    yield call(getLessons,{ payload: { courseId } });
    yield put({
      type: DUPLICATE_LESSON_FULFILLED,
    });
  } catch (error) {
    yield put({
      type: DUPLICATE_LESSON_REJECTED,
      payload: error,
    });
  }
}

function* watchGetLessons() {
  yield takeEvery(GET_LESSONS, getLessons);
}

function* watchCreateLesson() {
  yield takeEvery(CREATE_LESSON, createLesson);
}

function* watchDeleteLesson() {
  yield takeEvery(DELETE_LESSON, deleteLesson);
}

function* watchDuplicateLesson() {
  yield takeEvery(DUPLICATE_LESSON, duplicateLesson);
}

export default [
  watchGetLessons(),
  watchCreateLesson(),
  watchDeleteLesson(),
  watchDuplicateLesson(),
];
