import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserDto } from './dtos';
import { IUser, UsersService } from '@modules/users';
import { TokensType } from './entities';
import { JwtPayload } from './strategies';
import { DUPLICATE_EMAIL_ERROR_CODE } from './constants';
import { ConfigService } from '@nestjs/config';
import { ExtendedGraphQLContext } from '@configs';


@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  async signUp(registerUserDto: UserDto, response: ExtendedGraphQLContext['res']): Promise<void> {
    try {
      const { email, password } = registerUserDto;

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await this.usersService.createUser(email, hashedPassword, null);

      const payload: JwtPayload = { sub: user.id, email: user.email };
      const accessToken = await this.jwtService.signAsync(payload);
      const refreshToken = await this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get<string>('JWT_REFRESH_TOKEN_TIME')
      });

      await this.usersService.updateUser(user.id, { refreshToken })
      this.setCookies(response, { accessToken, refreshToken })
    } catch (error) {
      if (error.code === DUPLICATE_EMAIL_ERROR_CODE) {
        throw new Error('Email is already in use!');
      } else {
        throw error;
      }
    }
  }

  async signIn(context: ExtendedGraphQLContext): Promise<void> {
    const { id, email } = context.user;

    const payload: JwtPayload = { sub: id, email };
    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get<string>('JWT_REFRESH_TOKEN_TIME')
    });

    await this.usersService.updateUser(id, { refreshToken })
    this.setCookies(context.res, { accessToken, refreshToken })
  }

  async validateUser(email: string, password: string): Promise<IUser | null> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new Error('Invalid email!');
    }

    if (await bcrypt.compare(password, user.passwordHash)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { passwordHash, ...result } = user;
      return result;
    }

    throw new Error('Invalid password!');
  }

  async signOut(userId: string, response: ExtendedGraphQLContext['res']): Promise<void> {
    await this.usersService.updateUser(userId, { refreshToken: null })
    this.clearCookies(response);
  }

  async refreshAccessToken(context: ExtendedGraphQLContext): Promise<void> {
    const refreshToken = context.req.cookies.tokens?.refreshToken;

    if (!refreshToken) {
      throw new Error('Refresh token not found in cookies.');
    }

    const decoded = await this.jwtService.verifyAsync(refreshToken, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
    });
    await this.usersService.validateRefreshToken(decoded.sub, refreshToken);
    const payload: JwtPayload = { sub: decoded.sub, email: decoded.email };
    const accessToken = await this.jwtService.signAsync(payload);
    const newRefreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get<string>('JWT_REFRESH_TOKEN_TIME')
    });

    await this.usersService.updateUser(decoded.sub, { refreshToken: newRefreshToken })
    this.setCookies(context.res, { accessToken, refreshToken: newRefreshToken })
  }

  setCookies(response: ExtendedGraphQLContext['res'], tokens: TokensType): void {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + this.configService.get<number>('COOKIE_EXPIRY_TIME'));

    response.cookie('tokens', tokens, {
      httpOnly: true,
      expires: expiryDate,
      sameSite: 'none',
      secure: true,
    });
  }

  clearCookies(response: ExtendedGraphQLContext['res']): void {
    response.clearCookie('tokens');
  }
}
