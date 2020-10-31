import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import Navbar from '@components/Navbar';
import Tabs from '@components/common/Tabs';

import CoursesTab from './coursesTab';
import { useGoogleLogin } from 'react-google-login';
import { getAccessToken } from '../../redux/api/googleDrive';

const Courses = () => {
  const { t } = useTranslation();

  const { signIn, loaded } = useGoogleLogin({
    clientId: '968636488645-6t0vu8rc5abru6invstajqhog7rfb134.apps.googleusercontent.com',
    responseType: 'code',
    scope: 'https://www.googleapis.com/auth/drive',
    prompt: 'consent',
    accessType: 'offline',
    onSuccess: (response) => getAccessToken(response.code).then((data) => {
      localStorage.setItem('refresh_token', data.refresh_token);
      localStorage.setItem('folders', JSON.stringify(data.folders));
    }).catch((e) => {

    }),
    onFailure: (response) => console.log(response),
  });

  useEffect(() => {
    if (!localStorage.getItem('access_token')) {
      signIn();
    }
  }, [signIn, loaded]);

  return (
    <>
      <Navbar
        title={t('CoursesRoute.Title')}
      />
      <>
        <Tabs
          tabs={[{
            index: 0,
            component: <CoursesTab />,
            name: t('CoursesRoute.Tab1'),
          }]}
        />
      </>
    </>
  );
};

export default Courses;
