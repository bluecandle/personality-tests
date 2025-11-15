import burnoutTest from '../../assets/tests/burnout_test_01.json';
import relationshipVibes from '../../assets/tests/relationship_vibes_01.json';
import studyFocus from '../../assets/tests/study_focus_test_01.json';
import companyCharacterTest from '../../assets/tests/company_character_01.json';
import drinkingCharacterTest from '../../assets/tests/drinking_character_01.json';
import fatherStyleTest from '../../assets/tests/father_style_01.json';
import kondaLevelTest from '../../assets/tests/konda_level_01.json';
import datingCompetitivenessTest from '../../assets/tests/dating_competitiveness_01.json';
import selfCareLevelTest from '../../assets/tests/self_care_level_01.json';
import financeMindsetTest from '../../assets/tests/finance_mindset_01.json';
import secondActReadyTest from '../../assets/tests/second_act_ready_01.json';
import lonelyWolfLevelTest from '../../assets/tests/lonely_wolf_level_01.json';
import { PersonalityTest } from './testTypes';

const ALL_TESTS: PersonalityTest[] = [
  burnoutTest as PersonalityTest,
  relationshipVibes as PersonalityTest,
  studyFocus as PersonalityTest,
  companyCharacterTest as PersonalityTest,
  drinkingCharacterTest as PersonalityTest,
  fatherStyleTest as PersonalityTest,
  kondaLevelTest as PersonalityTest,
  datingCompetitivenessTest as PersonalityTest,
  selfCareLevelTest as PersonalityTest,
  financeMindsetTest as PersonalityTest,
  secondActReadyTest as PersonalityTest,
  lonelyWolfLevelTest as PersonalityTest,
];

const YOUNG_FORTY_TEST_IDS: string[] = [
  'burnout_test_01',
  'company_character_01',
  'drinking_character_01',
  'father_style_01',
  'konda_level_01',
  'dating_competitiveness_01',
  'self_care_level_01',
  'finance_mindset_01',
  'second_act_ready_01',
  'lonely_wolf_level_01',
];

export const getAllTests = (): PersonalityTest[] => {
  return ALL_TESTS.filter((test) => YOUNG_FORTY_TEST_IDS.includes(test.id));
};

export const getTestById = (id: string): PersonalityTest | undefined => {
  return ALL_TESTS.find((test) => test.id === id);
};
