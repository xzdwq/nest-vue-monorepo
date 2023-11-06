import { IsOptional, IsString } from 'class-validator';

export class LoggerDto {
  @IsOptional()
  @IsString()
  level?: string;

  @IsOptional()
  @IsString()
  context?: string;

  @IsString()
  source: string;

  @IsString()
  info: string;

  @IsOptional()
  @IsString()
  error?: string;
}