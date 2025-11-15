# 영포티 심리 테스트 엔진

React Native + Expo + TypeScript로 만든 로컬 JSON 기반 심리/성향 테스트 엔진입니다. NativeBase로 다크 톤 UI를 구성하고, React Navigation Native Stack을 이용해 **테스트 목록 → 인트로 → 질문 → 결과** 플로우를 제공합니다.

## 주요 특징

- **로컬 JSON 테스트**: `assets/tests/*.json`에 정의된 테스트를 `src/engine` 모듈에서 로드합니다.
- **재사용 가능한 엔진**: `TestEngineProvider`가 현재 테스트, 점수 누적, 프리미엄 잠금 해제 상태를 중앙에서 관리합니다.
- **NativeBase 다크 테마**: 전체 배경 `gray.900`, 카드 `gray.800` 계열로 통일된 테마를 적용했습니다.
- **프리미엄 잠금 흐름**: 무료/유료 여부에 따라 Paywall 또는 테스트 인트로로 분기합니다. Settings에서 임시로 프리미엄 잠금을 토글할 수 있습니다.

## 프로젝트 구조

```
.
├── assets/
│   └── tests/                # JSON 테스트 데이터
├── src/
│   ├── App.tsx               # NativeBase + Provider + Navigator
│   ├── engine/
│   │   ├── testTypes.ts      # 타입 정의
│   │   ├── testLoader.ts     # JSON 로더
│   │   └── testEvaluator.ts  # 점수 누적 및 결과 계산
│   ├── navigation/
│   │   └── RootNavigator.tsx # Native Stack 정의
│   ├── screens/              # 목록/인트로/질문/결과 등 화면
│   └── state/
│       └── TestEngineProvider.tsx
├── App.tsx                   # Expo 진입(bootstrap)
└── README.md
```

## 설치 & 실행

```bash
npm install
npx expo start
```

> NativeBase 설치 시 `--legacy-peer-deps` 옵션을 사용했습니다. 경고가 발생해도 무시해도 됩니다.

## 타입 체크

```bash
npx tsc --noEmit
```

Expo 템플릿에는 기본적으로 `tsc` 스크립트가 없으므로 `npx`로 직접 실행합니다.

## 테스트 데이터 추가

1. `assets/tests/` 아래에 `PersonalityTest` 스키마(JSON)를 추가합니다.
2. `src/engine/testLoader.ts`에서 새 JSON을 import하고 `tests` 배열에 추가합니다.
3. 필요하면 UI에서 PRO 뱃지/잠금 여부를 확인하려면 `visibleForFree` 필드를 설정하세요.

## TODO

- 결과 공유 / 광고 배치 (TestResultScreen에 TODO 주석)
- In-App Purchase / AdMob 연동
- 질문 타입 확장 (현재 `single_choice`만 지원)
- 테스트 데이터/상태에 대한 퍼시스턴스 (AsyncStorage 등)
