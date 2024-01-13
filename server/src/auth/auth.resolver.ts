import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthService } from './auth.service';
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { AuthType } from "./entities/auth.type";
import { UserDto } from './dtos/user.dto';
import { UseGuards } from '@nestjs/common';
import { JwtRefreshTokenGuard } from './guards/jwt-refresh-token.guard';

@Resolver(() => AuthType)
export class AuthResolver {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Mutation(() => AuthType)
    async signUp(
        @Args('UserDto') userDto: UserDto
    ) {
        return await this.authService.signUp(userDto)
    }

    @Mutation(() => AuthType)
    async signIn(
        @Args('UserDto') userDto: UserDto
    ) {
        return await this.authService.signIn(userDto)
    }

    // @UseGuards(JwtRefreshTokenGuard)
    @Mutation(() => String)
    public async refreshAccess(
        @Args('refreshToken') refreshToken: string
    ) {
        return await this.authService.refreshAccessToken(refreshToken);
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(() => String)
    public async invalidateToken(
        @Args('authorization') authorization: string
    ) {
        const token = authorization.split(' ')[1];
        await this.authService.invalidateToken(token);
    }
}