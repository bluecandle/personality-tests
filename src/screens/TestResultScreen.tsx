import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Box, Button, Text, VStack } from 'native-base';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { useTestEngine } from '../state/TestEngineProvider';
import { evaluateResult } from '../engine/testEvaluator';
import { AdEventType, createInterstitial } from '../services/admob';
import { shareResultNative, shareResultToKakao } from '../services/share';

type Props = NativeStackScreenProps<RootStackParamList, 'TestResult'>;

const TestResultScreen = ({ navigation }: Props) => {
  const { currentTest, scores, resetTest, isPremiumUnlocked } = useTestEngine();
  const [isSharing, setIsSharing] = useState(false);

  const result = useMemo(() => {
    if (!currentTest) {
      return undefined;
    }
    return evaluateResult(currentTest, scores);
  }, [currentTest, scores]);

  useEffect(() => {
    if (isPremiumUnlocked || !currentTest) {
      return;
    }

    const interstitial = createInterstitial();
    const unsubscribe = interstitial.onAdEvent((type: AdEventType) => {
      if (type === AdEventType.LOADED) {
        interstitial.show();
      }
      if (type === AdEventType.ERROR || type === AdEventType.CLOSED) {
        unsubscribe();
      }
    });

    interstitial.load();

    return () => {
      unsubscribe();
    };
  }, [isPremiumUnlocked, currentTest]);

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
  const hasAnyScore = Object.keys(scores).length > 0;
  const totalScore = hasAnyScore ? Object.values(scores).reduce((acc, value) => acc + value, 0) : undefined;

  const handleShare = useCallback(
    async (mode: 'kakao' | 'native') => {
      if (!currentTest || !result) {
        return;
      }
      setIsSharing(true);
      try {
        if (mode === 'kakao') {
          await shareResultToKakao({ test: currentTest, rule: result, totalScore });
        } else {
          await shareResultNative({ test: currentTest, rule: result, totalScore });
        }
      } finally {
        setIsSharing(false);
      }
    },
    [currentTest, result, totalScore],
  );

  return (
    <Box flex={1} bg="gray.900" safeArea>
      <VStack flex={1} px={6} py={8} space={6}>
        <VStack space={2}>
          <Text color="gray.400">테스트</Text>
          <Text color="white" fontSize="2xl" fontWeight="bold">
            {currentTest.title}
          </Text>
        </VStack>

        <VStack space={4} bg="gray.800" borderRadius="lg" borderColor="gray.700" borderWidth={1} px={4} py={6} alignItems="center">
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

        <VStack space={3}>
          <Button
            colorScheme="yellow"
            _text={{ color: 'black', fontWeight: 'bold' }}
            onPress={() => handleShare('kakao')}
            isDisabled={isSharing}
          >
            카카오톡으로 결과 공유하기
          </Button>
          <Button variant="outline" colorScheme="coolGray" onPress={() => handleShare('native')} isDisabled={isSharing}>
            기타 앱으로 결과 공유하기
          </Button>
        </VStack>

        <Button onPress={handleBackToList} colorScheme="primary" mt="auto">
          다른 테스트 해보기
        </Button>
      </VStack>
    </Box>
  );
};

export default TestResultScreen;
