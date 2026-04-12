import { IsArray, IsEmail, IsInt, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(2)
  username!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(2)
  fullName!: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsString()
  @MinLength(6)
  password!: string;

  @IsArray()
  @IsString({ each: true })
  roles!: string[];

  @IsArray()
  @IsInt({ each: true })
  branchIds!: number[];
}
