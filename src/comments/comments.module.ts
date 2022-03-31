import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommentsController } from "./comments.controller";
import { Comment } from "./comments.entity";
import { CommentsService } from "./comments.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Comment]),
    ],
    controllers: [CommentsController],
    providers: [CommentsService],
    // exports: [forwardRef(() => CommentsModule)]
  })
  export class CommentsModule {}