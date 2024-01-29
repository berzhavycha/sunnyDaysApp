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
  constructor(
    private readonly authService: AuthService
  ) { }

  @Public()
  @Mutation(() => String)
  async signUp(
    @Args('UserInput') userDto: UserDto,
    @Context() context: ExtendedGraphQLContext,
  ): Promise<string> {
    await this.authService.signUp(userDto, context.res);

    return 'Has signed up successfully!';
  }

  @Public()
  @Mutation(() => String)
  @UseGuards(LocalAuthGuard)
  async signIn(
    @Args('UserInput') userDto: UserDto,
    @Context() context: ExtendedGraphQLContext,
  ): Promise<string> {
    await this.authService.signIn(context);

    return 'Has signed in successfully!';
  }

  @Public()
  @Mutation(() => String)
  @UseGuards(JwtRefreshTokenGuard)
  async refreshAccess(
    @Context() context: ExtendedGraphQLContext,
  ): Promise<string> {
    this.authService.refreshAccessToken(context)

    return 'Has signed refreshed token successfully!';
  }

  @Mutation(() => String)
  public async signOut(
    @CurrentUser() user: IUser,
    @Context() context: ExtendedGraphQLContext,
  ): Promise<string> {
    await this.authService.signOut(user.id, context.res);

    return 'Has signed out successfully!';
  }

  @Query(() => Boolean)
  public async isUserSignedIn(
    @CurrentUser() user: IUser,
  ): Promise<boolean> {
    if (user) return true
    else return false
  }
}
