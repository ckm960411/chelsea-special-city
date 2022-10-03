import Axios from 'axios';

export const axios = Axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

const _getHeader = () => {
  return {
    headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
  };
};

export const get = (url: string) => {
  const options = _getHeader();
  return axios.get(url, options);
};

export const post = (url: string, data: any, options?: any) => {
  const baseHeaders = _getHeader()['headers'];
  const extraHeaders = options?.['headers'] ?? {};
  const headers = { ...baseHeaders, ...extraHeaders };
  return axios.post(url, data, { ...options, headers });
};

export const deleteCall = (url: string, data?: any) => {
  const options = _getHeader();
  return axios.delete(url, { ...options, data });
};

export const patch = (url: string, data: any) => {
  const options = _getHeader();
  return axios.patch(url, data, options);
};
