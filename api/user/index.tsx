import { get, post } from '../axios';
import { LoginDto } from './dto/login-request.dto';

export const login = (loginDto: LoginDto) => {
  return post('auth/login', loginDto);
};

export const getMe = () => {
  return get('auth/me');
};
