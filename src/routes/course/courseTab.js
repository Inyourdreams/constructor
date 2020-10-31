import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import Card from '@components/common/Card';
import CreationModal from '@components/CreationModal';
import ActionCard from '@components/ActionCard';
import DeletingModal from '@components/WarningModal';

import { uploadFile } from '../../redux/api/googleDrive';

import {
  getLessons,
  createLesson,
  deleteLesson,
  duplicateLesson,
} from '@actions';

import FeatherIcon from '@assets/images/Constructor/feather.svg';

const LessonTab = ({ onMounted }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const { courseId } = useParams();

  const [visibilityCreationModal, setVisibilityCreationModal] = useState(false);
  const [visibilityDeletingModal, setVisibilityDeletingModal] = useState(false);
  const [lessonId, setLessonId] = useState(null);

  const lessonsList = useSelector((store) => store.course.lessonsList);
  const currentCourse = useSelector((store) => store.course.currentCourse);

  useEffect(() => {
    dispatch(getLessons({ courseId }));
  }, []);

  useEffect(() => {
    onMounted(currentCourse);
  }, [currentCourse]);

  const handleOpenCreationModal = useCallback(() => {
    setVisibilityCreationModal(true);
  }, []);

  const handleOpenDeletingModal = useCallback((id) => {
    setVisibilityDeletingModal(true);
    setLessonId(id);
  }, []);

  const handleCreateLesson = useCallback((state) => {
    setVisibilityCreationModal(false);
    dispatch(createLesson({ courseId, lesson: state }));
  }, []);

  const handleDeleteLesson = useCallback(() => {
    setVisibilityDeletingModal(false);
    dispatch(deleteLesson({ courseId, lessonId }));
  }, [lessonId]);

  const handleDuplicateLesson = useCallback((id) => {
    dispatch(duplicateLesson({ courseId, lessonId: id }));
  }, []);

  const handleRedirect = useCallback((id) => {
    history.push(`lesson/${courseId}/${id}`);
  });

  const mockLessonsList = useMemo(() => lessonsList.map(({ id, image, name, description }) => (
    <ActionCard
      key={id}
      title={name}
      description={description}
      image={image}
      lessonsTitleText={t('ActionCard.LessonsTitle')}
      actions={[{
        id: 'duplicate-action',
        name: t('ActionCard.DuplicateLessonTitle'),
        onClick: handleDuplicateLesson.bind({}, id),
      }, {
        id: 'delete-action',
        name: t('ActionCard.DeleteLessonTitle'),
        onClick: handleOpenDeletingModal.bind({}, id),
      }]}
      onClick={handleRedirect.bind({}, id)}
    />
  )), [lessonsList]);

  return (
    <div className="coursesTab cards-container">
      <Card
        className="big"
        onClick={handleOpenCreationModal}
      >
        <div className="creation-block-container">
          <img src={FeatherIcon} alt="feather" />
          <span>{t('LessonsRoute.CreateNewLessonTitle')}</span>
        </div>
      </Card>
      {mockLessonsList}
      <CreationModal
        visibility={visibilityCreationModal}
        onSubmit={handleCreateLesson}
        onClose={setVisibilityCreationModal}
        localization={{
          title: t('LessonModal.Title'),
          mediaTitle: t('LessonModal.MediaTitle'),
          inputFileTitle: t('LessonModal.InputFileTitle'),
          inputFileSize: t('LessonModal.InputFileSize'),
          inputPlaceholderName: t('LessonModal.InputPlaceholderName'),
          inputPlaceholderDescription: t('LessonModal.InputPlaceholderDescription'),
          actionCreate: t('LessonModal.ActionCreate'),
          actionCancelCreation: t('LessonModal.ActionCancelCreation'),
        }}
      />
      <DeletingModal
        visibility={visibilityDeletingModal}
        onSubmit={handleDeleteLesson}
        onClose={setVisibilityDeletingModal}
        localization={{
          title: t('LessonWarningModalDeleteAction.Title'),
          description: t('LessonWarningModalDeleteAction.Description'),
          actionCreate: t('LessonWarningModalDeleteAction.ActionDelete'),
          actionCancelCreation: t('LessonWarningModalDeleteAction.ActionCancelDelete'),
        }}
      />
    </div>
  );
};

export default LessonTab;
