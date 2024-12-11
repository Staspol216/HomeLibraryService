import { User } from '../../../user/entities/user.entity';
import { UserRoles } from '../../../user/roles/roles.eum';
import { setSeederFactory } from 'typeorm-extension';

export const UserFactory = setSeederFactory(User, (faker) => {
  const user = new User({
    login: faker.internet.username(),
    password: faker.internet.password(),
    role: faker.helpers.enumValue(UserRoles),
    id: faker.string.uuid(),
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
    refreshToken: null,
    version: 0,
  });

  return user;
});
