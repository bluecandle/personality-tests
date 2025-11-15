import React from 'react';
import { Box, Button, Text, VStack } from 'native-base';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { useTestEngine } from '../state/TestEngineProvider';

type Props = NativeStackScreenProps<RootStackParamList, 'Settings'>;

const SettingsScreen = ({ navigation }: Props) => {
  const { isPremiumUnlocked, setPremiumUnlocked } = useTestEngine();

  const togglePremium = () => {
    setPremiumUnlocked(!isPremiumUnlocked);
  };

  return (
    <Box flex={1} bg="gray.900" safeArea>
      <VStack flex={1} px={6} py={4} space={4}>
        <Text fontSize="2xl" fontWeight="bold" color="white">
          설정
        </Text>
        <Text color="gray.300">간단한 토글을 넣어두었습니다. 실제 설정 화면은 추후 확장 예정입니다.</Text>
        <Button onPress={togglePremium} colorScheme="primary">
          {isPremiumUnlocked ? '프리미엄 잠금' : '프리미엄 잠금 해제'}
        </Button>
        <Button variant="outline" colorScheme="coolGray" onPress={() => navigation.goBack()}>
          뒤로가기
        </Button>
      </VStack>
    </Box>
  );
};

export default SettingsScreen;
