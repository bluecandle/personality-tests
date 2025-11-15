import React, { useMemo } from 'react';
import { Box, Button, HStack, IconButton, Text, VStack, ArrowBackIcon } from 'native-base';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { getTestById } from '../engine/testLoader';
import { useTestEngine } from '../state/TestEngineProvider';

type Props = NativeStackScreenProps<RootStackParamList, 'TestIntro'>;

const TestIntroScreen = ({ navigation, route }: Props) => {
  const { testId } = route.params;
  const { startTest } = useTestEngine();
  const test = useMemo(() => getTestById(testId), [testId]);

  const handleStart = () => {
    if (!test) {
      return;
    }
    startTest(test);
    navigation.navigate('TestQuestion');
  };

  if (!test) {
    return (
      <Box flex={1} bg="gray.900" safeArea px={6} py={8} justifyContent="center">
        <VStack space={4}>
          <Text color="white" fontSize="xl" fontWeight="bold">
            테스트를 찾을 수 없습니다.
          </Text>
          <Button onPress={() => navigation.replace('TestList')}>목록으로</Button>
        </VStack>
      </Box>
    );
  }

  return (
    <Box flex={1} bg="gray.900" safeArea px={6} py={8}>
      <VStack flex={1} justifyContent="space-between">
        <VStack space={4}>
          <HStack alignItems="center" space={3}>
            <IconButton
              onPress={() => navigation.goBack()}
              icon={<ArrowBackIcon color="gray.100" />}
              borderRadius="full"
              variant="subtle"
            />
            <Text fontSize="md" fontWeight="bold" color="gray.100">
              테스트 소개
            </Text>
          </HStack>
          <Text fontSize="2xl" fontWeight="bold" color="white">
            {test.title}
          </Text>
          <Text color="gray.300">{test.description}</Text>
          <HStack alignItems="center" space={2}>
            <Text color="gray.400">예상 소요</Text>
            <Text color="white" fontWeight="semibold">
              {test.estimatedMinutes}분
            </Text>
          </HStack>
        </VStack>
        <Button onPress={handleStart} colorScheme="primary" size="lg">
          시작하기
        </Button>
      </VStack>
    </Box>
  );
};

export default TestIntroScreen;
