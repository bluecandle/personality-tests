import burnoutTest from '../../assets/tests/burnout_test_01.json';
import relationshipVibes from '../../assets/tests/relationship_vibes_01.json';
import studyFocus from '../../assets/tests/study_focus_test_01.json';
import { PersonalityTest } from './testTypes';

const tests: PersonalityTest[] = [
  burnoutTest as PersonalityTest,
  relationshipVibes as PersonalityTest,
  studyFocus as PersonalityTest,
];

export const getAllTests = (): PersonalityTest[] => {
  return tests;
};

export const getTestById = (id: string): PersonalityTest | undefined => {
  return tests.find((test) => test.id === id);
};
