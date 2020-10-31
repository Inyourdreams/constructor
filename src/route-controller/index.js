import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Courses from '@routes/courses';
import Course from '@routes/course';
import Lesson from '@routes/lesson';

const RouteController = () => {
  const { pathname } = window.location;

  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/courses"
          component={Courses}
        />
        <Route
          exact
          path="/course/:courseId"
          component={Course}
        />
        <Route
          exact
          path="/course/lesson/:courseId/:lessonId"
          component={Lesson}
        />
      </Switch>
      {
        pathname === '/' ? (
          <Redirect to="/courses"/>
        ) : null
      }
    </Router>
  );
};

export default RouteController;
