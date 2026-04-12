import { StudentStatus } from '@prisma/client';
import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateStudentStatusDto {
  @IsEnum(StudentStatus)
  targetStatus!: StudentStatus;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  reason?: string;
}
