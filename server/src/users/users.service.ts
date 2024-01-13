import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>){}

    async createUser(email: string, passwordHash: string): Promise<User>{
        const user = this.usersRepository.create({email, passwordHash})
        return this.usersRepository.save(user)
    }

    async findByEmail(email: string): Promise<User | null>{
        return this.usersRepository.findOne({where: {email}})
    }

    async findOne(id: string):Promise<User | null>{
        return this.usersRepository.findOne({where: {userId: id}})
    }
}

