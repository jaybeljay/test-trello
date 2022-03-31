import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CardsController } from "./cards.controller";
import { Card } from "./cards.entity";
import { CardsService } from "./cards.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Card]),
    ],
    controllers: [CardsController],
    providers: [CardsService],
    // exports: [forwardRef(() => CardsModule)]
  })
  export class CardsModule {}