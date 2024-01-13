import { RefreshTokenIdsStorage } from './refresh-token-ids.storage';
import { User, UsersService } from '@users';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserDto } from './dtos/user.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthType } from './entities/auth.type';
import * as bcrypt from 'bcrypt'


@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly refreshTokenIdsStorage: RefreshTokenIdsStorage
    ) { }

    async signUp(registerUserDto: UserDto): Promise<AuthType> {
        const { email, password } = registerUserDto

        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = await this.usersService.createUser(email, hashedPassword)

        const payload = { sub: user.userId, email: user.email };
        const accessToken = await this.jwtService.signAsync(payload);
        const refreshToken = await this.jwtService.signAsync(payload, {
            expiresIn: '1h',
        });

        await this.refreshTokenIdsStorage.insert(user.userId, refreshToken)

        return {
            accessToken,
            refreshToken,
        };

    }

    async signIn(loggedUser: User): Promise<AuthType> {
        const { userId, email } = loggedUser

        const payload = { sub: userId, email: email };
        const accessToken = await this.jwtService.signAsync(payload);
        const refreshToken = await this.jwtService.signAsync(payload, {
            expiresIn: '1h',
        });

        await this.refreshTokenIdsStorage.insert(userId, refreshToken)

        return {
            accessToken: accessToken,
            refreshToken: refreshToken,
        };
    }

    async validateUser(email: string, password: string) {
        const user = await this.usersService.findByEmail(email);
        if (user && (await bcrypt.compare(password, user.passwordHash))) {
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
        const payload = { sub: decoded.sub, email: decoded.email };
        const accessToken = await this.jwtService.signAsync(payload);
        const newRefreshToken = await this.jwtService.signAsync(payload, {
            expiresIn: '1h',
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
            throw new UnauthorizedException('Invalid access token');
        }
    }
}
