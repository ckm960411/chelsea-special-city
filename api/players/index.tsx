import { forEach } from 'lodash';
import { post } from '../axios';

export const uploadPlayerPhoto = (files: FileList) => {
  const formFile = new FormData();
  forEach(files, (photoFile) => formFile.append('files', photoFile));

  return post('players/upload', formFile, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
