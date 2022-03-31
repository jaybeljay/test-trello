import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { debug } from 'console';
import { AuthModule } from './auth/auth.module';
import { JWTConfigService } from './auth/jwt-config.service';
import { Card } from './cards/cards.entity';
import { CardsModule } from './cards/cards.module';
import { Column } from './columns/columns.entity';
import { ColumnsModule } from './columns/columns.module';
import { Comment } from './comments/comments.entity';
import { CommentsModule } from './comments/comments.module';
import { User } from './users/users.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [User, Column, Card, Comment],
      autoLoadEntities: true,
      logging: true
    }),
    JwtModule.registerAsync({
      useClass: JWTConfigService
    }),
    UsersModule,
    AuthModule,
    ColumnsModule,
    CardsModule,
    CommentsModule,
    PassportModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
