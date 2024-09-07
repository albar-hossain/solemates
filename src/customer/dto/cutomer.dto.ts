import { Optional } from '@nestjs/common';
import {
  IsString,
  Matches,
  IsNotEmpty,
  Length,
  IsEmail,
  IsDateString,
  IsInt,
  Min,
  Max,

} from 'class-validator';
import { PrimaryColumn } from 'typeorm';

export class CreateCustomerDto {

  @Optional()
    id:number;

  @IsString({ message: 'fullName must be a string' })
  fullName: string;

  @IsNotEmpty({ message: 'userName is required' })
  @Length(8, 100, {
    message: 'userName length must be between 8 and 100 characters',
  })
  @IsString({ message: 'userName must be a string' })
  userName: string;

  @IsNotEmpty({ message: 'fullName is required' })
  @Length(8, 100, {
    message: 'fullName length must be between 8 and 100 characters',
  })

  @IsEmail({}, { message: 'email must be valid' })
  @IsNotEmpty({ message: 'email is required.' })
  email: string;

  @IsNotEmpty({ message: 'password is required' })
  @IsString({ message: 'password must be a string' })
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
    message:
      'Passwords must be at least 8 characters, should include atleast one uppercase and one lowercase letter and a special character and a digit',
  })
  password: string;

  @Optional()
  filename: string;


}

export class LoginCustomerDTO {
  @IsEmail({}, { message: 'email must be valid' })
  @IsNotEmpty({ message: 'email is required.' })
  email: string;

  @IsNotEmpty({ message: 'password is required' })
  @IsString({ message: 'password must be a string' })
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
    message:
      'Passwords must be at least 8 characters, should include atleast one uppercase and one lowercase letter and a special character and a digit',
  })
  password: string;
}

export class UpdateCustomerDTO {
  @Optional()
  @IsNotEmpty({ message: 'userName is required' })
  @Length(8, 100, {
    message: 'userName length must be between 8 and 100 characters',
  })
  @IsString({ message: 'userName must be a string' })
  userName: string;

  @Optional()
  @IsEmail({}, { message: 'email must be valid' })
  @IsNotEmpty({ message: 'email is required.' })
  email: string;

  @Optional()
  @IsNotEmpty({ message: 'fullName is required' })
  @Length(8, 100, {
    message: 'fullName length must be between 8 and 100 characters',
  })
  @IsString({ message: 'fullName must be a string' })
  fullName: string;

  @Optional()
  id: number;

  @Optional()
  password: string;

  @IsNotEmpty({ message: 'userPassword is required' })
  userPassword: string;
  
  
}

export class GetCustomerDTO {

  fullName: string;

  userName: string;

  email: string;

  filename: string;
}
