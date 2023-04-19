import { Connection } from 'mongoose';
import { PostSchema } from './entities/post.entity';
import { Constants } from 'src/common/constants/constants';

export const postsProviders = [
  {
    provide: Constants.POST_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('Post', PostSchema),
    inject: [Constants.DATABASE_CONNECTION],
  },
];
