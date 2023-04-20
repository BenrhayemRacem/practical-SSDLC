import { ConflictException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(user: LoginDto) {
    const loginUser = await this.userService.findOneByEmail({
      email: user.email,
    });

    const isMatch = await bcrypt.compare(user.password, loginUser.password);
    if(!isMatch) {
        throw new ConflictException('please verify your password');
    }
    const payload ={
        id:loginUser._id,
        email:loginUser.email
    }
    return {
        token:this.jwtService.sign(payload)
    }
  }
}
