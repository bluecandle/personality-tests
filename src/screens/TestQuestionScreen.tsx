import React, { useEffect } from 'react';
import { Box, Button, HStack, Pressable, Progress, Text, VStack } from 'native-base';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { useTestEngine } from '../state/TestEngineProvider';
import { TestOption } from '../engine/testTypes';

type Props = NativeStackScreenProps<RootStackParamList, 'TestQuestion'>;

const TestQuestionScreen = ({ navigation }: Props) => {
  const { currentTest, currentIndex, selectOption } = useTestEngine();

  useEffect(() => {
    if (currentTest && currentIndex >= currentTest.questions.length) {
      navigation.replace('TestResult');
    }
  }, [currentTest, currentIndex, navigation]);

  if (!currentTest) {
    return (
      <Box flex={1} bg="gray.900" safeArea px={6} py={8} justifyContent="center">
        <VStack space={4}>
          <Text color="white" fontSize="xl" fontWeight="bold">
            진행 중인 테스트가 없습니다.
          </Text>
          <Button onPress={() => navigation.replace('TestList')}>목록으로</Button>
        </VStack>
      </Box>
    );
  }

  const total = currentTest.questions.length;
  const question = currentTest.questions[currentIndex];
  const progressValue = question ? ((currentIndex + 1) / total) * 100 : 100;

  const handleSelect = (option: TestOption) => {
    selectOption(option);
  };

  if (!question) {
    return (
      <Box flex={1} bg="gray.900" safeArea px={6} py={8} justifyContent="center">
        <VStack space={4}>
          <Text color="gray.300">문항 정보를 불러오는 중입니다...</Text>
        </VStack>
      </Box>
    );
  }

  return (
    <Box flex={1} bg="gray.900" safeArea>
      <VStack flex={1} px={6} py={8} space={6}>
        <VStack space={2}>
          <HStack justifyContent="space-between" alignItems="center">
            <Text color="gray.400">
              {currentIndex + 1} / {total}
            </Text>
            <Text color="gray.400">진행률 {Math.round(progressValue)}%</Text>
          </HStack>
          <Progress value={progressValue} colorScheme="primary" bg="gray.700" />
        </VStack>

        <Box bg="gray.800" borderRadius="lg" borderColor="gray.700" borderWidth={1} px={4} py={6}>
          <Text fontSize="lg" fontWeight="bold" color="white">
            {question.text}
          </Text>
        </Box>

        <VStack space={3}>
          {question.options.map((option) => (
            <Pressable key={option.id} onPress={() => handleSelect(option)}>
              {({ isPressed }) => (
                <Box
                  bg={isPressed ? 'gray.700' : 'gray.800'}
                  borderRadius="lg"
                  borderColor="gray.700"
                  borderWidth={1}
                  px={4}
                  py={4}
                >
                  <Text color="white" fontWeight="medium">
                    {option.text}
                  </Text>
                </Box>
              )}
            </Pressable>
          ))}
        </VStack>
      </VStack>
    </Box>
  );
};

export default TestQuestionScreen;
