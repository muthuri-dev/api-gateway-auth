import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

@InputType()
export class RegisterUserDto {
  @Field()
  @IsNotEmpty({ message: 'Name is required' })
  @IsString()
  name: string;

  @Field()
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Email is invalid' })
  email: string;

  @Field()
  @IsNotEmpty({ message: 'Password is required' })
  @IsString()
  @MinLength(5, { message: 'Password must be atleast 5 characters' })
  password: string;
}

@InputType()
export class LoginUserDto {
  @Field()
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Email is invalid' })
  email: string;

  @Field()
  @IsNotEmpty({ message: 'Password is required' })
  @IsString()
  @MinLength(5, { message: 'Password must be atleast 5 characters' })
  password: string;
}
