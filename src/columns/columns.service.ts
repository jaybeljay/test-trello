import { BadRequestException, Injectable, NotFoundException, UnprocessableEntityException } from "@nestjs/common";
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Column } from "./columns.entity";
import { CreateorUpdateColumnDto, GetResponseColumnDto } from "./columns.dto";

@Injectable()
export class ColumnsService {
    constructor(@InjectRepository(Column) private columnRepository: Repository<Column>) {}

    async createColumn(dto: CreateorUpdateColumnDto, userId: string): Promise<GetResponseColumnDto> {
        try {
            const col = this.columnRepository.create({...dto, userId});
            const savedCol = await this.columnRepository.save(col);
            return new GetResponseColumnDto({...savedCol});
        } catch(e) {
            throw new UnprocessableEntityException(e.message);
        }
    }

    async getAllColumns(userId: string): Promise<GetResponseColumnDto[]> {
        try {
            const cols = await this.columnRepository.createQueryBuilder('columns')
            .where('columns.userId = :userId', { userId })
            .orderBy('columns.createdAt', 'DESC')
            .getMany();
            return await cols.map((col: Column) => new GetResponseColumnDto({ ...col }));
        } catch(e) {
            throw new BadRequestException(e.message);
        }
    }

    async getOneColumn(id: string, userId: string): Promise<GetResponseColumnDto> {
        try {
            const col = await this.columnRepository.findOne(id, {
                where: {
                    'userId': userId
                }
            });
            return new GetResponseColumnDto({ ...col });
        } catch(e) {
            throw new BadRequestException(e.message);
        }
    }

    async updateColumn(id: string, userId: string, dto: CreateorUpdateColumnDto): Promise<GetResponseColumnDto> {
        try {
            const col = await this.columnRepository.findOne(id, {
                where: {
                    'userId': userId
                }
            });
            const updatedCol = await this.columnRepository.save({...dto, id: id, userId: userId});
            return new GetResponseColumnDto({...updatedCol});
        } catch(e) {
            throw new BadRequestException(e.message);
        }
        
    }

    async deleteColumn(id: string, userId: string): Promise<void> {
        try{
            const col = await this.columnRepository.findOne(id, {
                where: {
                    'userId': userId
                }
            });

            if (!col) {
                throw new NotFoundException('Column not found');
            }
            
            await this.columnRepository.remove(col);
        } catch(e) {
            throw new BadRequestException(e.message);
        }
    }
}
