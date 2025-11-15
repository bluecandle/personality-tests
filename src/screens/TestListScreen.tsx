import React, { useMemo, useState } from 'react';
import { FlatList } from 'react-native';
import { Actionsheet, Badge, Box, Button, HStack, Pressable, Text, VStack, useToast } from 'native-base';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { getAllTests } from '../engine/testLoader';
import { PersonalityTest } from '../engine/testTypes';
import { useTestEngine } from '../state/TestEngineProvider';
import { BannerAd, BannerAdSize, getBannerUnitId, showRewardedForTestUnlock } from '../services/admob';

type Props = NativeStackScreenProps<RootStackParamList, 'TestList'>;

const TestListScreen = ({ navigation }: Props) => {
  const { isPremiumUnlocked, isTestUnlocked, unlockTestWithAd } = useTestEngine();
  const tests = useMemo(() => getAllTests(), []);
  const [selectedTest, setSelectedTest] = useState<PersonalityTest | null>(null);
  const [isUnlockSheetOpen, setUnlockSheetOpen] = useState(false);
  const toast = useToast();

  const handlePress = (test: PersonalityTest) => {
    if (isTestUnlocked(test)) {
      navigation.navigate('TestIntro', { testId: test.id });
      return;
    }
    setSelectedTest(test);
    setUnlockSheetOpen(true);
  };

  const renderItem = ({ item }: { item: PersonalityTest }) => {
    const isLocked = !isTestUnlocked(item);
    return (
      <Pressable onPress={() => handlePress(item)}>
        <Box bg="gray.800" borderRadius="lg" borderColor="gray.700" borderWidth={1} px={4} py={5}>
          <HStack alignItems="center" justifyContent="space-between">
            <Text fontSize="xl" fontWeight="bold" color="white" flex={1} mr={3}>
              {item.title}
            </Text>
            {!item.visibleForFree && isLocked && (
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
              {isLocked ? '잠금' : '이용 가능'}
            </Text>
          </HStack>
        </Box>
      </Pressable>
    );
  };

  const closeUnlockSheet = () => {
    setUnlockSheetOpen(false);
    setSelectedTest(null);
  };

  const handleWatchAd = async () => {
    if (!selectedTest) {
      return;
    }
    const target = selectedTest;
    closeUnlockSheet();
    setSelectedTest(null);
    const rewarded = await showRewardedForTestUnlock();
    if (rewarded) {
      unlockTestWithAd(target.id);
      toast.show({ description: '광고를 시청하여 잠금이 해제되었습니다.' });
      navigation.navigate('TestIntro', { testId: target.id });
    } else {
      toast.show({ description: '광고를 끝까지 보지 않아 잠금이 유지됩니다.' });
    }
  };

  const handleGoPremium = () => {
    closeUnlockSheet();
    navigation.navigate('Paywall');
  };

  return (
    <>
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
          contentContainerStyle={{ paddingBottom: 16 }}
          ListEmptyComponent={
            <Box bg="gray.800" borderRadius="lg" borderColor="gray.700" borderWidth={1} px={4} py={6}>
              <Text color="gray.300">등록된 테스트가 없습니다.</Text>
            </Box>
          }
        />
        {!isPremiumUnlocked && (
          <Box mt={4} alignItems="center">
            <BannerAd
              unitId={getBannerUnitId()}
              size={BannerAdSize.ADAPTIVE_BANNER}
              onAdFailedToLoad={(error: unknown) => console.log('[admob] banner error', error)}
            />
          </Box>
        )}
        </VStack>
      </Box>
      <Actionsheet isOpen={isUnlockSheetOpen} onClose={closeUnlockSheet}>
        <Actionsheet.Content bg="gray.900">
          <Text fontSize="lg" fontWeight="bold" color="white" mb={2}>
            {selectedTest?.title}
          </Text>
          <Text color="gray.400" fontSize="sm" mb={4} textAlign="center">
            이 테스트를 보려면 아래 옵션 중 하나를 선택하세요.
          </Text>
          <Button onPress={handleWatchAd} w="100%" mb={3}>
            광고 보고 이 테스트 한 번 무료로 풀기
          </Button>
          <Button variant="outline" colorScheme="coolGray" onPress={handleGoPremium} w="100%">
            1,100원에 전체 잠금 해제 + 광고 제거
          </Button>
          <Button variant="ghost" colorScheme="coolGray" mt={4} onPress={closeUnlockSheet}>
            닫기
          </Button>
        </Actionsheet.Content>
      </Actionsheet>
    </>
  );
};

export default TestListScreen;
