import burnoutTest from '../../assets/tests/burnout_test_01.json';
import relationshipVibes from '../../assets/tests/relationship_vibes_01.json';
import studyFocus from '../../assets/tests/study_focus_test_01.json';
import companyCharacterTest from '../../assets/tests/company_character_01.json';
import drinkingCharacterTest from '../../assets/tests/drinking_character_01.json';
import fatherStyleTest from '../../assets/tests/father_style_01.json';
import { PersonalityTest } from './testTypes';

const ALL_TESTS: PersonalityTest[] = [
  burnoutTest as PersonalityTest,
  relationshipVibes as PersonalityTest,
  studyFocus as PersonalityTest,
  companyCharacterTest as PersonalityTest,
  drinkingCharacterTest as PersonalityTest,
  fatherStyleTest as PersonalityTest,
];

const YOUNG_FORTY_TEST_IDS: string[] = [
  'burnout_test_01',
  'company_character_01',
  'drinking_character_01',
  'father_style_01',
];

export const getAllTests = (): PersonalityTest[] => {
  return ALL_TESTS.filter((test) => YOUNG_FORTY_TEST_IDS.includes(test.id));
};

export const getTestById = (id: string): PersonalityTest | undefined => {
  return ALL_TESTS.find((test) => test.id === id);
};
