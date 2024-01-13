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
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService()

@Module({
  imports: [UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: configService.get<string>('JWT_SECRET'),
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy, AuthResolver, RefreshTokenIdsStorage, JwtRefreshTokenStrategy],
})
export class AuthModule { }
