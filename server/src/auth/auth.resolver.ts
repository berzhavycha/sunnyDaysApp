import { Args, Context, Mutation, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthType } from "./entities";
import { UserDto, RefreshTokenDto } from "./dtos";
import { LocalAuthGuard, JwtRefreshTokenGuard } from "./guards";
import {  Public } from "./decorators";


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
        @Args('userDto') userDto: UserDto,
        @Context() context
    ) {
        return await this.authService.signIn(context.user)
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