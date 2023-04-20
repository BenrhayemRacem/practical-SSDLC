import { Connection } from 'mongoose';
import { CommentSchema } from './entities/comment.entity';
import { Constants } from 'src/common/constants/constants';

export const commentsProviders = [
  {
    provide: Constants.COMMENT_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('Comment', CommentSchema),
    inject: [Constants.DATABASE_CONNECTION],
  },
];
