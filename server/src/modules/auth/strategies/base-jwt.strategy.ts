import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express-serve-static-core';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { SafeUser, UsersService } from '@modules/users';

import { JwtPayload } from '../interfaces';

@Injectable()
export class BaseJwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtTokenKey: string,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                BaseJwtStrategy.extractJWTFromCookie,
            ]),
            ignoreExpiration: false,
            secretOrKey: jwtTokenKey,
        });
    }

    private static extractJWTFromCookie(req: Request): string | null {
        if (req.cookies && req.cookies.tokens) {
            return req.cookies.tokens.accessToken;
        }
        return null;
    }

    async validate(payload: JwtPayload): Promise<SafeUser> {
        const user = await this.usersService.findById(payload.sub);
        if (!user) {
            throw new UnauthorizedException();
        }

        return this.usersService.getSafeUser(user);
    }
}
