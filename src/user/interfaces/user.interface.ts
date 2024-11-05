export interface IUser {
  id: string;
  login: string;
  password: string;
  refreshToken: string;
  isAdmin: boolean;
  version: number;
  createdAt: Date;
  updatedAt: Date;
}
