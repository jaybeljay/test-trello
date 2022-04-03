import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './users.dto';
import { User } from './users.entity';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller()
export class UsersController {
    constructor(private usersService: UsersService) {}

    @ApiOperation({summary: 'Create a new user'})
    @ApiResponse({status: 201, type: User})
    @Post('/')
    create(@Body() userDto: CreateUserDto) {
        return this.usersService.createUser(userDto);
    }

    @ApiOperation({summary: 'Get all users'})
    @ApiResponse({status: 200, type: [User]})
    @Get('/')
    getAll() {
        return this.usersService.getAllUsers();
    }

    @ApiOperation({summary: 'Get one user by id'})
    @ApiResponse({status: 200, type: User})
    @Get('/:userId')
    getOne(@Param('userId') userId: string) {
        return this.usersService.getOneUser(userId);
    }

    @ApiOperation({summary: 'Update a user'})
    @ApiResponse({status: 200, type: User})
    @Patch('/:userId')
    update(@Param('userId') userId: string, @Body() userDto: CreateUserDto) {
        return this.usersService.updateUser(userId, userDto);
    }

    @ApiOperation({summary: 'Delete a user'})
    @ApiResponse({status: 204})
    @Delete('/:userId')
    @HttpCode(204)
    remove(@Param('userId') userId: string) {
        return this.usersService.removeUser(userId);
    }
}
