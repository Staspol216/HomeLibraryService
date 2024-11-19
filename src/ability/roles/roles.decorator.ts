import { SetMetadata } from '@nestjs/common';
import { UserRoles } from './roles.eum';

const ROLES_KEY = 'roles';
export const Roles = (...roles: UserRoles[]) => SetMetadata(ROLES_KEY, roles);
