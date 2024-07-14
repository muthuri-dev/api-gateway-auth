import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto, RegisterUserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { SharedprismaService } from '@app/sharedprisma';
import { RegisterResponse } from './types/user.types';
import * as bcrypt from 'bcrypt';

interface IUserData {
  name: string;
  email: string;
  password: string;
}

@Injectable()
export class UsersService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly prismaService: SharedprismaService,
  ) {}

  //register user
  async register(registerDto: RegisterUserDto): Promise<RegisterResponse> {
    const isEmail = await this.prismaService.user.findUnique({
      where: { email: registerDto.email },
    });
    if (isEmail)
      throw new BadRequestException('User alredy exist with this email');

    //password hashing
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const user = await this.prismaService.user.create({
      data: { ...registerDto, password: hashedPassword },
    });
    // const user = { ...registerDto, password: hashedPassword };
    // const activationtoken = await this.createActivationToken(user);
    // const activationCode = activationtoken.activationCode;
    return { user };
  }

  //user activation token
  async createActivationToken(user: IUserData) {
    const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
    const token = this.jwtService.sign(
      {
        user,
        activationCode,
      },
      { secret: this.configService.get<string>('JWT_SECRET'), expiresIn: '5m' },
    );
    return { user, token, activationCode };
  }

  //login user
  async login(loginDto: LoginUserDto) {
    const user = { ...loginDto };
    return user;
  }

  //get all users
  async getAll(): Promise<User[]> {
    const users = await this.prismaService.user.findMany();
    return users;
  }
}
