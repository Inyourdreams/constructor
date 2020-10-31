import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Card from '@components/common/Card';
import CreationModal from '@components/CreationModal';
import ActionCard from '@components/ActionCard';
import DeletingModal from '@components/WarningModal';

import {
  getCourses,
  createCourse,
  deleteCourse,
  duplicateCourse,
} from '@actions';

import FeatherIcon from '@assets/images/Constructor/feather.svg';

const CoursesTab = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

  const [visibilityCreationModal, setVisibilityCreationModal] = useState(false);
  const [visibilityDeletingModal, setVisibilityDeletingModal] = useState(false);
  const [courseId, setCourseId] = useState(null);
  const [isPending, setPending] = useState(false);

  useEffect(() => {
    setPending(true);
    dispatch(getCourses());
  }, []);

  const coursesList = useSelector((store) => store.courses.coursesList);

  useEffect(() => {
    if (coursesList.length) {
      setPending(false);
    }
  }, [coursesList]);

  const handleOpenCreationModal = useCallback(() => {
    setVisibilityCreationModal(true);
  }, []);

  const handleOpenDeletingModal = useCallback((id) => {
    setVisibilityDeletingModal(true);
    setCourseId(id);
  }, []);

  const handleCreateCourse = useCallback((state) => {
    setVisibilityCreationModal(false);
    dispatch(createCourse(state));
  }, []);

  const handleDeleteCourse = useCallback(() => {
    setVisibilityDeletingModal(false);
    dispatch(deleteCourse({ id: courseId }));
  }, [courseId]);

  const handleDuplicateCourse = useCallback((id) => {
    dispatch(duplicateCourse({ id }));
  }, []);

  const handleRedirect = useCallback((id) => {
    history.push(`course/${id}`);
  });

  const mockCoursesList = useMemo(() => coursesList.map(({ id, image, name, description, lessons }) => (
    <ActionCard
      key={id}
      title={name}
      description={description}
      image={image}
      lessonsTitleText={t('ActionCard.LessonsTitle')}
      lessonsCount={lessons.length}
      actions={[{
        id: 'duplicate-action',
        name: t('ActionCard.DuplicateCourseTitle'),
        onClick: handleDuplicateCourse.bind({}, id),
      }, {
        id: 'delete-action',
        name: t('ActionCard.DeleteCourseTitle'),
        onClick: handleOpenDeletingModal.bind({}, id),
      }]}
      onClick={handleRedirect.bind({}, id)}
    />
  )), [coursesList]);

  return (
    <>

      <div className="coursesTab cards-container">
        <Card
          className="big"
          onClick={handleOpenCreationModal}
        >
          <div className="creation-block-container">
            <img src={FeatherIcon} alt="feather"/>
            <span>{t('CoursesRoute.CreateNewCourseTitle')}</span>
          </div>
        </Card>
        {
          !isPending ? mockCoursesList : null
        }
        <CreationModal
          visibility={visibilityCreationModal}
          onSubmit={handleCreateCourse}
          onClose={setVisibilityCreationModal}
          localization={{
            title: t('CourseModal.Title'),
            mediaTitle: t('CourseModal.MediaTitle'),
            inputFileTitle: t('CourseModal.InputFileTitle'),
            inputFileSize: t('CourseModal.InputFileSize'),
            inputPlaceholderName: t('CourseModal.InputPlaceholderName'),
            inputPlaceholderDescription: t('CourseModal.InputPlaceholderDescription'),
            actionCreate: t('CourseModal.ActionCreate'),
            actionCancelCreation: t('CourseModal.ActionCancelCreation'),
          }}
        />
        <DeletingModal
          visibility={visibilityDeletingModal}
          onSubmit={handleDeleteCourse}
          onClose={setVisibilityDeletingModal}
          localization={{
            title: t('CourseWarningModalDeleteAction.Title'),
            description: t('CourseWarningModalDeleteAction.Description'),
            actionCreate: t('CourseWarningModalDeleteAction.ActionDelete'),
            actionCancelCreation: t('CourseWarningModalDeleteAction.ActionCancelDelete'),
          }}
        />
      </div>
    </>
  );
};

export default CoursesTab;
