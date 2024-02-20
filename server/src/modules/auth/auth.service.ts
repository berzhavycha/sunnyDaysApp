import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

import { ONE_DAY } from '@shared';
import { IUser, UsersService } from '@modules/users';
import { ExtendedGraphQLContext } from '@modules/graphql';
import { AuthResult, ITokens, JwtPayload } from './interfaces';
import { UserDto } from './dtos';
import { DUPLICATE_EMAIL_ERROR_CODE } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  async signUp(registerUserDto: UserDto): Promise<AuthResult> {
    try {
      const { email, password } = registerUserDto;

      const hashedPassword = await this.hash(password);
      const user = await this.usersService.createUser(
        email,
        hashedPassword,
        null,
      );

      return {
        user,
        tokens: await this.generateTokens(user.id, user.email),
      };
    } catch (error) {
      if (error.code === DUPLICATE_EMAIL_ERROR_CODE) {
        throw new ConflictException('Email is already in use!');
      } else {
        throw error;
      }
    }
  }

  async signIn(signedInUser: IUser): Promise<AuthResult> {
    return {
      user: signedInUser,
      tokens: await this.generateTokens(signedInUser.id, signedInUser.email),
    };
  }

  async validateUser(email: string, password: string): Promise<IUser | null> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid email!');
    }

    if (await bcrypt.compare(password, user.passwordHash)) {
      return this.usersService.getSafeUser(user)
    }

    throw new UnauthorizedException('Invalid password!');
  }

  async signOut(userId: string): Promise<void> {
    await this.usersService.updateUser(userId, { refreshTokenHash: null });
  }

  async refreshAccessToken(refreshToken: string): Promise<ITokens> {
    const decoded = await this.jwtService.verifyAsync(refreshToken, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
    });

    await this.validateRefreshToken(decoded.sub, refreshToken);

    return this.generateTokens(decoded.sub, decoded.email);
  }

  setCookies(response: ExtendedGraphQLContext['res'], tokens: ITokens): void {
    response.cookie('tokens', tokens, {
      httpOnly: true,
      maxAge:
        ONE_DAY * this.configService.get<number>('COOKIE_EXPIRATION_DAYS_TIME'),
      sameSite: 'none',
      secure: true,
    });
  }

  clearCookies(response: ExtendedGraphQLContext['res']): void {
    response.clearCookie('tokens', {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
  }

  async validateRefreshToken(userId: string, token: string): Promise<void> {
    const { refreshTokenHash } = await this.usersService.findById(userId);
    if (refreshTokenHash && !(await bcrypt.compare(token, refreshTokenHash))) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  private async generateTokens(
    userId: string,
    email: string,
  ): Promise<ITokens> {
    const payload: JwtPayload = { sub: userId, email };
    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get<string>('JWT_REFRESH_TOKEN_TIME'),
    });

    const refreshTokenHash = await this.hash(refreshToken);
    await this.usersService.updateUser(userId, { refreshTokenHash });

    return { accessToken, refreshToken };
  }

  private async hash(value: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(value, salt);
  }
}
