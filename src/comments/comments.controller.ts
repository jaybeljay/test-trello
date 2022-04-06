import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CommentsService } from './comments.service';
import { CreateorUpdateCommentDto, GetResponseCommentDto } from './comments.dto';
import { CommentCRUDGuard } from './comments-crud.guard';

@ApiTags('Comments')
@Controller()
@UseGuards(JwtAuthGuard, CommentCRUDGuard)
export class CommentsController {
    constructor(private commentsService: CommentsService) {}

    @ApiOperation({summary: 'Create a new comment'})
    @ApiResponse({status: 201, type: GetResponseCommentDto})
    @Post('/:userId/columns/:columnId/cards/:cardId/comments')
    create(@Param('userId') userId: string, @Body() commentDto: CreateorUpdateCommentDto) {
        return this.commentsService.createComment(commentDto, userId);
    }

    @ApiOperation({summary: 'Get all comments of one card'})
    @ApiResponse({status: 200, type: [GetResponseCommentDto]})
    @Get('/:userId/columns/:columnId/cards/:cardId/comments')
    getAll(@Param('cardId') cardId: string) {
        return this.commentsService.getAllComments(cardId);
    }

    @ApiOperation({summary: 'Edit a comment'})
    @ApiResponse({status: 200, type: GetResponseCommentDto})
    @Patch('/:userId/columns/:columnId/cards/:cardId/comments/:id')
    update(@Param('id') id: string, @Param('userId') userId: string, @Body() commentDto: CreateorUpdateCommentDto) {
        return this.commentsService.updateComment(id, userId, commentDto);
    }

    @ApiOperation({summary: 'Delete a comment'})
    @ApiResponse({status: 204})
    @Delete('/:userId/columns/:columnId/cards/:cardId/comments/:id')
    @HttpCode(204)
    remove(@Param('id') id: string) {
        return this.commentsService.deleteComment(id);
    }
}