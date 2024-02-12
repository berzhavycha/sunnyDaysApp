import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { ExtendedGraphQLContext } from '@modules/graphql';
import { IUser } from '@modules/users';
import { AuthService } from './auth.service';
import { UserDto } from './dtos';
import { LocalAuthGuard, JwtRefreshTokenGuard } from './guards';
import { CurrentUser, Public } from './decorators';
import { Message, UserPayload } from './types';

@Resolver(() => String)
export class AuthResolver {
  constructor(private readonly authService: AuthService) { }

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
      throw new Error('Refresh token not found in cookies.');
    }

    const tokens = await this.authService.refreshAccessToken(refreshToken);
    this.authService.setCookies(context.res, tokens);

    return { message: 'Has signed refreshed token successfully!' };
  }

  @Mutation(() => Message)
  public async signOut(
    @CurrentUser('id') id: string,
    @Context() context: ExtendedGraphQLContext,
  ): Promise<Message> {
    await this.authService.signOut(id);
    this.authService.clearCookies(context.res);

    return { message: 'Has signed out successfully!' };
  }

  @Query(() => Boolean)
  public async isUserSignedIn(@CurrentUser() user: IUser): Promise<boolean> {
    if (user) return true;
    else return false;
  }
}
