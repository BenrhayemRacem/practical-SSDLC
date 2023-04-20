import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { Observable } from 'rxjs';
import { Constants } from 'src/common/constants/constants';
import { IComment } from 'src/common/interfaces/Comment.interface';
import { IUser } from 'src/common/interfaces/User.interface';

@Injectable()
export class CommentPermissionGuard implements CanActivate {
  constructor(
    @Inject(Constants.COMMENT_MODEL) private commentModel: Model<IComment>,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const commentId = request.params.id;
    const userId = request.user.id;
    return this.validateRequest(commentId, userId);
  }

  async validateRequest(commentId: string, userId: string): Promise<boolean> {
    const comment = await this.commentModel.findOne({ _id: commentId }).exec();
    if (!comment) {
      return false;
    }
    if (comment.owner.toString() === userId) {
      return true;
    }
    return false;
  }
}
