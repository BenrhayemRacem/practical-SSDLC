import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Constants } from 'src/common/constants/constants';
import { Model } from 'mongoose';
import { IComment } from 'src/common/interfaces/Comment.interface';
import { IUser } from 'src/common/interfaces/User.interface';
import { IPost } from 'src/common/interfaces/Post.interface';

@Injectable()
export class CommentsService {
  constructor(
    @Inject(Constants.COMMENT_MODEL) private commentModel: Model<IComment>,
    @Inject(Constants.USER_MODEL) private userModel: Model<IUser>,
    @Inject(Constants.POST_MODEL) private postModel: Model<IPost>,
  ) {}
  async create(ownerId: string, createCommentDto: CreateCommentDto) {
    const newComment = {
      ...createCommentDto,
      owner: ownerId,
    };
    const createdComment = await new this.commentModel(newComment).save();
    this.userModel
      .findOneAndUpdate(
        { _id: ownerId },
        { $push: { comments: createdComment._id } },
      )
      .exec();
    this.postModel
      .findOneAndUpdate(
        { _id: createdComment.post },
        { $push: { comments: createdComment._id } },
      )
      .exec();
    return createdComment;
  }

  async findAll() {
    return this.commentModel.find().exec();
  }

  async findOne(id: string) {
    const comment = await this.commentModel
      .findOne({ _id: id })
      .populate({
        path: 'owner',
        select: 'email username',
      })
      .populate('post')
      .exec();
    if (!comment) {
      throw new NotFoundException('no comment found');
    }
    return comment;
  }

  async update(id: string, updateCommentDto: UpdateCommentDto) {
    const { content } = updateCommentDto;
    const updatedComment = await this.commentModel
      .findOneAndUpdate({ _id: id }, { $set: { content } }, { new: true })
      .exec();
    if (!updatedComment) {
      throw new NotFoundException('no comment found');
    }
    return updatedComment;
  }

  async remove(id: string) {
    const deleted = await this.commentModel
      .findOneAndRemove({ _id: id })
      .exec();
    if (!deleted) {
      throw new NotFoundException('no comment found');
    }
    this.userModel
      .findOneAndUpdate(
        { _id: deleted.owner },
        { $pull: { comments: deleted._id } },
      )
      .exec();
    this.postModel
      .findOneAndUpdate(
        { _id: deleted.post },
        { $pull: { comments: deleted._id } },
      )
      .exec();
    return deleted;
  }

  getCurrentUserCommentsForPost(postId:string , ownerId:string){
    return this.commentModel.find({post:postId , owner:ownerId}).exec()
  }
}
