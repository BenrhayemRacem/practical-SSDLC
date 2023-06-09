import { Connection } from 'mongoose';
import { UserSchema } from './entities/user.entity';
import { Constants } from 'src/common/constants/constants';

export const usersProviders = [
  {
    provide: Constants.USER_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('User', UserSchema),
    inject: [Constants.DATABASE_CONNECTION],
  },
];
