import React, { useState, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import Navbar from '@components/Navbar';
import Tabs from '@components/common/Tabs';
import CourseTab from './courseTab';

import rand from '@utils/rand';

import Pattern1 from '@assets/images/Constructor/pattern1.jpg';
import Pattern2 from '@assets/images/Constructor/pattern2.jpg';
import Pattern3 from '@assets/images/Constructor/pattern3.jpg';

const patterns = [Pattern1, Pattern2, Pattern3];

const Course = () => {
  const { t } = useTranslation();
  const { push } = useHistory();

  const [currentCourse, setCurrentCourse] = useState(null);

  const handleMount = useCallback((data) => {
    setCurrentCourse(data);
  }, [currentCourse]);

  return (
    <>
      <Navbar
        title={t('LessonsRoute.Title')}
        goBack={() => push('/courses')}
      />
      <>
        {
          currentCourse ? (
            <div className="course-block-container">
              <div className="course-image-container">
                <img src={currentCourse.image || patterns[rand(0, 2)]} alt=""/>
              </div>
              <div className="ccontenr">
                <div className="course-description-container">
                  <div className="course-name">
              <span className="course-name-label">
                Название курса
              </span>
                    <span className="course-name">
                {currentCourse.name}
              </span>
                  </div>
                </div>
                <div className="course-description">
              <span className="course-description-label">
                Описание курса
              </span>
                  <span className="course-description">
                {currentCourse.description}
              </span>
                </div>
              </div>
            </div>
          ) : null
        }
        <Tabs
          tabs={[{
            index: 0,
            component: <CourseTab onMounted={handleMount} />,
            name: t('LessonsRoute.Tab1'),
          }]}
        />
      </>
    </>
  );
};

export default Course;
