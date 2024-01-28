import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config'; 
import {
  JwtRefreshTokenStrategy,
  JwtStrategy,
  LocalStrategy,
} from './strategies';
import { AuthService } from './auth.service';
import { UsersModule } from '@modules/users';
import { AuthResolver } from './auth.resolver';
import { RefreshTokenIdsStorage } from './refresh-token-ids.storage';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule], 
      useFactory: async (configService: ConfigService) => ({ 
        secret: configService.get<string>('JWT_ACCESS_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_ACCESS_TOKEN_TIME') }, 
      }),
      inject: [ConfigService], 
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
