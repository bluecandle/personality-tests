declare module 'expo-iap' {
  export interface Product {
    productId: string;
    price: string;
    title?: string;
    description?: string;
  }

  export interface Purchase {
    productId: string;
    purchaseToken?: string;
    acknowledged?: boolean;
  }

  export enum IAPResponseCode {
    OK = 0,
  }

  export function connectAsync(): Promise<void>;
  export function getProductsAsync(productIds: string[]): Promise<Product[] | { results?: Product[] }>;
  export function purchaseItemAsync(productId: string): Promise<Purchase>;
  export function getPurchaseHistoryAsync(refresh?: boolean): Promise<Purchase[] | { results?: Purchase[] }>;
}
