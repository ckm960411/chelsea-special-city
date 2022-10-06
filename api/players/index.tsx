import { forEach } from 'lodash';
import { get, post } from '../axios';
import { RegisterPlayerDto } from './dto/register-player.dto';

export const uploadPlayerPhoto = (files: FileList) => {
  const formFile = new FormData();
  forEach(files, (photoFile) => formFile.append('files', photoFile));

  return post('players/upload', formFile, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const registerPlayer = (data: RegisterPlayerDto) => {
  return post('players/create', data);
};

export const getAllPlayers = () => {
  return get('players');
};

export const getPlayer = (name: string) => {
  return get(`players/${name}`);
};
