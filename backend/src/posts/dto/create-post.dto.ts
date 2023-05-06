import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import * as sanitizeHtml from 'sanitize-html';
import { Transform, TransformFnParams } from 'class-transformer';
export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  @Transform((value:TransformFnParams) => sanitizeHtml(value.obj.title))
  title: string;

  @IsNotEmpty()
  @IsString()
  @Transform((value:TransformFnParams) => sanitizeHtml(value.obj.content))
  content: string;


}
