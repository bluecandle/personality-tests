import React, { useMemo } from 'react';
import { FlatList } from 'react-native';
import { Badge, Box, Button, HStack, Pressable, Text, VStack } from 'native-base';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { getAllTests } from '../engine/testLoader';
import { PersonalityTest } from '../engine/testTypes';
import { useTestEngine } from '../state/TestEngineProvider';

type Props = NativeStackScreenProps<RootStackParamList, 'TestList'>;

const TestListScreen = ({ navigation }: Props) => {
  const { isPremiumUnlocked } = useTestEngine();
  const tests = useMemo(() => getAllTests(), []);

  const handlePress = (test: PersonalityTest) => {
    const isLocked = !test.visibleForFree && !isPremiumUnlocked;
    if (isLocked) {
      navigation.navigate('Paywall');
    } else {
      navigation.navigate('TestIntro', { testId: test.id });
    }
  };

  const renderItem = ({ item }: { item: PersonalityTest }) => {
    const isLocked = !item.visibleForFree && !isPremiumUnlocked;
    return (
      <Pressable onPress={() => handlePress(item)}>
        <Box bg="gray.800" borderRadius="lg" borderColor="gray.700" borderWidth={1} px={4} py={5}>
          <HStack alignItems="center" justifyContent="space-between">
            <Text fontSize="xl" fontWeight="bold" color="white" flex={1} mr={3}>
              {item.title}
            </Text>
            {isLocked && (
              <Badge colorScheme="secondary" variant="solid" rounded="md">
                PRO
              </Badge>
            )}
          </HStack>
          <Text color="gray.300" mt={2}>
            {item.description}
          </Text>
          <HStack mt={4} alignItems="center" justifyContent="space-between">
            <Text color="gray.400">예상 시간 {item.estimatedMinutes}분</Text>
            <Text color={isLocked ? 'rose.400' : 'emerald.400'} fontWeight="medium">
              {isLocked ? '잠금' : '무료 이용 가능'}
            </Text>
          </HStack>
        </Box>
      </Pressable>
    );
  };

  return (
    <Box flex={1} bg="gray.900" safeArea>
      <VStack flex={1} space={4} px={4} py={4}>
        <HStack alignItems="center" justifyContent="space-between">
          <Text fontSize="2xl" fontWeight="bold" color="white">
            영포티 심리 테스트
          </Text>
          <Button
            variant="ghost"
            colorScheme="coolGray"
            onPress={() => navigation.navigate('Settings')}
          >
            설정
          </Button>
        </HStack>
        <FlatList
          data={tests}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <Box height={4} />}
          contentContainerStyle={{ paddingBottom: 32 }}
          ListEmptyComponent={
            <Box bg="gray.800" borderRadius="lg" borderColor="gray.700" borderWidth={1} px={4} py={6}>
              <Text color="gray.300">등록된 테스트가 없습니다.</Text>
            </Box>
          }
        />
      </VStack>
    </Box>
  );
};

export default TestListScreen;
