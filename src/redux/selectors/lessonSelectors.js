import { createSelector } from "reselect";

export const lessonStateSelector = (state) => state.lesson;
export const courseStateSelector = (state) => state.courses;
export const currentCourseSelector = (state) => state.course;

export const isLessonLoading = createSelector(
    lessonStateSelector,
    (state) => state.isLoading,
);
