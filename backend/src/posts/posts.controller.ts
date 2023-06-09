import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFiles,
  BadRequestException,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PostPermissionGuard } from './guards/permission.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FileFilterCallback, diskStorage } from 'multer';
import { editFileName } from 'src/common/utilities/editFileName';
import * as path from 'path';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(
    FilesInterceptor('files', 5, {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
      limits: {
        fileSize: 8000000,
      },
      fileFilter: function (
        req: Express.Request,
        file: Express.Multer.File,
        callback: FileFilterCallback,
      ) {
        const ext = path.extname(file.originalname);
        if (
          ext !== '.png' &&
          ext !== '.jpg' &&
          ext !== '.gif' &&
          ext !== '.jpeg'
        ) {
          return callback(new BadRequestException('Only images are allowed'));
        }
        callback(null, true);
      },
    }),
  )
  create(
    @Request() req,
    @Body() createPostDto: CreatePostDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.postsService.create(req.user.id, createPostDto, files);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, PostPermissionGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  @UseGuards(JwtAuthGuard, PostPermissionGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }

  @Get('all/introduction')
  getIntroduction() {
    return this.postsService.getPostsIntroduction();
  }
}
