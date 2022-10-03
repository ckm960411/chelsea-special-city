import { atom, AtomEffect } from 'recoil';
import { v1 } from 'uuid';

const localStorageEffect =
  (key: string): AtomEffect<string | null> =>
  ({ setSelf, onSet }) => {
    setSelf(localStorage.getItem(key));
    onSet((newValue) => {
      if (typeof newValue === 'string') {
        localStorage.setItem(key, newValue);
      } else {
        localStorage.removeItem(key);
      }
    });
  };

export const meState = atom<any>({
  key: `me/${v1()}`,
  default: undefined,
});

export const tokenState = atom<string | null>({
  key: `me/${v1()}`,
  default: null,
  effects_UNSTABLE: [localStorageEffect('token')],
});
