export const IAP_PRODUCT_ID_REMOVE_ADS = 'remove_ads_and_unlock_all_tests';

export async function initIAP(): Promise<void> {
  // TODO: IAP SDK 초기화 (나중에 구현)
  console.log('[iap] initIAP (stub)');
}

export async function purchaseRemoveAdsAndUnlock(): Promise<boolean> {
  // TODO: 실제 구매 로직 (나중에 구현)
  console.log('[iap] purchaseRemoveAdsAndUnlock (stub)');
  return false;
}

export async function restorePurchases(): Promise<boolean> {
  // TODO: 복구 로직 (나중에 구현)
  console.log('[iap] restorePurchases (stub)');
  return false;
}
