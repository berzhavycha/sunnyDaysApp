import { upperCaseEveryFirstLetter } from '@shared';

export const DEFAULT_ORDER_COLUMN = 'createdAt';
export const DEFAULT_ORDER = 'ASC';

export const subscriptionErrorMessages = {
  subscriptionExists: (cityName: string): string =>
    `You already have a subscription for ${upperCaseEveryFirstLetter(
      cityName,
    )}`,
  subscriptionNotFound: (cityName: string): string =>
    `Subscription not found for city '${cityName}'`,
};
