import { IUser } from 'src/user/interfaces/user.interface';

export type jwtPayload = Pick<IUser, 'id' | 'login' | 'role'>;
