import React, { PropsWithChildren, createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { accumulateScores } from '../engine/testEvaluator';
import { PersonalityTest, ScoreMap, TestOption } from '../engine/testTypes';
import { initIAP, restorePremium } from '../services/iap';

interface TestEngineContextValue {
  currentTest?: PersonalityTest;
  currentIndex: number;
  scores: ScoreMap;
  isPremiumUnlocked: boolean;
  startTest: (test: PersonalityTest) => void;
  selectOption: (option: TestOption) => void;
  resetTest: () => void;
  setPremiumUnlocked: (value: boolean) => void;
}

const TestEngineContext = createContext<TestEngineContextValue | undefined>(undefined);

export const TestEngineProvider = ({ children }: PropsWithChildren) => {
  const [currentTest, setCurrentTest] = useState<PersonalityTest | undefined>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scores, setScores] = useState<ScoreMap>({});
  const [isPremiumUnlocked, setIsPremiumUnlocked] = useState(false);

  useEffect(() => {
    (async () => {
      await initIAP();
      const hasPremium = await restorePremium();
      if (hasPremium) {
        setIsPremiumUnlocked(true);
      }
    })();
  }, []);

  const startTest = useCallback((test: PersonalityTest) => {
    setCurrentTest(test);
    setCurrentIndex(0);
    setScores({});
  }, []);

  const selectOption = useCallback((option: TestOption) => {
    setScores((prev) => accumulateScores(prev, option));
    setCurrentIndex((prev) => prev + 1);
  }, []);

  const resetTest = useCallback(() => {
    setCurrentTest(undefined);
    setCurrentIndex(0);
    setScores({});
  }, []);

  const setPremiumUnlocked = useCallback((value: boolean) => {
    setIsPremiumUnlocked(value);
  }, []);

  const value = useMemo<TestEngineContextValue>(
    () => ({
      currentTest,
      currentIndex,
      scores,
      isPremiumUnlocked,
      startTest,
      selectOption,
      resetTest,
      setPremiumUnlocked,
    }),
    [currentTest, currentIndex, scores, isPremiumUnlocked, startTest, selectOption, resetTest, setPremiumUnlocked],
  );

  return <TestEngineContext.Provider value={value}>{children}</TestEngineContext.Provider>;
};

export const useTestEngine = (): TestEngineContextValue => {
  const context = useContext(TestEngineContext);
  if (!context) {
    throw new Error('useTestEngine must be used within a TestEngineProvider');
  }
  return context;
};
