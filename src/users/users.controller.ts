import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './users.dto';
import { User } from './users.entity';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @ApiOperation({summary: 'Create a new user'})
    @ApiResponse({status: 201, type: User})
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.usersService.createUser(userDto);
    }

    @ApiOperation({summary: 'Get all users'})
    @ApiResponse({status: 200, type: [User]})
    @Get()
    getAll() {
        return this.usersService.getAllUsers();
    }

    @ApiOperation({summary: 'Get one user by id'})
    @ApiResponse({status: 200, type: User})
    @Get('/:id')
    getOne(@Param('id') id: string) {
        return this.usersService.getOneUser(id);
    }

    @ApiOperation({summary: 'Update a user'})
    @ApiResponse({status: 200, type: User})
    @Patch('/:id')
    update(@Param('id') id: string, @Body() userDto: CreateUserDto) {
        return this.usersService.updateUser(id, userDto);
    }

    @ApiOperation({summary: 'Delete a user'})
    @ApiResponse({status: 204})
    @Delete('/:id')
    @HttpCode(204)
    remove(@Param('id') id: string) {
        return this.usersService.removeUser(id);
    }
}
