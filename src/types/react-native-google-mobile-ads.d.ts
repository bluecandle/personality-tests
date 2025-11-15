import * as React from 'react';

declare module 'react-native-google-mobile-ads' {
  export enum MaxAdContentRating {
    G = 'G',
    PG = 'PG',
    T = 'T',
    MA = 'MA',
  }

  export enum BannerAdSize {
    BANNER = 'BANNER',
    ADAPTIVE_BANNER = 'ADAPTIVE_BANNER',
  }

  export enum AdEventType {
    LOADED = 'loaded',
    ERROR = 'error',
    OPENED = 'opened',
    CLOSED = 'closed',
  }

  export const TestIds: {
    BANNER: string;
    INTERSTITIAL: string;
  };

  export class InterstitialAd {
    static createForAdRequest(unitId: string, options?: Record<string, unknown>): InterstitialAd;
    load(): void;
    show(): void;
    onAdEvent(callback: (type: AdEventType, error?: Error) => void): () => void;
  }

  export class BannerAd extends React.Component<any> {}

  export default function mobileAds(): {
    setRequestConfiguration(config: { maxAdContentRating: MaxAdContentRating }): Promise<void>;
    initialize(): Promise<void>;
  };

  export { BannerAdSize };
}
