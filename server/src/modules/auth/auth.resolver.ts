import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthType } from './entities';
import { UserDto } from './dtos';
import { LocalAuthGuard, JwtRefreshTokenGuard } from './guards';
import { ExtendedGraphQLContext } from '@configs';
import { User } from '@modules/users';
import { CurrentUser, Public } from './decorators';
import { COOKIE_EXPIRY_TIME } from '@global';

@Resolver(() => AuthType)
export class AuthResolver {
  constructor(private readonly authService: AuthService) { }

  @Public()
  @Mutation(() => String)
  async signUp(
    @Args('UserInput') userDto: UserDto,
    @Context() context: ExtendedGraphQLContext,
  ): Promise<string> {
    const tokens = await this.authService.signUp(userDto);
    this.setCookies(context.res, tokens);

    return 'Has signed up successfully!';
  }

  @Public()
  @Mutation(() => String)
  @UseGuards(LocalAuthGuard)
  async signIn(
    @Args('UserInput') userDto: UserDto,
    @Context() context: ExtendedGraphQLContext,
  ): Promise<string> {
    const tokens = await this.authService.signIn(context.user);
    this.setCookies(context.res, tokens);

    return 'Has signed in successfully!';
  }

  @Public()
  @Mutation(() => String)
  @UseGuards(JwtRefreshTokenGuard)
  async refreshAccess(
    @Context() context: ExtendedGraphQLContext,
  ): Promise<string> {
    const refreshToken = context.req.cookies.tokens.refreshToken;

    if (!refreshToken) {
      throw new Error('Refresh token not found in cookies.');
    }

    const tokens = await this.authService.refreshAccessToken(refreshToken);
    this.setCookies(context.res, tokens);

    return 'Has signed refreshed token successfully!';
  }

  @Public()
  @Mutation(() => String, { nullable: true })
  public async signOut(
    @CurrentUser() user: User
  ): Promise<string> {
    await this.authService.invalidateToken(user.id);

    return 'Has signed out successfully!';
  }

  private setCookies(response: ExtendedGraphQLContext['res'], tokens: AuthType): void {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + COOKIE_EXPIRY_TIME);

    response.cookie('tokens', tokens, {
      httpOnly: true,
      secure: true,
      expires: expiryDate,
      sameSite: 'strict'
    });
  }
}
