import { BadRequestException, Injectable, NotFoundException, UnprocessableEntityException } from "@nestjs/common";
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from "./comments.entity";
import { CreateorUpdateCommentDto, GetResponseCommentDto } from "./comments.dto";

@Injectable()
export class CommentsService {
    constructor(@InjectRepository(Comment) private commentRepository: Repository<Comment>) {}

    async createComment(dto: CreateorUpdateCommentDto, userId: string): Promise<GetResponseCommentDto> {
        try {
            const comment = this.commentRepository.create({...dto, userId});
            const savedComment = await this.commentRepository.save(comment);
            return new GetResponseCommentDto({...savedComment});
        } catch(e) {
            throw new UnprocessableEntityException(e.message);
        }
    }

    async getAllComments(cardId: string): Promise<GetResponseCommentDto[]> {
        try {
            const comments = await this.commentRepository.find({where: {'cardId': cardId}})
            return await comments.map((comm: Comment) => new GetResponseCommentDto({ ...comm }));
        } catch(e) {
            throw new BadRequestException(e.message);
        }
    }

    async updateComment(id: string, userId: string, dto: CreateorUpdateCommentDto): Promise<GetResponseCommentDto> {
        try {
            const comment = await this.commentRepository.findOne({
                where: {
                    'id': id,
                    'userId': userId
                }
            });
            const updatedComment = await this.commentRepository.save({...dto, id: id, userId: userId});
            return new GetResponseCommentDto({...updatedComment});
        } catch(e) {
            throw new BadRequestException(e.message);
        }
        
    }

    async deleteComment(id: string): Promise<void> {
        try{
            const comment = await this.commentRepository.findOne(id);

            if (!comment) {
                throw new NotFoundException('Comment not found');
            }
            
            await this.commentRepository.remove(comment);
        } catch(e) {
            throw new BadRequestException(e.message);
        }
    }
}
