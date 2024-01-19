import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { Cache } from "cache-manager";
import { CACHE_MANAGER } from "@nestjs/cache-manager";

@Injectable()
export class RefreshTokenIdsStorage {
  constructor(@Inject(CACHE_MANAGER) private cacheService: Cache) {}

  async insert(userId: string, tokenId: string): Promise<void> {
    await this.cacheService.set(this.getKey(userId), tokenId);
  }

  async validate(userId: string, tokenId: string): Promise<boolean> {
    const storedId = await this.cacheService.get(this.getKey(userId));
    if (storedId !== tokenId) {
      throw new UnauthorizedException("Invalid refresh token");
    }
    return storedId === tokenId;
  }

  async invalidate(userId: string): Promise<void> {
    await this.cacheService.del(this.getKey(userId));
  }

  private getKey(userId: string): string {
    return `user-${userId}`;
  }
}
