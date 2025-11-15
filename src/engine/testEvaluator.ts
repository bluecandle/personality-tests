import { PersonalityTest, ScoreMap, TestOption, TestResultRule } from './testTypes';

export const accumulateScores = (currentScores: ScoreMap, option: TestOption): ScoreMap => {
  const nextScores: ScoreMap = { ...currentScores };

  Object.entries(option.scores).forEach(([key, value]) => {
    nextScores[key] = (nextScores[key] ?? 0) + value;
  });

  return nextScores;
};

const satisfiesCondition = (scoreValue: number, operator: 'min' | 'max', target: number): boolean => {
  if (operator === 'min') {
    return scoreValue >= target;
  }

  return scoreValue <= target;
};

export const evaluateResult = (test: PersonalityTest, scores: ScoreMap): TestResultRule => {
  for (const rule of test.resultRules) {
    const { condition } = rule;
    const isMatch = Object.entries(condition).every(([key, value]) => {
      if (typeof value !== 'number') {
        return true;
      }

      if (key.endsWith('_min')) {
        const scoreKey = key.replace(/_min$/, '');
        const scoreValue = scores[scoreKey] ?? 0;
        return satisfiesCondition(scoreValue, 'min', value);
      }

      if (key.endsWith('_max')) {
        const scoreKey = key.replace(/_max$/, '');
        const scoreValue = scores[scoreKey] ?? 0;
        return satisfiesCondition(scoreValue, 'max', value);
      }

      const scoreValue = scores[key] ?? 0;
      return scoreValue >= value;
    });

    if (isMatch) {
      return rule;
    }
  }

  return test.resultRules[0];
};
