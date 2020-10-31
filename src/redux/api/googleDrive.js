const getAccessToken = async authCode => {
  const response = await fetch('https://accounts.google.com/o/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `code=${authCode}&client_id=968636488645-6t0vu8rc5abru6invstajqhog7rfb134.apps.googleusercontent.com&client_secret=kWVLrhn09x02XhyDx8EFP4cb&grant_type=authorization_code&redirect_uri=http://localhost:8080`,
  });

  const responseAccessToken = await response.json();
  if (responseAccessToken.access_token) {
    localStorage.setItem('access_token', responseAccessToken.access_token);
    const folders = await createFolder(responseAccessToken.access_token);

    return { ...responseAccessToken, folders: folders };
  } else {
    return null;
  }
};

const uploadFile = async data => {
  try {
    const { file, folderID } = data;
    const accessToken = localStorage.getItem('access_token');

    var metadata = {
      name: file.name,
      parents: [folderID],
    };
    var form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    form.append('media', file);

    const response = await fetch(
      'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=webContentLink',
      {
        method: 'POST',
        headers: new Headers({
          Authorization: 'Bearer ' + accessToken,
        }),
        body: form,
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

const downloadFile = async fileUrl => {
  try {
    const accessToken = localStorage.getItem('access_token');

    const values = queryString.parse(fileUrl);
    const fileID = values['https://drive.google.com/uc?id'];
    let response;
    if (fileID) {
      response = await fetch('https://www.googleapis.com/drive/v3/files/' + fileID + '?alt=media', {
        method: 'GET',
        headers: new Headers({ Authorization: 'Bearer ' + accessToken }),
      });
    } else {
      response = await fetch(fileUrl);
    }

    return response;
  } catch (error) {
    console.log(error);
  }
};

const deleteFile = async fileID => {
  try {
    const accessToken = localStorage.getItem('access_token');

    let response = await fetch('https://www.googleapis.com/drive/v3/files/' + fileID, {
      method: 'DELETE',
      headers: new Headers({ Authorization: 'Bearer ' + accessToken }),
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const checkFolders = async accessToken => {
  const responseFolders = await fetch(
    `https://www.googleapis.com/drive/v3/files?q=${'mimeType=\'application/vnd.google-apps.folder\' and trashed = false '}&fields=${' files(id, name, parents)'}`,
    {
      method: 'GET',
      headers: new Headers({ Authorization: 'Bearer ' + accessToken }),
    }
  );
  let folders = {};
  if (responseFolders.status === 200) {
    const responseFoldersData = await responseFolders.json();

    const files = responseFoldersData.files;
    const escuelaFolder = files.find(file => file.name === 'ESCUELA FILES');
    if (escuelaFolder) {
      const foldersArray = files.filter(file => {
        console.log(file);
        return file.parents && file.parents[0] === escuelaFolder.id
      });
      for (let folder of foldersArray) {
        folders = { ...folders, [folder.name]: folder.id };
      }
    }
  }

  return folders;
};

const createFolder = async accessToken => {
  const checkFoldersa = await checkFolders(accessToken);
  if (checkFoldersa.audio) {
    return checkFoldersa;
  }
  const parentMetadata = {
    name: 'ESCUELA FILES',
    mimeType: 'application/vnd.google-apps.folder',
  };

  var parentForm = new FormData();
  parentForm.append('metadata', new Blob([JSON.stringify(parentMetadata)], { type: 'application/json' }));

  const parentResponse = await fetch(
    'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id',
    {
      method: 'POST',
      headers: new Headers({
        Authorization: 'Bearer ' + accessToken,
      }),
      body: parentForm,
    }
  );
  const parentResponseData = await parentResponse.json();

  let folders = {};

  const FILE_TYPES = {
    BOARD: 'board',
    IMAGE: 'image',
    AUDIO: 'audio',
    VIDEO: 'video',
    DOCS: 'docs',
  };

  const PROJECT_FILES_TYPES = {
    image: {
      title: 'Добавить картинку',
      type: FILE_TYPES.IMAGE,
      name: 'Картинка',
      link_name: 'Google',
      size: 5,
      message: 'Картинка успешно добавлена!:)',
    },
    board: {
      title: 'Добавить доску',
      type: FILE_TYPES.BOARD,
      name: 'доска',
      message: 'Доска успешно добавлена!:)',
    },
    video: {
      title: 'Добавить видео',
      type: FILE_TYPES.VIDEO,
      name: 'Видео',
      link_name: 'YouTube',
      size: 40,
      message: 'Видео успешно добавлено!:)',
    },
    audio: {
      title: 'Добавить аудио',
      type: FILE_TYPES.AUDIO,
      name: 'Аудио',
      link_name: 'SoundCloud',
      size: 20,
      message: 'Аудио успешно добавлено!:)',
    },
    docs: {
      title: 'Добавить файл',
      type: FILE_TYPES.DOCS,
      name: 'Документ',
      link_name: 'Google Docs',
      size: 200,
      message: 'Документ успешно добавлен!:)',
    },
  };

  for (let keys in PROJECT_FILES_TYPES) {
    const subMetadata = {
      name: keys,
      mimeType: 'application/vnd.google-apps.folder',
      parents: [parentResponseData.id],
    };

    var subForm = new FormData();
    subForm.append(
      'metadata',
      new Blob([JSON.stringify(subMetadata)], {
        type: 'application/json',
      })
    );

    const subResponse = await fetch(
      'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id',
      {
        method: 'POST',
        headers: new Headers({
          Authorization: 'Bearer ' + accessToken,
        }),
        body: subForm,
      }
    );
    const subResponseData = await subResponse.json();
    folders = { ...folders, [keys]: subResponseData.id };
  }

  await fetch('https://www.googleapis.com/drive/v3/files/' + parentResponseData.id + '/permissions', {
    method: 'POST',
    headers: new Headers({
      Authorization: 'Bearer ' + accessToken,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }),
    body: '{"role":"reader","type":"anyone"}',
  });
  return folders;
};

const refreshToken = async refreshToken => {
  try {
    const response = await fetch('https://accounts.google.com/o/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `client_id=968636488645-6t0vu8rc5abru6invstajqhog7rfb134.apps.googleusercontent.com&client_secret=kWVLrhn09x02XhyDx8EFP4cb&refresh_token=${refreshToken}&grant_type=refresh_token`,
    });
    if (response.status === 200) {
      const responseToken = await response.json();
      localStorage.setItem('access_token', responseToken.access_token);

      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export {
  uploadFile,
  createFolder,
  checkFolders,
  deleteFile,
  downloadFile,
  getAccessToken,
  refreshToken,
};
