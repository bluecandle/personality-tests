import React, { useEffect, useMemo } from 'react';
import { Box, Button, Text, VStack } from 'native-base';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { useTestEngine } from '../state/TestEngineProvider';
import { evaluateResult } from '../engine/testEvaluator';
import { maybeShowInterstitialAfterTest } from '../services/ads';

type Props = NativeStackScreenProps<RootStackParamList, 'TestResult'>;

const TestResultScreen = ({ navigation }: Props) => {
  const { currentTest, scores, resetTest } = useTestEngine();

  const result = useMemo(() => {
    if (!currentTest) {
      return undefined;
    }
    return evaluateResult(currentTest, scores);
  }, [currentTest, scores]);

  useEffect(() => {
    if (currentTest) {
      maybeShowInterstitialAfterTest();
    }
  }, [currentTest]);

  const handleBackToList = () => {
    resetTest();
    navigation.replace('TestList');
  };

  if (!currentTest || !result) {
    return (
      <Box flex={1} bg="gray.900" safeArea px={6} py={8} justifyContent="center">
        <VStack space={4}>
          <Text color="white" fontSize="xl" fontWeight="bold">
            결과를 표시할 테스트가 없습니다.
          </Text>
          <Button onPress={handleBackToList}>목록으로</Button>
        </VStack>
      </Box>
    );
  }

  const isBurnoutTest = currentTest.id === 'burnout_test_01';
  const burnoutScore = scores.burnout ?? 0;

  return (
    <Box flex={1} bg="gray.900" safeArea>
      <VStack flex={1} px={6} py={8} space={6}>
        <VStack space={2}>
          <Text color="gray.400">테스트</Text>
          <Text color="white" fontSize="2xl" fontWeight="bold">
            {currentTest.title}
          </Text>
        </VStack>

        <VStack
          space={4}
          bg="gray.800"
          borderRadius="lg"
          borderColor="gray.700"
          borderWidth={1}
          px={4}
          py={6}
          alignItems="center"
        >
          {result.icon && (
            <Text fontSize="5xl" accessibilityLabel="result icon">
              {result.icon}
            </Text>
          )}
          <Text color="primary.300" fontSize="xl" fontWeight="bold" textAlign="center">
            {result.title}
          </Text>
          {isBurnoutTest && (
            <Text color="gray.100" fontWeight="semibold">
              내 번아웃 점수: {burnoutScore}점 ({result.title})
            </Text>
          )}
          <Text color="gray.200" fontWeight="medium" textAlign="center">
            {result.summary}
          </Text>
          <Text color="gray.300">{result.description}</Text>
        </VStack>

        {/* TODO: Add share CTA or ad placements near the result block */}

        <Button onPress={handleBackToList} colorScheme="primary" mt="auto">
          다른 테스트 해보기
        </Button>
      </VStack>
    </Box>
  );
};

export default TestResultScreen;
