import React from 'react';
import { Box, Button, Text, VStack } from 'native-base';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Paywall'>;

const PaywallScreen = ({ navigation }: Props) => {
  return (
    <Box flex={1} bg="gray.900" safeArea>
      <VStack flex={1} px={6} py={8} justifyContent="center" space={6}>
        <Text fontSize="3xl" fontWeight="bold" color="white">
          프리미엄 테스트 잠금 해제
        </Text>
        <Text color="gray.300">
          아직 결제 연동이 되지 않아 데모 메시지만 노출됩니다. 나중에 IAP/AdMob 연동 시 실제 Paywall 로직을 연결할 수
          있게 구조만 마련해두었습니다.
        </Text>
        <Button onPress={() => navigation.goBack()} colorScheme="primary">
          돌아가기
        </Button>
      </VStack>
    </Box>
  );
};

export default PaywallScreen;
