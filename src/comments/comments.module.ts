import { forwardRef, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JWTConfigService } from "src/auth/jwt-config.service";
import { CommentsController } from "./comments.controller";
import { Comment } from "./comments.entity";
import { CommentsService } from "./comments.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Comment]),
        JwtModule.registerAsync({
            useClass: JWTConfigService
        })
    ],
    controllers: [CommentsController],
    providers: [CommentsService],
    // exports: [forwardRef(() => CommentsModule)]
  })
  export class CommentsModule {}