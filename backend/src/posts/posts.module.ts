import { Module, forwardRef } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { DatabaseModule } from 'src/database/database.module';
import { postsProviders } from './post.providers';
import { CommentsModule } from 'src/comments/comments.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [DatabaseModule, forwardRef(() => CommentsModule), UsersModule],
  controllers: [PostsController],
  providers: [PostsService, ...postsProviders],
  exports: [PostsService, ...postsProviders],
})
export class PostsModule {}
