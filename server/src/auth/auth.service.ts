import { Injectable, UnauthorizedException } from "@nestjs/common";
import { RefreshTokenIdsStorage } from "./refresh-token-ids.storage";
import { UserDto } from "./dtos";
import { JwtService } from "@nestjs/jwt";
import { IUser, User, UsersService } from "@users";
import { AuthType } from "./entities";
import { JwtPayload } from "./strategy";
import { JWT_REFRESH_TOKEN_TIME } from "@global";
import * as bcrypt from "bcrypt";
import { DUPLICATE_EMAIL_ERROR_CODE } from "./constants";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly refreshTokenIdsStorage: RefreshTokenIdsStorage,
  ) { }

  async signUp(registerUserDto: UserDto): Promise<AuthType> {
    try {
      const { email, password } = registerUserDto;
  
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const user = await this.usersService.createUser(email, hashedPassword);
  
      const payload: JwtPayload = { sub: user.userId, email: user.email };
      const accessToken = await this.jwtService.signAsync(payload);
      const refreshToken = await this.jwtService.signAsync(payload, {
        expiresIn: JWT_REFRESH_TOKEN_TIME,
      });
  
      await this.refreshTokenIdsStorage.insert(user.userId, refreshToken);
  
      return {
        accessToken,
        refreshToken,
      };
    } catch (error) {
      if (error.code === DUPLICATE_EMAIL_ERROR_CODE) {
        throw new Error('Email is already in use.');
    } else {
        throw error;
    }      
    }
  }

  async signIn(loggedInUser: User): Promise<AuthType> {
    const { userId, email } = loggedInUser;

    const payload: JwtPayload = { sub: userId, email };
    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: JWT_REFRESH_TOKEN_TIME,
    });

    await this.refreshTokenIdsStorage.insert(userId, refreshToken);

    return {
      accessToken,
      refreshToken,
    };
  }

  async validateUser(email: string, password: string): Promise<IUser | null> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.passwordHash))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { passwordHash, ...result } = user;
      return result;
    }
    return null;
  }

    async refreshAccessToken(
        refreshToken: string,
    ): Promise<AuthType> {
        const decoded = await this.jwtService.verifyAsync(refreshToken);
        await this.refreshTokenIdsStorage.validate(decoded.sub, refreshToken);
        const payload: JwtPayload = { sub: decoded.sub, email: decoded.email };
        const accessToken = await this.jwtService.signAsync(payload);
        const newRefreshToken = await this.jwtService.signAsync(payload, {
            expiresIn: JWT_REFRESH_TOKEN_TIME,
        });
        return {
            accessToken,
            refreshToken: newRefreshToken
        };
    }

  async invalidateToken(accessToken: string): Promise<void> {
    try {
      const decoded = await this.jwtService.verifyAsync(accessToken);
      await this.refreshTokenIdsStorage.invalidate(decoded.sub);
    } catch (error) {
      throw new UnauthorizedException("Invalid access token");
    }
  }
}
