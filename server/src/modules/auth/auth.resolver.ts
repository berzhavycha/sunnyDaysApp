import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from './dtos';
import { LocalAuthGuard, JwtRefreshTokenGuard } from './guards';
import { ExtendedGraphQLContext } from '@configs';
import { CurrentUser, Public } from './decorators';
import { IUser } from '@modules/users';

@Resolver(() => String)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Mutation(() => String)
  async signUp(
    @Args('userInput') userDto: UserDto,
    @Context() context: ExtendedGraphQLContext,
  ): Promise<string> {
    const tokens = await this.authService.signUp(userDto);
    this.authService.setCookies(context.res, tokens);

    return 'Has signed up successfully!';
  }

  @Public()
  @Mutation(() => String)
  @UseGuards(LocalAuthGuard)
  async signIn(
    @Args('userInput') userDto: UserDto,
    @Context() context: ExtendedGraphQLContext,
  ): Promise<string> {
    const tokens = await this.authService.signIn(context.user);
    this.authService.setCookies(context.res, tokens);

    return 'Has signed in successfully!';
  }

  @Public()
  @Mutation(() => String)
  @UseGuards(JwtRefreshTokenGuard)
  async refreshAccess(
    @Context() context: ExtendedGraphQLContext,
  ): Promise<string> {
    const refreshToken = context.req.cookies.tokens?.refreshToken;

    if (!refreshToken) {
      throw new Error('Refresh token not found in cookies.');
    }

    const tokens = await this.authService.refreshAccessToken(refreshToken);
    this.authService.setCookies(context.res, tokens);

    return 'Has signed refreshed token successfully!';
  }

  @Mutation(() => String)
  public async signOut(
    @CurrentUser() user: IUser,
    @Context() context: ExtendedGraphQLContext,
  ): Promise<string> {
    await this.authService.signOut(user.id);
    this.authService.clearCookies(context.res);

    return 'Has signed out successfully!';
  }

  @Query(() => Boolean)
  public async isUserSignedIn(@CurrentUser() user: IUser): Promise<boolean> {
    if (user) return true;
    else return false;
  }
}
