import { createReducer } from '@reduxjs/toolkit';

import {
  GET_LESSONS_FULFILLED,
  GET_LESSONS_REJECTED,
  CREATE_LESSON_REJECTED,
  DELETE_LESSON_REJECTED,
  DUPLICATE_LESSON_REJECTED,
} from '@types/lessons';

const courseReducer = createReducer({
  lessonsList: [],
  currentCourse: null,
  error: null,
}, {
  [GET_LESSONS_FULFILLED]: (state, { payload: { image, name, description, lessons } }) => ({
    ...state,
    lessonsList: lessons,
    currentCourse: {
      image,
      name,
      description,
    },
    error: null,
  }),
  [GET_LESSONS_REJECTED]: (state, { payload }) => ({
    ...state,
    error: payload,
  }),
  [CREATE_LESSON_REJECTED]: (state, { payload }) => ({
    ...state,
    error: payload,
  }),
  [DELETE_LESSON_REJECTED]: (state, { payload }) => ({
    ...state,
    error: payload,
  }),
  [DUPLICATE_LESSON_REJECTED]: (state, { payload }) => ({
    ...state,
    error: payload,
  }),
});

export default courseReducer;
