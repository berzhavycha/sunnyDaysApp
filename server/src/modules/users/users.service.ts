import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) { }

  async createUser(email: string, passwordHash: string, refreshToken: string | null): Promise<User> {
    const user = this.usersRepository.create({ email, passwordHash, refreshToken });
    return this.usersRepository.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findById(id: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async updateUser(id: string, updateUserDto: Partial<User>): Promise<User | null> {
    const user = await this.findById(id);
    if (!user) {
      return null;
    }

    Object.assign(user, updateUserDto);

    return this.usersRepository.save(user);
  }

  async validateRefreshToken(userId: string, token: string): Promise<boolean> {
    const { refreshToken } = await this.findById(userId)
    if (refreshToken !== token) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    return refreshToken === token;
  }

}
