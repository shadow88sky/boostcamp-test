import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto, User } from './dto/user.dto';
import { PrismaModule } from '../prisma/prisma.module';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  describe('create', () => {
    it('should return a user object', async () => {
      const user: User = {
        id: 1,
        name: 'chen',
        address: 'suzhou',
        description: 'developer',
        createdAt: new Date(),
      };

      jest.spyOn(service, 'create').mockImplementation(async () => user);

      const createUserDto: CreateUserDto = {
        name: 'chen',
        address: 'suzhou',
        description: 'developer',
      };

      expect(await controller.create(createUserDto)).toBe(user);
    });
  });

  describe('getUserById', () => {
    it('should return a user object', async () => {
      const user: User = {
        id: 1,
        name: 'chen',
        address: 'suzhou',
        description: 'developer',
        createdAt: new Date(),
      };

      jest.spyOn(service, 'getUserById').mockImplementation(async () => user);

      expect(await controller.getUserById(1)).toBe(user);
    });
  });

  describe('updateById', () => {
    it('should return an updated user object', async () => {
      const updatedUser: User = {
        id: 1,
        name: 'chen',
        address: 'suzhou',
        description: 'developer',
        createdAt: new Date(),
      };

      jest
        .spyOn(service, 'updateById')
        .mockImplementation(async () => updatedUser);

      const updateUserDto: UpdateUserDto = {
        name: 'chen',
        address: 'suzhou',
        description: 'developer',
      };

      expect(await controller.updateById(1, updateUserDto)).toBe(updatedUser);
    });
  });

  describe('deleteById', () => {
    it('should return a deleted user object', async () => {
      const deletedUser: User = {
        id: 1,
        name: 'chen',
        address: 'suzhou',
        description: 'developer',
        createdAt: new Date(),
      };

      jest
        .spyOn(service, 'deleteById')
        .mockImplementation(async () => deletedUser);

      expect(await controller.deleteById(1)).toBe(deletedUser);
    });
  });
});
