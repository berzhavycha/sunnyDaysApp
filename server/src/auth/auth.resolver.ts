import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthType } from "./entities";
import { UserDto, RefreshTokenDto } from "./dtos";
import { LocalAuthGuard, JwtRefreshTokenGuard } from "./guards";
import { CurrentUser, Public } from "./decorators";
import { User } from "@users";

@Resolver(() => AuthType)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Mutation(() => AuthType)
  async signUp(@Args("userDto") userDto: UserDto): Promise<AuthType> {
    return await this.authService.signUp(userDto);
  }

  @Public()
  @Mutation(() => AuthType)
  @UseGuards(LocalAuthGuard)
  async signIn(
    @Args("userDto") _userDto: UserDto,
    @CurrentUser() user: User,
  ): Promise<AuthType> {
    return await this.authService.signIn(user);
  }

  @Public()
  @Mutation(() => AuthType)
  @UseGuards(JwtRefreshTokenGuard)
  public async refreshAccess(
    @Args("refreshTokenDto") refreshTokenDto: RefreshTokenDto,
  ): Promise<AuthType> {
    return await this.authService.refreshAccessToken(
      refreshTokenDto.refreshToken,
    );
  }

  @Mutation(() => String)
  public async invalidateToken(
    @Args("authorization") authorization: string,
  ): Promise<void> {
    const token = authorization.split(" ")[1];
    await this.authService.invalidateToken(token);
  }
}
