import { get, post } from '../axios';
import { LoginDto } from './dto/login-request.dto';
import { SignUpDto } from './dto/signup-request.dto';

export const login = (loginDto: LoginDto) => {
  return post('auth/login', loginDto);
};

export const signUp = (signUpDto: SignUpDto) => {
  return post('auth/signup', signUpDto);
};

export const getMe = () => {
  return get('auth/me');
};
