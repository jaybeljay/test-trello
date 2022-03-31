import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CommentsService } from './comments.service';
import { CreateorUpdateCommentDto, GetResponseCommentDto } from './comments.dto';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
    constructor(private commentsService: CommentsService) {}

    @UseGuards(JwtAuthGuard)
    @ApiOperation({summary: 'Create a new comment'})
    @ApiResponse({status: 200, type: GetResponseCommentDto})
    @Post('/')
    create(@Param('userId') userId: string, @Body() commentDto: GetResponseCommentDto) {
        return this.commentsService.createComment(commentDto, userId);
    }

    @UseGuards(JwtAuthGuard)
    @ApiOperation({summary: 'Get all comments of one card'})
    @ApiResponse({status: 200, type: [GetResponseCommentDto]})
    @Get('/')
    getAll(@Param('cardId') cardId: string) {
        return this.commentsService.getAllComments(cardId);
    }

    @UseGuards(JwtAuthGuard)
    @ApiOperation({summary: 'Edit a comment'})
    @ApiResponse({status: 200, type: GetResponseCommentDto})
    @Patch('/:id')
    update(@Param('id') id: string, @Param('userId') userId: string, @Body() commentDto: CreateorUpdateCommentDto) {
        return this.commentsService.updateComment(id, userId, commentDto);
    }

    @UseGuards(JwtAuthGuard)
    @ApiOperation({summary: 'Delete a comment'})
    @ApiResponse({status: 204})
    @Delete('/:id')
    @HttpCode(204)
    remove(@Param('id') id: string) {
        return this.commentsService.deleteComment(id);
    }
}