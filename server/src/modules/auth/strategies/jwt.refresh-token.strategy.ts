import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express-serve-static-core';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { extractJWTFromCookies } from '@shared';

import { SafeUser } from '@modules/users';

import { JwtPayload } from '../interfaces';

import { AuthService } from './../auth.service';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request): string => extractJWTFromCookies(req, 'refreshToken'),
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_REFRESH_SECRET'),
    });
  }

  async validate(payload: JwtPayload): Promise<SafeUser> {
    return this.authService.validateUserById(payload.sub);
  }
}
