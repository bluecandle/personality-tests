import burnoutTest from '../../assets/tests/burnout_test_01.json';
import relationshipVibes from '../../assets/tests/relationship_vibes_01.json';
import studyFocus from '../../assets/tests/study_focus_test_01.json';
import { PersonalityTest } from './testTypes';

const ALL_TESTS: PersonalityTest[] = [
  burnoutTest as PersonalityTest,
  relationshipVibes as PersonalityTest,
  studyFocus as PersonalityTest,
  // TODO: 필요 시 추가 JSON을 여기에 push
];

const YOUNG_FORTY_TEST_IDS: string[] = [
  'burnout_test_01',
  'relationship_vibes_01',
  // TODO: 영포티 타겟 테스트 추가 시 id를 여기에 등록
];

export const getAllTests = (): PersonalityTest[] => {
  return ALL_TESTS.filter((test) => YOUNG_FORTY_TEST_IDS.includes(test.id));
};

export const getTestById = (id: string): PersonalityTest | undefined => {
  return ALL_TESTS.find((test) => test.id === id);
};
