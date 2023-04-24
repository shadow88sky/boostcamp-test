import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class User {
  @ApiProperty({ description: 'user id', example: 1 })
  id: number;

  @ApiProperty({ description: 'user name', example: 'chen' })
  name: string;

  @ApiProperty({ description: 'user address', example: '123 Main St.' })
  address: string;

  @ApiProperty({
    description: 'user description',
    example: 'A software developer',
  })
  description: string;

  @ApiProperty({
    description: 'The date the user was created',
    example: '2022-01-01T00:00:00Z',
  })
  createdAt: Date;
}

export class CreateUserDto {
  @ApiProperty({
    description: 'user name',
    required: true,
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'user address',
    required: true,
  })
  @IsString()
  address: string;

  @ApiProperty({
    description: 'user description',
    required: true,
  })
  @IsString()
  description: string;
}

export class UpdateUserDto {
  @ApiProperty({
    description: 'user name',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'user address',
    required: false,
  })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({
    description: 'user description',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
}
