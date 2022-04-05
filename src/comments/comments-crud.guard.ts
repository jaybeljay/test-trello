import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { Repository } from 'typeorm';
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { Comment } from "./comments.entity";

@Injectable()
export class CommentCRUDGuard implements CanActivate {
    constructor(private jwtService: JwtService, private entityRepository: Repository<Comment>) {}
    
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()
        try {
            const FindEntity = async() => {
                return await this.entityRepository.findOne({id: req.params.id, userId: req.user.id})
            };
            const entity = FindEntity();
            if (entity && (entity.then(res => res.userId)) === req.user.id) {
                return true;
            }
        } catch(e) {
            throw new ForbiddenException({message: "User doesn't have permission to modify this item."})
        }
    }
}