import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { UsersService } from '@modules/users';

import { BaseJwtStrategy } from './base-jwt.strategy';

@Injectable()
export class JwtRefreshTokenStrategy extends BaseJwtStrategy {
  constructor(
    usersService: UsersService,
    configService: ConfigService,
  ) {
    super(usersService, configService.get<string>('JWT_REFRESH_SECRET'));
  }
}