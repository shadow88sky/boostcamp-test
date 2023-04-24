import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { users } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(body: CreateUserDto): Promise<users> {
    return await this.prisma.users.create({ data: body });
  }

  async getUserById(id: number): Promise<users> {
    return await this.prisma.users.findUnique({ where: { id } });
  }

  async updateById(id: number, body: UpdateUserDto): Promise<users> {
    return await this.prisma.users.update({ where: { id }, data: body });
  }

  async deleteById(id: number): Promise<users> {
    const user = await this.prisma.users.findUnique({ where: { id } });
    // 直接删除如果该id不存在,会报错,所以检查下
    if (!user)
      throw new HttpException('user is not exists', HttpStatus.NOT_FOUND);
    return await this.prisma.users.delete({ where: { id } });
  }
}
