import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ColumnsService } from './columns.service';
import { CreateorUpdateColumnDto, GetResponseColumnDto } from './columns.dto';

@ApiBearerAuth()
@ApiTags('Columns')
@Controller()
@UseGuards(JwtAuthGuard)
export class ColumnsController {
    constructor(private columnsService: ColumnsService) {}

    @ApiOperation({summary: 'Create a new column'})
    @ApiResponse({status: 201, type: CreateorUpdateColumnDto})
    @Post('/:userId/columns/')
    create(@Param('userId') userId: string, @Body() columnDto: CreateorUpdateColumnDto) {
        return this.columnsService.createColumn(columnDto, userId);
    }

    @ApiOperation({summary: 'Get all columns of the current user'})
    @ApiResponse({status: 200, type: [GetResponseColumnDto]})
    @Get('/:userId/columns/')
    getAll(@Param('userId') userId: string) {
        return this.columnsService.getAllColumns(userId);
    }

    @ApiOperation({summary: 'Get one column of the current user'})
    @ApiResponse({status: 200, type: GetResponseColumnDto})
    @Get('/:userId/columns/:columnId')
    getOne(@Param('userId') userId: string, @Param('columnId') columnId: string) {
        return this.columnsService.getOneColumn(columnId, userId);
    }

    @ApiOperation({summary: 'Update a column'})
    @ApiResponse({status: 200, type: GetResponseColumnDto})
    @Patch('/:userId/columns/:columnId')
    update(@Param('userId') userId: string, @Param('columnId') columnId: string, @Body() columnDto: CreateorUpdateColumnDto) {
        return this.columnsService.updateColumn(columnId, userId, columnDto);
    }

    @ApiOperation({summary: 'Delete a column'})
    @ApiResponse({status: 204})
    @Delete('/:userId/columns/:columnId')
    @HttpCode(204)
    remove(@Param('userId') userId: string, @Param('columnId') columnId: string) {
        return this.columnsService.deleteColumn(columnId, userId);
    }
}