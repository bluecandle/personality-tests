import * as IAP from 'expo-iap';

export const PREMIUM_PRODUCT_ID = 'youngforty_remove_ads_unlock_all'; // TODO: 실제 콘솔 productId와 동일하게

let products: IAP.Product[] = [];

export async function initIAP(): Promise<void> {
  try {
    await IAP.connectAsync();
    const response = await IAP.getProductsAsync([PREMIUM_PRODUCT_ID]);
    const fetchedProducts = ((response as unknown as { results?: IAP.Product[] })?.results ?? response) as IAP.Product[];
    products = fetchedProducts ?? [];
    console.log('[iap] products', products);
  } catch (e) {
    console.log('[iap] init error', e);
  }
}

export async function purchasePremium(): Promise<boolean> {
  try {
    const result = await IAP.purchaseItemAsync(PREMIUM_PRODUCT_ID);
    console.log('[iap] purchase result', result);
    // TODO: expo-iap 필드를 확인해 정확한 성공 조건 적용
    return true;
  } catch (e: any) {
    if (e?.code === 'E_USER_CANCELLED') {
      console.log('[iap] user cancelled');
      return false;
    }
    console.log('[iap] purchase error', e);
    return false;
  }
}

export async function restorePremium(): Promise<boolean> {
  try {
    const history = await IAP.getPurchaseHistoryAsync(false);
    const purchases = ((history as unknown as { results?: IAP.Purchase[] })?.results ?? history ?? []) as IAP.Purchase[];
    const hasPremium = purchases.some((p: any) => p.productId === PREMIUM_PRODUCT_ID);
    console.log('[iap] restore result', hasPremium);
    return hasPremium;
  } catch (e) {
    console.log('[iap] restore error', e);
    return false;
  }
}
