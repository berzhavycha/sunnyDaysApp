import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './entities';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async createUser(
    email: string,
    passwordHash: string,
    refreshTokenHash: string | null,
  ): Promise<User> {
    const user = this.usersRepository.create({
      email,
      passwordHash,
      refreshTokenHash,
    });
    return this.usersRepository.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findById(id: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async updateUser(
    id: string,
    updateUserDto: Partial<User>,
  ): Promise<User | null> {
    const user = await this.findById(id);

    if (!user) {
      return null;
    }

    Object.assign(user, updateUserDto);

    return this.usersRepository.save(user);
  }
}
