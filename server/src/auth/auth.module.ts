import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '@users/users.module';
import {JwtModule} from '@nestjs/jwt'
import {PassportModule} from '@nestjs/passport'
import { JWT_SECRET } from '../../global';
import {JwtStrategy } from './strategy/jwt.strategy'
import { LocalStrategy } from './strategy/local.strategy';
import { AuthResolver } from './auth.resolver';
import { RefreshTokenIdsStorage } from './refresh-token-ids.storage';

@Module({
  imports: [UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy, AuthResolver, RefreshTokenIdsStorage],
})
export class AuthModule {}
