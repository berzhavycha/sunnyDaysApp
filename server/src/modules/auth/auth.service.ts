import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { IUser, UsersService } from '@modules/users';
import { ITokens } from './interfaces';
import { UserDto } from './dtos';
import { JwtPayload } from './strategies';
import { DUPLICATE_EMAIL_ERROR_CODE, ONE_DAY } from './constants';
import { ExtendedGraphQLContext } from '@configs';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  async signUp(registerUserDto: UserDto): Promise<ITokens> {
    try {
      const { email, password } = registerUserDto;

      const hashedPassword = await this.hashPassword(password);
      const user = await this.usersService.createUser(
        email,
        hashedPassword,
        null,
      );

      return this.generateTokens(user.id, user.email);
    } catch (error) {
      if (error.code === DUPLICATE_EMAIL_ERROR_CODE) {
        throw new ConflictException('Email is already in use!');
      } else {
        throw error;
      }
    }
  }

  async signIn(signedInUser: IUser): Promise<ITokens> {
    const { id, email } = signedInUser;
    return this.generateTokens(id, email);
  }

  async validateUser(email: string, password: string): Promise<IUser | null> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid email!');
    }

    if (await bcrypt.compare(password, user.passwordHash)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { passwordHash, refreshToken, ...result } = user;
      return result;
    }

    throw new UnauthorizedException('Invalid password!');
  }

  async signOut(userId: string): Promise<void> {
    await this.usersService.updateUser(userId, { refreshToken: null });
  }

  async refreshAccessToken(refreshToken: string): Promise<ITokens> {
    const decoded = await this.jwtService.verifyAsync(refreshToken, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
    });

    await this.validateRefreshToken(decoded.sub, refreshToken);

    return this.generateTokens(decoded.sub, decoded.email);
  }

  setCookies(
    response: ExtendedGraphQLContext['res'],
    tokens: ITokens,
  ): void {
    response.cookie('tokens', tokens, {
      httpOnly: true,
      maxAge: ONE_DAY * this.configService.get<number>('COOKIE_EXPIRATION_DAYS_TIME'),
      sameSite: 'none',
      secure: true,
    });
  }

  clearCookies(response: ExtendedGraphQLContext['res']): void {
    response.clearCookie('tokens');
  }

  async validateRefreshToken(userId: string, token: string): Promise<boolean> {
    const { refreshToken } = await this.usersService.findById(userId);
    if (refreshToken !== token) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    return refreshToken === token;
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

    await this.usersService.updateUser(userId, { refreshToken });

    return { accessToken, refreshToken };
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }
}
