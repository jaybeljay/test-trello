import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './users.dto';
import * as bcrypt from 'bcryptjs'
import { User } from './users.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    async createUser(userDto: CreateUserDto): Promise<User> {
        const user = await this.userRepository.create(userDto);
        const hashedPassword = await bcrypt.hash(userDto.password, 5);
        user.password = hashedPassword;
        return await this.userRepository.save(user);
    }

    async getAllUsers(): Promise<User[]> {
        const user = await this.userRepository.find();
        return user;
    }

    async getOneUser(id: string): Promise<User> {
        const user = await this.userRepository.findOne({where: {'id': id}});
        return user;
    }

    async getUserByEmail(email: string): Promise<User> {
        const user = await this.userRepository.findOne({where: {'email': email}})
        return user;
    }

    async updateUser(id: string, userDto: UpdateUserDto): Promise<User> {
        const user = await this.userRepository.findOne({where: {'id': id}});
        const hashedPassword = await bcrypt.hash(userDto.password, 5);
        user.password = hashedPassword;
        return await this.userRepository.save(user);
    }

    async removeUser(id: string): Promise<void> {
        await this.userRepository.delete(id);
    }
}
