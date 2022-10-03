import { atom, AtomEffect } from 'recoil';

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

export const meState = atom({
  key: 'me',
  default: undefined,
});

export const tokenState = atom<string | null>({
  key: 'token',
  default: null,
  effects_UNSTABLE: [localStorageEffect('token')],
});
