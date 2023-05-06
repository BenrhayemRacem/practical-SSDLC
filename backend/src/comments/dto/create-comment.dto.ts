import { Transform, Type ,TransformFnParams} from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { toMongoObjectId } from 'src/common/transformers/toMongoObjectId.transformer';
import * as sanitizeHtml from 'sanitize-html';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  @Transform((value:TransformFnParams) => sanitizeHtml(value.obj.content))
  content: string;

  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  @Transform(toMongoObjectId)
  post: Types.ObjectId;
}
