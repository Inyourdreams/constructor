import {
  put,
  takeEvery,
  call,
} from 'redux-saga/effects';

import {
  GET_COURSES,
  GET_COURSES_FULFILLED,
  GET_COURSES_REJECTED,
  CREATE_COURSE,
  CREATE_COURSE_FULFILLED,
  CREATE_COURSE_REJECTED,
  DELETE_COURSE,
  DELETE_COURSE_FULFILLED,
  DELETE_COURSE_REJECTED,
  DUPLICATE_COURSE,
  DUPLICATE_COURSE_FULFILLED,
  DUPLICATE_COURSE_REJECTED,
} from '@types/courses';

import firebase from '@app-config/firebase';

const { firestore } = firebase;

function* getCourses() {
  try {
    const snapshot = yield call(firestore.getCollection, 'courses');
    const courses = snapshot.docs.map((course) => ({
      id: course.id,
      ...course.data(),
    }));
    yield put({
      type: GET_COURSES_FULFILLED,
      payload: courses,
    });
  } catch (error) {
    yield put({
      type: GET_COURSES_REJECTED,
      payload: error,
    });
  }
}

function* createCourse({ payload: { image = null, description = '', name = '', lessons = [] } }) {
  try {
    const { id } = yield call(firestore.addDocument, 'courses', {
      image,
      description,
      name,
      lessons: lessons || [],
    });
    yield call(getCourses);
    yield put({
      type: CREATE_COURSE_FULFILLED,
      payload: {
        id,
        image,
        description,
        name,
      },
    });
  } catch (error) {
    yield put({
      type: CREATE_COURSE_REJECTED,
      payload: error,
    });
  }
}

function* deleteCourse({ payload: { id = 0 } }) {
  try {
    yield call(firestore.deleteDocument, `courses/${id}`);
    yield call(getCourses);
    yield put({
      type: DELETE_COURSE_FULFILLED,
    });
  } catch (error) {
    yield put({
      type: DELETE_COURSE_REJECTED,
      payload: error,
    });
  }
}

function* duplicateCourse({ payload: { id = 0 } }) {
  try {
    const course = yield call(firestore.getDocument, `courses/${id}`);
    yield call(createCourse, {
      payload: course.data(),
    });
    yield call(getCourses);
    yield put({
      type: DUPLICATE_COURSE_FULFILLED,
    });
  } catch (error) {
    yield put({
      type: DUPLICATE_COURSE_REJECTED,
      payload: error,
    });
  }
}

function* watchGetCourses() {
  yield takeEvery(GET_COURSES, getCourses);
}

function* watchCreateCourses() {
  yield takeEvery(CREATE_COURSE, createCourse);
}

function* watchDeleteCourse() {
  yield takeEvery(DELETE_COURSE, deleteCourse);
}

function* watchDuplicateCourse() {
  yield takeEvery(DUPLICATE_COURSE, duplicateCourse);
}

export default [
  watchGetCourses(),
  watchCreateCourses(),
  watchDeleteCourse(),
  watchDuplicateCourse(),
];
