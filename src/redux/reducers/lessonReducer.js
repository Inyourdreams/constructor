import { createReducer } from '@reduxjs/toolkit';

import {
  GET_CONSTRUCTOR_FULFILLED,
  GET_CONSTRUCTOR_REJECTED,
  setLoading,
} from '@types/lesson';

const initialState = {
  lesson: null,
  currentCourse: null,
  error: null,
};

const lessonReducer = createReducer(initialState, {
  [GET_CONSTRUCTOR_FULFILLED]: (state, { payload: { lesson, currentCourse } }) => ({
    ...state,
    lesson,
    currentCourse,
    error: null,
  }),
  [GET_CONSTRUCTOR_REJECTED]: (state, { payload }) => ({
    ...state,
    error: payload,
  }),
  [setLoading]: (state, { payload }) => ({
    ...state,
    isLoading: payload,
  })
});

export default lessonReducer;
