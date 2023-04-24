import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  HttpCode,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto, User } from './dto/user.dto';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import { users } from '@prisma/client';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'create user' })
  @Post()
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Return user details successfully',
    type: User,
  })
  async create(@Body() body: CreateUserDto): Promise<users> {
    return await this.userService.create(body);
  }

  @ApiOperation({ summary: 'get user by id' })
  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Return user details successfully',
    type: User || null,
  })
  async getUserById(@Param('id', ParseIntPipe) id: number): Promise<users> {
    return await this.userService.getUserById(+id);
  }

  @ApiOperation({ summary: 'update user by id' })
  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'Return update user details successfully',
    type: User || null,
  })
  async updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDto,
  ): Promise<users> {
    return await this.userService.updateById(+id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete user by id' })
  @ApiResponse({
    status: 200,
    description: 'Return delete user details',
    type: User,
  })
  async deleteById(@Param('id', ParseIntPipe) id: number): Promise<users> {
    return await this.userService.deleteById(id);
  }
}
