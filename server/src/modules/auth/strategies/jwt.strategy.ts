import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express-serve-static-core';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { extractJWTFromCookies } from '@shared';

import { SafeUser, UsersService } from '@modules/users';

import { JwtPayload } from '../interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request): string => extractJWTFromCookies(req, 'accessToken'),
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_ACCESS_SECRET'),
    });
  }
  async validate(payload: JwtPayload): Promise<SafeUser> {
    return this.usersService.validateUserById(payload.sub);
  }
}
