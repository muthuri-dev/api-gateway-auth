import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { RegisterUserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { RegisterResponse } from './types/user.types';
import { BadRequestException } from '@nestjs/common';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => RegisterResponse)
  async registerUsers(
    @Args('registerDto') registerDto: RegisterUserDto,
  ): Promise<RegisterResponse> {
    if (!registerDto.email || !registerDto.name || !registerDto.password)
      throw new BadRequestException('Please fill all the fields');

    const user = await this.usersService.register(registerDto);
    return { user };
  }

  @Query(() => [User])
  async getAllUsers(): Promise<User[]> {
    return await this.usersService.getAll();
  }
}
