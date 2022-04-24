import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/users.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs'
import { User } from 'src/users/users.entity';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService, private jwtService: JwtService) {}

    async login(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto);
        return this.generateToken(user);
    }

    async registration(userDto: CreateUserDto) {
        const candidate = await this.userService.getUserByEmail(userDto.email);
        if (candidate) {
            throw new HttpException('User with this email already exists', HttpStatus.BAD_REQUEST)
        }
        const user = await this.userService.createUser({...userDto});
        return this.generateToken(user);
    }

    private async generateToken(user: User) {
        const payload = {email: user.email, id: user.id}
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(userDto: CreateUserDto) {
        const userValid = await this.userService.getUserByEmail(userDto.email);
        const passwordValid = await bcrypt.compare(userDto.password, userValid.password);
        if (userValid && passwordValid) {
            return userValid;
        }
        throw new UnauthorizedException({message: 'Incorrect email or password'})
    }

    async validateJwtToken(payload) {
        const user = await this.userService.getOneUser(payload.id);
        if (!user) {
          return null;
        }
    
        return user;
      }
}
