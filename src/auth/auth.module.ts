import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JWTConfigService } from './jwt-config.service';
import { AuthStrategy } from './auth.strategy';

@Module({
  providers: [AuthService, AuthStrategy],
  controllers: [AuthController],
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      useClass: JWTConfigService
    })
  ],
  exports: [
    AuthService
  ]
})
export class AuthModule {}