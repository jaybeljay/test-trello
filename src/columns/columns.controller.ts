import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ColumnsService } from './columns.service';
import { CreateorUpdateColumnDto, GetResponseColumnDto } from './columns.dto';

@ApiTags('Columns')
@Controller('columns')
export class ColumnsController {
    constructor(private columnsService: ColumnsService) {}

    @UseGuards(JwtAuthGuard)
    @ApiOperation({summary: 'Create a new column'})
    @ApiResponse({status: 200, type: CreateorUpdateColumnDto})
    @Post('/')
    create(@Param('userId') userId: string, @Body() columnDto: CreateorUpdateColumnDto) {
        return this.columnsService.createColumn(columnDto, userId);
    }

    @UseGuards(JwtAuthGuard)
    @ApiOperation({summary: 'Get all columns of the current user'})
    @ApiResponse({status: 200, type: [GetResponseColumnDto]})
    @Get('/')
    getAll(@Param('userId') userId: string) {
        return this.columnsService.getAllColumns(userId);
    }

    @UseGuards(JwtAuthGuard)
    @ApiOperation({summary: 'Get one column of the current user'})
    @ApiResponse({status: 200, type: GetResponseColumnDto})
    @Get('/:columnId')
    getOne(@Param('userId') userId: string, @Param('columnId') columnId: string) {
        return this.columnsService.getOneColumn(userId, columnId);
    }

    @UseGuards(JwtAuthGuard)
    @ApiOperation({summary: 'Update a column'})
    @ApiResponse({status: 200, type: GetResponseColumnDto})
    @Patch('/:columnId')
    update(@Param('userId') userId: string, @Param('columnId') columnId: string, @Body() columnDto: CreateorUpdateColumnDto) {
        return this.columnsService.updateColumn(userId, columnId, columnDto);
    }

    @UseGuards(JwtAuthGuard)
    @ApiOperation({summary: 'Delete a column'})
    @ApiResponse({status: 204})
    @Delete('/:columnId')
    @HttpCode(204)
    remove(@Param('userId') userId: string, @Param('columnId') columnId: string) {
        return this.columnsService.deleteColumn(userId, columnId);
    }
}