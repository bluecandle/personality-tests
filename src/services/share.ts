import { Share as NativeShare } from 'react-native';
import { Share as KakaoShare } from '@react-native-kakao/share';
import { PersonalityTest, TestResultRule } from '../engine/testTypes';

const KAKAO_CUSTOM_TEMPLATE_ID = 12345; // TODO: Kakao Developers 콘솔에서 실제 템플릿 ID로 교체
const APP_SHARE_PLACEHOLDER_URL = 'https://example.com'; // TODO: 실제 스토어/랜딩 URL로 교체

export function buildResultShareMessage({
  test,
  rule,
  totalScore,
}: {
  test: PersonalityTest;
  rule: TestResultRule;
  totalScore?: number;
}): string {
  const formattedScore = typeof totalScore === 'number' ? `${totalScore}점` : '- 점';
  return [
    `[영포티 심리테스트] ${test.title}`,
    `결과: ${rule.title} ${rule.icon ?? ''}`.trim(),
    `한 줄 요약: ${rule.summary}`,
    `점수: ${formattedScore} (테스트 종류에 따라 다를 수 있음)`,
    `앱에서 직접 테스트 해보기 → ${APP_SHARE_PLACEHOLDER_URL}`,
  ].join('\n');
}

export async function shareResultNative(args: {
  test: PersonalityTest;
  rule: TestResultRule;
  totalScore?: number;
}): Promise<void> {
  const message = buildResultShareMessage(args);
  await NativeShare.share({ message });
}

export async function shareResultToKakao(args: {
  test: PersonalityTest;
  rule: TestResultRule;
  totalScore?: number;
}): Promise<void> {
  const message = buildResultShareMessage(args);
  const scoreText = typeof args.totalScore === 'number' ? `${args.totalScore}` : '-';
  try {
    await KakaoShare.sendCustom({
      templateId: KAKAO_CUSTOM_TEMPLATE_ID,
      templateArgs: {
        title: args.test.title,
        resultTitle: args.rule.title,
        summary: args.rule.summary,
        score: scoreText,
        message,
      },
    });
  } catch (error) {
    console.warn('[share] Kakao share failed, falling back to native share', error);
    await shareResultNative(args);
  }
}
