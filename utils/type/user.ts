export enum UserStatus {
  PUBLIC = 'PUBLIC',
  ADMIN = 'ADMIN',
}

export interface User {
  id: number;
  username: string;
  email: string;
  profileImage: string;
  userStatus: UserStatus;
}
