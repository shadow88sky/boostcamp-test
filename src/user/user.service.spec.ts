import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto, User } from './dto/user.dto';
import { PrismaService } from '../prisma/prisma.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  describe('user', () => {
    let id: number;
    it('should create a user object', async () => {
      const createUserDto: CreateUserDto = {
        name: 'chen',
        address: 'suzhou',
        description: 'developer',
      };
      const user = await service.create(createUserDto);
      id = user.id;
      expect(user.name).toBe('chen');
    });

    it('should return a user object with valid id', async () => {
      expect((await service.getUserById(id)).name).toBe('chen');
    });

    it('should throw a 404 error with invalid id', async () => {
      expect(await service.getUserById(999)).toBe(null);
    });

    it('should return an updated user object', async () => {
      const updateUserDto: UpdateUserDto = {
        name: 'Jane',
      };
      expect((await service.updateById(id, updateUserDto)).name).toBe('Jane');
    });

    it('should return a deleted user object', async () => {
      expect((await service.deleteById(id)).address).toBe('suzhou');
    });

    it('should throw a 404 error with invalid id', async () => {
      await expect(service.deleteById(999)).rejects.toThrowError(
        'user is not exists',
      );
    });
  });
});
