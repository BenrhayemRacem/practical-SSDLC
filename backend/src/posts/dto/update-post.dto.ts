import { PartialType, PickType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';

class PickPostDto extends PickType(CreatePostDto, [
  'title' as const,
  'content' as const,
]) {}

export class UpdatePostDto extends PartialType(PickPostDto) {}
