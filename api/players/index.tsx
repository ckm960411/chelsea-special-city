import { forEach } from 'lodash';
import { deleteCall, get, patch, post } from '../axios';
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

export const getPlayerComments = (name: string) => {
  return get(`comments/${name}`);
};

export const createPlayerComment = (name: string, content: string) => {
  return post(`comments/${name}`, { content });
};

export const updatePlayerComment = (commentId: number, content: string) => {
  return patch(`comments/${commentId}`, { content });
};

export const deletePlayerComment = (commentId: number) => {
  return deleteCall(`comments/${commentId}`);
};

export const searchPlayers = (query: string) => {
  return get(`players/search/${query}`);
};
