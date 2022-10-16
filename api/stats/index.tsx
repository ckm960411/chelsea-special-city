import { get } from '../axios';

export const getPlayerStats = (playerId: number) => {
  return get(`stats/${playerId}`);
};
