# AGENTS HANDBOOK

요 프로젝트에 투입될 다른 에이전트/도구를 위한 빠른 안내서입니다.

## 기술 스택

- **Runtime**: Expo (React Native, TypeScript)
- **UI**: NativeBase (다크 테마)
- **Navigation**: `@react-navigation/native` + native stack
- **State**: `src/state/TestEngineProvider`에서 Context 기반으로 관리
- **데이터**: `assets/tests/*.json`을 `src/engine/testLoader`로 불러옴

## 개발 시 주의사항

1. **NativeBase** 설치 시 `--legacy-peer-deps`를 사용했습니다. peer warning은 무시 가능.
2. TypeScript 설정에 `resolveJsonModule`이 켜져 있어 JSON을 그대로 import할 수 있습니다.
3. 테스트 실행 전 `npx tsc --noEmit`로 타입 체크하세요 (package script 없음).
4. 스크린 배경/카드 컬러 규칙: 배경 `gray.900`, 카드 `gray.800`, 테두리 `gray.700`.
5. Premium 잠금 로직은 Context state만 토글하면 됩니다. 실 결제 연동은 아직 없음.

## 일반 워크플로우

1. 새 테스트 데이터를 추가할 땐 `assets/tests`에 JSON 생성 → `testLoader` 업데이트.
2. UI/상태 변경 시 `TestEngineProvider`의 메서드와 `useTestEngine` 훅을 활용하세요.
3. 새 화면을 추가하면 `RootNavigator`에 route + 스크린 등록을 잊지 말기.

## TODO / 향후 작업 아이디어

- In-App Purchase / AdMob Paywall 진짜 로직 붙이기
- 결과 공유, 캡처, 광고 영역
- 질문 타입 다양화 (`multi_choice`, slider 등)
- AsyncStorage 등으로 진행 상황/프리미엄 상태 저장
