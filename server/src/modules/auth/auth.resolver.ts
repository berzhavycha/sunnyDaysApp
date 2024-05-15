import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';

import { ExtendedGraphQLContext } from '@modules/graphql';
import { SafeUser } from '@modules/users';

import { AuthService } from './auth.service';
import { errorMessages, successMessages } from './constants';
import { CurrentUser, Public } from './decorators';
import { UserDto } from './dtos';
import { JwtRefreshTokenGuard, LocalAuthGuard } from './guards';
import { Message, UserPayload } from './types';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Mutation(() => UserPayload)
  async signUp(
    @Args('input') userDto: UserDto,
    @Context() context: ExtendedGraphQLContext,
  ): Promise<UserPayload> {
    const { user, tokens } = await this.authService.signUp(userDto);
    this.authService.setCookies(context.res, tokens);

    return user;
  }

  @Public()
  @Mutation(() => UserPayload)
  @UseGuards(LocalAuthGuard)
  async signIn(
    @Args('input') userDto: UserDto,
    @Context() context: ExtendedGraphQLContext,
  ): Promise<UserPayload> {
    const { user, tokens } = await this.authService.signIn(context.user);
    this.authService.setCookies(context.res, tokens);

    return user;
  }

  @Public()
  @Mutation(() => Message)
  @UseGuards(JwtRefreshTokenGuard)
  async refreshAccess(
    @Context() context: ExtendedGraphQLContext,
  ): Promise<Message> {
    const refreshToken = context.req.cookies.tokens?.refreshToken;

    if (!refreshToken) {
      throw new Error(errorMessages.REFRESH_TOKEN_NOT_FOUND);
    }

    const tokens = await this.authService.refreshAccessToken(refreshToken);
    this.authService.setCookies(context.res, tokens);

    return { message: successMessages.REFRESH_TOKEN };
  }

  @Mutation(() => Message)
  public async signOut(
    @CurrentUser('id') id: string,
    @Context() context: ExtendedGraphQLContext,
  ): Promise<Message> {
    await this.authService.signOut(id);
    this.authService.clearCookies(context.res);

    return { message: successMessages.SIGN_OUT };
  }

  @Query(() => UserPayload, { name: 'currentUser', nullable: true })
  public async getCurrentUser(
    @CurrentUser() user: SafeUser,
  ): Promise<UserPayload | null> {
    if (user) return user;
    else return null;
  }
}
