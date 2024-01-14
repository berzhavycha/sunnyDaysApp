import { JwtRefreshTokenStrategy } from './strategy/jwt.refresh-token.strategy';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '@users';
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from './strategy/jwt.strategy'
import { LocalStrategy } from './strategy/local.strategy';
import { AuthResolver } from './auth.resolver';
import { RefreshTokenIdsStorage } from './refresh-token-ids.storage';
import { JWT_ACCESS_SECRET, JWT_ACCESS_TOKEN_TIME } from '@global';

@Module({
  imports: [UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: JWT_ACCESS_SECRET,
      signOptions: { expiresIn: JWT_ACCESS_TOKEN_TIME},
    }),
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy, AuthResolver, RefreshTokenIdsStorage, JwtRefreshTokenStrategy],
})
export class AuthModule { }
