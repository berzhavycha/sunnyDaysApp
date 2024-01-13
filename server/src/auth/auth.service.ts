import { RefreshTokenIdsStorage } from './refresh-token-ids.storage';
import { UsersService } from './../users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserDto } from './dtos/user.dto';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { AuthType } from './entities/auth.type';


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

        this.refreshTokenIdsStorage.insert(user.userId, refreshToken)

        return {
            user,
            accessToken,
            refreshToken,
        };

    }

    async signIn(loginUserDto: UserDto): Promise<AuthType> {
        const { email, password } = loginUserDto

        const user = await this.validateUser(email, password)
        if (!user) {
            throw new UnauthorizedException('Invalid email or password');
        }

        const payload = { sub: user.userId, email: user.email };
        const accessToken = await this.jwtService.signAsync(payload);
        const refreshToken = await this.jwtService.signAsync(payload, {
            expiresIn: '1h',
        });

        this.refreshTokenIdsStorage.insert(user.userId, refreshToken)

        return {
            user,
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
    ): Promise<{ accessToken: string }> {
        const decoded = await this.jwtService.verifyAsync(refreshToken);
        await this.refreshTokenIdsStorage.validate(decoded.sub, refreshToken);
        const payload = { sub: decoded.sub, email: decoded.email };
        const accessToken = await this.jwtService.signAsync(payload);
        return { accessToken: accessToken };
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
