export type ScoreMap = Record<string, number>;

export interface TestOption {
  id: string;
  text: string;
  scores: ScoreMap;
}

export interface TestQuestion {
  id: string;
  text: string;
  type: 'single_choice';
  options: TestOption[];
}

export interface ResultCondition {
  [key: string]: number | undefined;
}

export interface TestResultRule {
  id: string;
  title: string;
  condition: ResultCondition;
  summary: string;
  description: string;
}

export interface PersonalityTest {
  id: string;
  title: string;
  description: string;
  estimatedMinutes: number;
  visibleForFree: boolean;
  questions: TestQuestion[];
  resultRules: TestResultRule[];
}
