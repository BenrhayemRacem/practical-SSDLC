import { Module, forwardRef } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { commentsProviders } from './comment.providers';
import { DatabaseModule } from 'src/database/database.module';
import { UsersModule } from 'src/users/users.module';
import { PostsModule } from 'src/posts/posts.module';

@Module({
  imports: [DatabaseModule, UsersModule, forwardRef(() => PostsModule)],
  controllers: [CommentsController],
  providers: [CommentsService, ...commentsProviders],
  exports: [CommentsService, ...commentsProviders],
})
export class CommentsModule {}
