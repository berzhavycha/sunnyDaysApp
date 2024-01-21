import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import {
  JwtRefreshTokenStrategy,
  JwtStrategy,
  LocalStrategy,
} from './strategy';
import { AuthService } from './auth.service';
import { UsersModule } from '@users';
import { AuthResolver } from './auth.resolver';
import { RefreshTokenIdsStorage } from './refresh-token-ids.storage';
import { JWT_ACCESS_SECRET, JWT_ACCESS_TOKEN_TIME } from '@global';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: JWT_ACCESS_SECRET,
      signOptions: { expiresIn: JWT_ACCESS_TOKEN_TIME },
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    LocalStrategy,
    AuthResolver,
    RefreshTokenIdsStorage,
    JwtRefreshTokenStrategy,
  ],
})
export class AuthModule {}
