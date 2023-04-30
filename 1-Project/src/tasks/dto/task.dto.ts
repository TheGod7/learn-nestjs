import { taskStatus } from './../tasks.entity';
import {
  IsString,
  MinLength,
  IsNotEmpty,
  IsOptional,
  IsIn,
} from 'class-validator';

export class createTaskDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  title: string;
  @IsString()
  description: string;
}

export class UpdateTasksDTO {
  @IsString()
  @IsOptional()
  title?: string;
  @IsString()
  @IsOptional()
  description?: string;
  @IsString()
  @IsOptional()
  @IsIn([taskStatus.DONE, taskStatus.IN_PROGRESS, taskStatus.PENDING])
  status?: taskStatus;
}
