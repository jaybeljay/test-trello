import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Repository } from 'typeorm';
import { Observable } from "rxjs";
import { Comment } from "./comments.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class CommentCRUDGuard implements CanActivate {
    constructor(@InjectRepository(Comment) private entityRepository: Repository<Comment>) {}
    
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()
        try {
            const findEntity = async() => {
                const entity = await this.entityRepository.findOne({
                    where: {
                        id: req.params.id, 
                        userId: req.user.id
                    }
                });
                if (entity && (entity.userId) === req.user.id) {
                    return true;
                } else {
                    throw new ForbiddenException({message: "This User doesn't have permission to modify this item."})
                }
            };
            return findEntity();
        } catch(e) {
            throw new ForbiddenException({message: "User doesn't have permission to modify this item."})
        }
    }
}