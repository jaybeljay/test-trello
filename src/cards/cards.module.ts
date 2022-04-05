import { forwardRef, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JWTConfigService } from "src/auth/jwt-config.service";
import { CardsController } from "./cards.controller";
import { Card } from "./cards.entity";
import { CardsService } from "./cards.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Card]),
        JwtModule.registerAsync({
            useClass: JWTConfigService
        })
    ],
    controllers: [CardsController],
    providers: [CardsService],
    // exports: [forwardRef(() => CardsModule)]
  })
  export class CardsModule {}