import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { SafeUser } from '@modules/users';

import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super({ usernameField: configService.get<string>('LOGIN_FIELD') });
  }

  async validate(email: string, password: string): Promise<SafeUser> {
    return this.authService.validateUserCredentials(email, password);
  }
}
