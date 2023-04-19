import {
  Injectable,
  Inject,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { IUser } from '../common/interfaces/User.interface';
import * as bcrypt from 'bcrypt';
import { Constants } from 'src/common/constants/constants';
const saltOrRounds = 10;
@Injectable()
export class UsersService {
  constructor(
    @Inject(Constants.USER_MODEL)
    private userModel: Model<IUser>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<IUser> {
    const isExist = await this.userModel
      .find({
        $or: [
          { email: createUserDto.email },
          { username: createUserDto.username },
        ],
      })
      .exec();
    if (isExist.length > 0) {
      throw new BadRequestException('email or username already exists');
    }
    const hash = await bcrypt.hash(createUserDto.password, saltOrRounds);
    createUserDto.password = hash;
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<IUser[]> {
    return this.userModel.find().select({ password: 0 }).exec();
  }

  async findOne(id: string) {
    const user = await this.userModel
      .findOne({ _id: id })
      .select({ password: 0 })
      .exec();
    if (!user) {
      throw new NotFoundException('no user found with this id');
    }
    return user;
  }
  async findOneByEmail(email: string) {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new NotFoundException('no user found with this email');
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const {username} = updateUserDto
    return this.userModel
      .findOneAndUpdate({ _id: id }, { $set: {username} }, { new: true })
      .select({ password: 0 })
      .exec();
  }

  async remove(id: string) {
    return this.userModel
      .findOneAndDelete({ _id: id })
      .select({ password: 0 })
      .exec();
  }
}
