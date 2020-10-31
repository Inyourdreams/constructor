import { combineReducers } from 'redux';

import coursesReducer from './coursesReducer';
import courseReducer from './courseReducer';
import lessonReducer from './lessonReducer';

const rootReducer = combineReducers({
  courses: coursesReducer,
  course: courseReducer,
  lesson: lessonReducer,
});

export default rootReducer;
