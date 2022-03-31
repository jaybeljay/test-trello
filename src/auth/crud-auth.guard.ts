import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Repository } from 'typeorm';
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { Card } from "src/cards/cards.entity";
import { Column } from "src/columns/columns.entity";

/* @Injectable()
export class CRUDAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService, private entityType: Column | Card | Comment, 
        private entityRepository: Repository<typeof entityType>) {
            this.entityType = entityType;
        }
    
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()
        try {
            req.user = this.entityRepository.user;
            return true;
        } catch(e) {
            throw new UnauthorizedException({message: 'User is not authorized'})
        }
    }
} */