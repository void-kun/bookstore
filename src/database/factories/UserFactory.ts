import * as Faker from 'faker';
import { define } from 'typeorm-seeding';

import { User } from '../../../src/api/models';

define(User, (faker: typeof Faker, settings: { role: string }) => {
    const gender = faker.random.number(1);
    const avatar = faker.name.lastName(gender);

    const user = new User();
    user.avatar = avatar;
    return user;
});
