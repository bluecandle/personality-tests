declare module '@react-native-kakao/share' {
  export const Share: {
    sendCustom(params: { templateId: number; templateArgs?: Record<string, string> }): Promise<void>;
  };
}
