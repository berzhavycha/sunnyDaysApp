import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { UsersService } from '@modules/users';

import { BaseJwtStrategy } from './base-jwt.strategy';

@Injectable()
export class JwtStrategy extends BaseJwtStrategy {
  constructor(
    usersService: UsersService,
    configService: ConfigService,
  ) {
    super(usersService, configService.get<string>('JWT_ACCESS_SECRET'));
  }
}
