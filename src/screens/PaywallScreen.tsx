import React, { useState } from 'react';
import { Box, Button, Text, VStack } from 'native-base';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { purchaseRemoveAdsAndUnlock, restorePurchases } from '../services/iap';
import { useTestEngine } from '../state/TestEngineProvider';

type Props = NativeStackScreenProps<RootStackParamList, 'Paywall'>;

const PaywallScreen = ({ navigation }: Props) => {
  const { setPremiumUnlocked } = useTestEngine();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSuccess = () => {
    setPremiumUnlocked(true);
    navigation.goBack();
  };

  const handlePurchase = async () => {
    setIsProcessing(true);
    try {
      const success = await purchaseRemoveAdsAndUnlock();
      if (success) {
        handleSuccess();
      } else {
        // TODO: 실제 결제 실패 알림 처리
        console.log('[paywall] purchase failed (stub)');
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRestore = async () => {
    setIsProcessing(true);
    try {
      const restored = await restorePurchases();
      if (restored) {
        handleSuccess();
      } else {
        console.log('[paywall] restore failed (stub)');
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Box flex={1} bg="gray.900" safeArea>
      <VStack flex={1} px={6} py={8} justifyContent="center" space={6}>
        <Text fontSize="3xl" fontWeight="bold" color="white">
          전체 테스트 잠금 해제 + 광고 제거
        </Text>
        <VStack space={2}>
          <Text color="gray.200" fontWeight="semibold">
            포함 내용
          </Text>
          <Text color="gray.300">• 번아웃 외 모든 테스트 잠금 해제</Text>
          <Text color="gray.300">• 앱 내 광고 제거</Text>
          <Text color="gray.300">• 1,100원 (1회 결제)</Text>
        </VStack>
        <VStack space={3}>
          <Button isLoading={isProcessing} onPress={handlePurchase} colorScheme="primary">
            1,100원에 잠금 해제하기
          </Button>
          <Button variant="outline" colorScheme="coolGray" onPress={handleRestore} isLoading={isProcessing}>
            복구하기
          </Button>
          <Button
            variant="subtle"
            colorScheme="emerald"
            onPress={handleSuccess}
            isDisabled={isProcessing}
          >
            개발용: 바로 잠금 해제
          </Button>
        </VStack>
        <Button variant="ghost" colorScheme="coolGray" onPress={() => navigation.goBack()}>
          돌아가기
        </Button>
      </VStack>
    </Box>
  );
};

export default PaywallScreen;
