import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { Observable } from 'rxjs';
import { Constants } from 'src/common/constants/constants';

import { IPost } from 'src/common/interfaces/Post.interface';

@Injectable()
export class PostPermissionGuard implements CanActivate {
  constructor(@Inject(Constants.POST_MODEL) private postModel: Model<IPost>) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const postId = request.params.id;
    const userId = request.user.id;
    return this.validateRequest(postId, userId);
  }

  async validateRequest(postId: string, userId: string): Promise<boolean> {
    const post = await this.postModel.findOne({ _id: postId }).exec();
    if (!post) {
      return false;
    }
    if (post.owner.toString() === userId) {
      return true;
    }
    return false;
  }
}
