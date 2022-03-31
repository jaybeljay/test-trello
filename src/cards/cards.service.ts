import { BadRequestException, Injectable, NotFoundException, UnprocessableEntityException } from "@nestjs/common";
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Card } from "./cards.entity";
import { CreateorUpdateCardDto, GetResponseCardDto } from "./cards.dto";

@Injectable()
export class CardsService {
    constructor(@InjectRepository(Card) 
                private cardRepository: Repository<Card>
                ) {}

    async createCard(dto: CreateorUpdateCardDto, userId: string): Promise<GetResponseCardDto> {
        try {
            const card = this.cardRepository.create({...dto, userId});
            return new GetResponseCardDto({...card});
        } catch(e) {
            throw new UnprocessableEntityException(e.message);
        }
    }

    async getAllCards(columnId: string, userId: string): Promise<GetResponseCardDto[]> {
        try {
            const cards = await this.cardRepository.createQueryBuilder('cards')
            .where('cards.userId == userId')
            .getMany();
            return  cards.map((card: Card) => new GetResponseCardDto({...card}));
        } catch(e) {
            throw new BadRequestException(e.message);
        }
    }

    async getOneCard(id: string, userId: string): Promise<GetResponseCardDto> {
        try {
            const card = await this.cardRepository.findOne(id, {
                where: {
                    'userId': userId
                }
            });
            return new GetResponseCardDto({...card});
        } catch(e) {
            throw new BadRequestException(e.message);
        }
    }

    async updateCard(id: string, userId: string, dto: CreateorUpdateCardDto): Promise<GetResponseCardDto> {
        try {
            const card = await this.cardRepository.findOne(id, {
                where: {
                    'userId': userId
                }
            });
            await this.cardRepository.save({...dto, id: id, userId: userId});
            return new GetResponseCardDto({...card});
        } catch(e) {
            throw new BadRequestException(e.message);
        }
        
    }

    async deleteCard(id: string, userId: string): Promise<void> {
        try{
            const card = await this.cardRepository.findOne(id, {
                where: {
                    'userId': userId
                }
            });

            if (!card) {
                throw new NotFoundException('Card not found');
            }
            
            await this.cardRepository.remove(card);
        } catch(e) {
            throw new BadRequestException(e.message);
        }
    }
}