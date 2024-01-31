import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { IUser } from '@modules/users';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super({ usernameField: configService.get<string>('LOGIN_FIELD') });
  }

  async validate(email: string, password: string): Promise<IUser> {
    return this.authService.validateUser(email, password);
  }
}
