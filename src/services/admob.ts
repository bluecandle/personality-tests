import mobileAds, {
  MaxAdContentRating,
  BannerAd,
  BannerAdSize,
  InterstitialAd,
  AdEventType,
  TestIds,
} from 'react-native-google-mobile-ads';

const isDev = __DEV__;

const PROD_BANNER_UNIT_ID = 'ca-app-pub-XXXXXXXXXXXXXXXX/BBBBBBBBBB'; // TODO: 실제 ID로 교체
const PROD_INTERSTITIAL_UNIT_ID = 'ca-app-pub-XXXXXXXXXXXXXXXX/IIIIIIIIII'; // TODO: 실제 ID로 교체

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

export function createInterstitial(): InterstitialAd {
  return InterstitialAd.createForAdRequest(getInterstitialUnitId(), {
    requestNonPersonalizedAdsOnly: false,
  });
}

export { BannerAd, BannerAdSize, InterstitialAd, AdEventType };
