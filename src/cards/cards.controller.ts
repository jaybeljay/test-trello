import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CardsService } from './cards.service';
import { CreateorUpdateCardDto, GetResponseCardDto } from './cards.dto';

@ApiTags('Cards')
@Controller('cards')
export class CardsController {
    constructor(private cardsService: CardsService) {}

    @UseGuards(JwtAuthGuard)
    @ApiOperation({summary: 'Create a new card'})
    @ApiResponse({status: 200, type: GetResponseCardDto})
    @Post('/')
    create(@Param('userId') userId: string, @Body() cardDto: CreateorUpdateCardDto) {
        return this.cardsService.createCard(cardDto, userId);
    }

    @UseGuards(JwtAuthGuard)
    @ApiOperation({summary: 'Get all cards of one column'})
    @ApiResponse({status: 200, type: [GetResponseCardDto]})
    @Get('/')
    getAll(@Param('userId') userId: string, @Param('columnId') columnId: string) {
        return this.cardsService.getAllCards(columnId, userId);
    }

    @UseGuards(JwtAuthGuard)
    @ApiOperation({summary: 'Get one card of the column'})
    @ApiResponse({status: 200, type: GetResponseCardDto})
    @Get('/:cardId')
    getOne(@Param('userId') userId: string, @Param('id') cardId: string) {
        return this.cardsService.getOneCard(cardId, userId);
    }

    @UseGuards(JwtAuthGuard)
    @ApiOperation({summary: 'Update a card'})
    @ApiResponse({status: 200, type: GetResponseCardDto})
    @Patch('/:cardId')
    update(@Param('user_id') userId: string, @Param('cardId') cardId: string, @Body() columnDto: CreateorUpdateCardDto) {
        return this.cardsService.updateCard(cardId, userId, columnDto);
    }

    @UseGuards(JwtAuthGuard)
    @ApiOperation({summary: 'Delete a column'})
    @ApiResponse({status: 204})
    @Delete('/:cardId')
    @HttpCode(204)
    remove(@Param('userId') userId: string, @Param('cardId') cardId: string) {
        return this.cardsService.deleteCard(cardId, userId);
    }
}