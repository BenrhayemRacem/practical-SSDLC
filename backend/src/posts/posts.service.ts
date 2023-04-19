import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Constants } from 'src/common/constants/constants';
import { Model } from 'mongoose';
import { IPost } from 'src/common/interfaces/Post.interface';

@Injectable()
export class PostsService {
  constructor(
    @Inject(Constants.POST_MODEL)
    private postModel: Model<IPost>,
  ) {}

  async create(ownerId: string, createPostDto: CreatePostDto) {
    const newPost = {
      ...createPostDto,
      owner: ownerId,
    };
    const createdPost = new this.postModel(newPost);
    return createdPost.save();
  }

  async findAll() {
    return this.postModel.find().exec();
  }

  async findOne(id: string) {
    const post = await this.postModel
      .findOne({ _id: id })
      .populate({
        path: 'owner',
        select: 'email username',
      })
      .exec();
    if (!post) {
      throw new NotFoundException('no post found with this id');
    }
    return post;
  }

  update(id: string, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: string) {
    return `This action removes a #${id} post`;
  }
}
