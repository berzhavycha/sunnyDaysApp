import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthType } from './entities';
import { UserDto, RefreshTokenDto } from './dtos';
import { LocalAuthGuard, JwtRefreshTokenGuard } from './guards';
import { ExtendedGraphQLContext } from '@configs';
import { User } from '@modules/users';
import { CurrentUser, Public } from './decorators';

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
    @CurrentUser() user: User
  ): Promise<string> {
    const tokens = await this.authService.signIn(context.user);
    this.setCookies(context.res, tokens);
    // console.log(user)

    return 'Has signed in successfully!';
  }

  @Public()
  @Mutation(() => String)
  @UseGuards(JwtRefreshTokenGuard)
  async refreshAccess(
    @Args('RefreshTokenInput') refreshTokenDto: RefreshTokenDto,
    @Context() context: ExtendedGraphQLContext,
  ): Promise<string> {
    const tokens = await this.authService.refreshAccessToken(refreshTokenDto.refreshToken);
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
    response.cookie('tokens', tokens, {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + 1 * 24 * 60 * 1000),
      sameSite: 'strict'
    });
  }
}
