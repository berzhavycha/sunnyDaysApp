import { AuthService } from './auth.service';
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { AuthType } from "./entities/auth.type";
import { UserDto, RefreshTokenDto } from './dtos';
import { UseGuards } from '@nestjs/common';
import { LocalAuthGuard, JwtRefreshTokenGuard, JwtAuthGuard } from './guards';
import { CurrentUser } from './decorators';
import { User } from '@users';

@Resolver(() => AuthType)
export class AuthResolver {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Mutation(() => AuthType)
    async signUp(
        @Args('userDto') userDto: UserDto
    ) {
        return await this.authService.signUp(userDto)
    }

    @Mutation(() => AuthType)
    @UseGuards(LocalAuthGuard)
    async signIn(
        @Args('user') userDto: UserDto,
        @CurrentUser() user: User
    ) {
        return await this.authService.signIn(user)
    }

    @Mutation(() => AuthType)
    @UseGuards(JwtRefreshTokenGuard)
    public async refreshAccess(
        @Args('refreshTokenDto') refreshTokenDto: RefreshTokenDto
    ) {
        return await this.authService.refreshAccessToken(refreshTokenDto.refreshToken);
    }

    @Mutation(() => String)
    @UseGuards(JwtAuthGuard)
    public async invalidateToken(
        @Args('authorization') authorization: string
    ) {
        const token = authorization.split(' ')[1];
        await this.authService.invalidateToken(token);
    }
}