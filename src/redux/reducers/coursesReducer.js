import { createReducer } from '@reduxjs/toolkit';

import {
  GET_COURSES_FULFILLED,
  GET_COURSES_REJECTED,
  CREATE_COURSE_REJECTED,
  DUPLICATE_COURSE_REJECTED,
} from '@types/courses';

const coursesReducer = createReducer({
  coursesList: [],
  error: null,
}, {
  [GET_COURSES_FULFILLED]: (state, { payload }) => ({
    ...state,
    coursesList: payload,
    error: null,
  }),
  [GET_COURSES_REJECTED]: (state, { payload }) => ({
    ...state,
    error: payload,
  }),
  [CREATE_COURSE_REJECTED]: (state, { payload }) => ({
    ...state,
    error: payload,
  }),
  [DUPLICATE_COURSE_REJECTED]: (state, { payload }) => ({
    ...state,
    error: payload,
  }),
});

export default coursesReducer;
