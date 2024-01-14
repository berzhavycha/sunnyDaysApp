import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthService } from './auth.service';
import { Args, Mutation, Resolver, Query, Context } from "@nestjs/graphql";
import { AuthType } from "./entities/auth.type";
import { UserDto } from './dtos/user.dto';
import { UseGuards } from '@nestjs/common';
import { JwtRefreshTokenGuard } from './guards/jwt-refresh-token.guard';
import { LocalAuthGuard } from './guards';
import { CurrentUser } from './decorators/user.decorator';
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
        @Args('userDto') userDto: UserDto,
        @CurrentUser() user: User
    ) {
        return await this.authService.signIn(user)
    }

    @Mutation(() => AuthType)
    @UseGuards(JwtRefreshTokenGuard)
    public async refreshAccess(
        @Args('refreshToken') refreshToken: string
    ) {
        return await this.authService.refreshAccessToken(refreshToken);
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