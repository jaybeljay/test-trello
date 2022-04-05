import { forwardRef, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JWTConfigService } from "src/auth/jwt-config.service";
import { ColumnsController } from "./columns.controller";
import { Column } from "./columns.entity";
import { ColumnsService } from "./columns.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Column]),
        JwtModule.registerAsync({
            useClass: JWTConfigService
        }),
    ],
    controllers: [ColumnsController],
    providers: [ColumnsService],
    // exports: [forwardRef(() => ColumnsModule)]
  })
  export class ColumnsModule {}