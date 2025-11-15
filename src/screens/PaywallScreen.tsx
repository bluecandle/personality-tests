import React, { useState } from 'react';
import { Box, Button, Text, VStack, useToast } from 'native-base';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { purchasePremium, restorePremium } from '../services/iap';
import { useTestEngine } from '../state/TestEngineProvider';

type Props = NativeStackScreenProps<RootStackParamList, 'Paywall'>;

const PaywallScreen = ({ navigation }: Props) => {
  const { setPremiumUnlocked } = useTestEngine();
  const [isProcessing, setIsProcessing] = useState(false);
  const toast = useToast();

  const handleSuccess = () => {
    setPremiumUnlocked(true);
    navigation.goBack();
  };

  const handlePurchase = async () => {
    setIsProcessing(true);
    try {
      const success = await purchasePremium();
      if (success) {
        handleSuccess();
        toast.show({ description: '잠금이 해제되었습니다.' });
      } else {
        toast.show({ description: '결제가 취소되었어요.' });
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRestore = async () => {
    setIsProcessing(true);
    try {
      const restored = await restorePremium();
      if (restored) {
        handleSuccess();
        toast.show({ description: '구매 내역을 복원했어요.' });
      } else {
        toast.show({ description: '복원 가능한 구매 내역이 없어요.' });
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Box flex={1} bg="gray.900" safeArea px={4} py={4}>
      <VStack flex={1} space={6} justifyContent="space-between">
        <VStack space={3}>
          <Text fontSize="3xl" fontWeight="bold" color="white">
            전체 테스트 잠금 해제 + 광고 제거
          </Text>
          <Text color="gray.200">• 번아웃 외 모든 테스트 잠금 해제</Text>
          <Text color="gray.200">• 앱 내 광고 제거</Text>
          <Text color="gray.200">• 1,100원, 1회 결제</Text>
        </VStack>

        <VStack space={4}>
          <Button isLoading={isProcessing} onPress={handlePurchase} colorScheme="primary">
            1,100원에 잠금 해제하기
          </Button>

          <VStack space={1}>
            <Text color="gray.400" fontSize="xs">
              이미 구매하셨나요?
            </Text>
            <Button
              variant="outline"
              colorScheme="coolGray"
              onPress={handleRestore}
              isLoading={isProcessing}
              isDisabled={isProcessing}
            >
              구매 내역 복원하기
            </Button>
          </VStack>

          {/* TODO: 실제 배포 전에는 제거하거나 dev 전용 플래그로 숨길 것 */}
          <Button variant="ghost" colorScheme="emerald" onPress={handleSuccess} isDisabled={isProcessing}>
            개발용: 즉시 잠금 해제
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
