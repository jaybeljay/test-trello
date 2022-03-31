import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';

@Injectable()
export class JWTConfigService implements JwtOptionsFactory {
  constructor(readonly configService: ConfigService) {}

  createJwtOptions(): JwtModuleOptions {
    return {
      secret: process.env.SECRET_KEY,
      signOptions: {
        expiresIn: '1d',
      },
    };
  }
}