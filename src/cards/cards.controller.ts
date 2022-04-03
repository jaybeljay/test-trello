import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CardsService } from './cards.service';
import { CreateorUpdateCardDto, GetResponseCardDto } from './cards.dto';

@ApiTags('Cards')
@Controller()
@UseGuards(JwtAuthGuard)
export class CardsController {
    constructor(private cardsService: CardsService) {}

    @ApiOperation({summary: 'Create a new card'})
    @ApiResponse({status: 200, type: GetResponseCardDto})
    @Post('/:userId/columns/:columnId/cards')
    create(@Param('userId') userId: string, @Body() cardDto: CreateorUpdateCardDto) {
        return this.cardsService.createCard(cardDto, userId);
    }

    @ApiOperation({summary: 'Get all cards of one column'})
    @ApiResponse({status: 200, type: [GetResponseCardDto]})
    @Get('/:userId/columns/:columnId/cards')
    getAll(@Param('userId') userId: string, @Param('columnId') columnId: string) {
        return this.cardsService.getAllCards(columnId, userId);
    }

    @ApiOperation({summary: 'Get one card of the column'})
    @ApiResponse({status: 200, type: GetResponseCardDto})
    @Get('/:userId/columns/:columnId/cards/:cardId')
    getOne(@Param('userId') userId: string, @Param('id') cardId: string) {
        return this.cardsService.getOneCard(cardId, userId);
    }

    @ApiOperation({summary: 'Update a card'})
    @ApiResponse({status: 200, type: GetResponseCardDto})
    @Patch('/:userId/columns/:columnId/cards/:cardId')
    update(@Param('user_id') userId: string, @Param('cardId') cardId: string, @Body() columnDto: CreateorUpdateCardDto) {
        return this.cardsService.updateCard(cardId, userId, columnDto);
    }

    @ApiOperation({summary: 'Delete a column'})
    @ApiResponse({status: 204})
    @Delete('/:userId/columns/:columnId/cards/:cardId')
    @HttpCode(204)
    remove(@Param('userId') userId: string, @Param('cardId') cardId: string) {
        return this.cardsService.deleteCard(cardId, userId);
    }
}