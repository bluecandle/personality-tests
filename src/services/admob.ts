import mobileAds, {
  MaxAdContentRating,
  BannerAd,
  BannerAdSize,
  InterstitialAd,
  RewardedAd,
  RewardedAdEventType,
  AdEventType,
  TestIds,
} from 'react-native-google-mobile-ads';

const isDev = __DEV__;

const PROD_BANNER_UNIT_ID = 'ca-app-pub-XXXXXXXXXXXXXXXX/BBBBBBBBBB'; // TODO: 실제 ID로 교체
const PROD_INTERSTITIAL_UNIT_ID = 'ca-app-pub-XXXXXXXXXXXXXXXX/IIIIIIIIII'; // TODO: 실제 ID로 교체
const PROD_REWARDED_UNIT_ID = 'ca-app-pub-XXXXXXXXXXXXXXXX/RRRRRRRRRR'; // TODO: 실제 Rewarded ID

export async function initAdmob(): Promise<void> {
  await mobileAds().setRequestConfiguration({
    maxAdContentRating: MaxAdContentRating.PG,
  });
  await mobileAds().initialize();
}

export function getBannerUnitId(): string {
  return isDev ? TestIds.BANNER : PROD_BANNER_UNIT_ID;
}

export function getInterstitialUnitId(): string {
  return isDev ? TestIds.INTERSTITIAL : PROD_INTERSTITIAL_UNIT_ID;
}

export function getRewardedUnitId(): string {
  return isDev ? TestIds.REWARDED : PROD_REWARDED_UNIT_ID;
}

export function createInterstitial(): InterstitialAd {
  return InterstitialAd.createForAdRequest(getInterstitialUnitId(), {
    requestNonPersonalizedAdsOnly: false,
  });
}

export function createRewarded(): RewardedAd {
  return RewardedAd.createForAdRequest(getRewardedUnitId(), {
    requestNonPersonalizedAdsOnly: false,
  });
}

export async function showRewardedForTestUnlock(): Promise<boolean> {
  return new Promise((resolve) => {
    const rewarded = createRewarded();
    let rewardedEarned = false;

    const unsubscribe = rewarded.onAdEvent((type) => {
      if (type === AdEventType.LOADED) {
        rewarded.show();
      }

      if (type === RewardedAdEventType.EARNED_REWARD) {
        rewardedEarned = true;
      }

      if (type === AdEventType.CLOSED || type === AdEventType.ERROR) {
        unsubscribe();
        resolve(rewardedEarned);
      }
    });

    rewarded.load();
  });
}

export { BannerAd, BannerAdSize, InterstitialAd, AdEventType };
