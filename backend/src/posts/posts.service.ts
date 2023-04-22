import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Constants } from 'src/common/constants/constants';
import { Model } from 'mongoose';
import { IPost } from 'src/common/interfaces/Post.interface';
import { IComment } from 'src/common/interfaces/Comment.interface';
import { IUser } from 'src/common/interfaces/User.interface';

@Injectable()
export class PostsService {
  constructor(
    @Inject(Constants.POST_MODEL)
    private postModel: Model<IPost>,
    @Inject(Constants.COMMENT_MODEL)
    private commentModel: Model<IComment>,
    @Inject(Constants.USER_MODEL)
    private userModel: Model<IUser>,
  ) {}

  async create(
    ownerId: string,
    createPostDto: CreatePostDto,
    files: Array<Express.Multer.File>,
  ) {
    if (files.length == 0) {
      throw new BadRequestException('no image uploaded');
    }
    const images = files.map((file) => file.filename);
    const newPost = {
      ...createPostDto,
      owner: ownerId,
      images,
    };
    const createdPost = await new this.postModel(newPost).save();
    this.userModel
      .findOneAndUpdate({ _id: ownerId }, { $push: { posts: createdPost._id } })
      .exec();
    return createdPost;
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
      .populate({
        path: 'comments',
        populate: {
          path: 'owner',
          select: 'email username',
        },
      })
      .exec();
    if (!post) {
      throw new NotFoundException('no post found with this id');
    }
    return post;
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    const { content, title } = updatePostDto;
    const updatedPost = await this.postModel
      .findOneAndUpdate(
        { _id: id },
        { $set: { content, title } },
        { new: true },
      )
      .exec();
    if (!updatedPost) {
      throw new NotFoundException('no post found');
    }
    return updatedPost;
  }

  async remove(id: string) {
    const isRemoved = await this.postModel.findOneAndRemove({ _id: id }).exec();
    if (!isRemoved) {
      throw new NotFoundException('no post found');
    }
    this.commentModel.deleteMany({ _id: isRemoved.comments }).exec();
    this.userModel
      .findOneAndUpdate(
        { _id: isRemoved.owner },
        { $pull: { posts: isRemoved._id } },
      )
      .exec();
    return isRemoved;
  }
  async getPostsIntroduction() {
    return this.postModel
      .find()
      .populate({
        path: 'owner',
        select: 'username',
      })
      .select({
        title: 1,
        content: 1,
        images: 1,
      });
  }
}
