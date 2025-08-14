# sw-skeleton

React용 Toast 컴포넌트 라이브러리입니다. TypeScript로 작성되어 타입 안전성을 보장하며, Storybook을 통해 컴포넌트를 시각적으로 확인할 수 있습니다.

## 📦 설치

```bash
npm install sw-toast
```

## 🚀 빠른 시작

```tsx
import { Toast } from 'sw-toast';

function App() {
  return <Toast width="200px" height="20px" />;
}
```

## 🧩 Skeleton 컴포넌트

로딩 상태를 표시하는 스켈레톤 UI 컴포넌트입니다. shimmer 애니메이션과 다양한 커스터마이징 옵션을 제공합니다.

### 기본 사용법

```tsx
import { Toast } from 'sw-skeleton';

// 기본 사각형 스켈레톤
<Skeleton width="200px" height="20px" />

// 원형 스켈레톤
<Skeleton
  width="100px"
  height="100px"
  borderRadius="50px"
/>

// 텍스트 라인 스켈레톤
<Skeleton
  width="300px"
  height="16px"
  borderRadius="4px"
/>
```

### 고급 사용법

```tsx
import { Skeleton } from 'sw-skeleton';

// 커스텀 색상과 애니메이션
<Skeleton
  width="500px"
  height="10px"
  borderRadius="50px"
  backgroundColor="blue"
  speed={3}
  direction="left-to-right"
  shimmerColor="rgba(255,255,255,0.6)"
/>

// 커스텀 그라디언트
<Skeleton
  width="400px"
  height="30px"
  borderRadius="8px"
  backgroundColor="#f0f0f0"
  shimmerGradient="linear-gradient(90deg, transparent, gold, transparent)"
  speed={2}
/>
```

## 📋 Props

| Prop              | 타입                                                                       | 기본값                    | 설명                                     |
| ----------------- | -------------------------------------------------------------------------- | ------------------------- | ---------------------------------------- |
| `width`           | `number \| string`                                                         | **필수**                  | 스켈레톤의 너비                          |
| `height`          | `number \| string`                                                         | **필수**                  | 스켈레톤의 높이                          |
| `borderRadius`    | `number \| string`                                                         | `0`                       | 테두리 반경                              |
| `backgroundColor` | `string`                                                                   | `'rgb(230, 230, 230)'`    | 배경색                                   |
| `direction`       | `'left-to-right' \| 'right-to-left' \| 'top-to-bottom' \| 'bottom-to-top'` | `'left-to-right'`         | shimmer 애니메이션 방향                  |
| `speed`           | `number`                                                                   | `1.5`                     | 애니메이션 속도 (초 단위, 최대 3초)      |
| `shimmerColor`    | `string`                                                                   | `'rgba(255,255,255,0.4)'` | shimmer 효과 색상                        |
| `shimmerGradient` | `string`                                                                   | -                         | 커스텀 shimmer 그라디언트 (CSS gradient) |
| `style`           | `React.CSSProperties`                                                      | -                         | 추가 CSS 스타일                          |

## 🎨 사용 예제

### 텍스트 스켈레톤

```tsx
// 제목 스켈레톤
<Skeleton width="60%" height="24px" borderRadius="4px" />

// 본문 텍스트 스켈레톤들
<Skeleton width="100%" height="16px" borderRadius="4px" style={{ marginBottom: '8px' }} />
<Skeleton width="80%" height="16px" borderRadius="4px" style={{ marginBottom: '8px' }} />
<Skeleton width="90%" height="16px" borderRadius="4px" />
```

### 카드 스켈레톤

```tsx
<div style={{ padding: '16px', border: '1px solid #eee', borderRadius: '8px' }}>
  {/* 썸네일 */}
  <Skeleton width="100%" height="200px" borderRadius="8px" style={{ marginBottom: '16px' }} />

  {/* 제목 */}
  <Skeleton width="70%" height="20px" borderRadius="4px" style={{ marginBottom: '8px' }} />

  {/* 설명 */}
  <Skeleton width="100%" height="16px" borderRadius="4px" style={{ marginBottom: '4px' }} />
  <Skeleton width="80%" height="16px" borderRadius="4px" />
</div>
```

### 아바타 스켈레톤

```tsx
// 원형 아바타
<Skeleton width="40px" height="40px" borderRadius="50%" />

// 정사각형 아바타
<Skeleton width="50px" height="50px" borderRadius="8px" />
```

## 🛠️ 개발

### 요구사항

- Node.js 18+
- npm 9+

### 설치

```bash
git clone <repository-url>
cd sw-skeleton
npm install
```

### 스크립트

```bash
# 라이브러리 빌드
npm run build

# Storybook 실행
npm run storybook

# Storybook 빌드
npm run build-storybook
```

## 📁 프로젝트 구조

```
sw-skeleton/
├── src/
│   ├── Skeleton.tsx        # Skeleton 컴포넌트
│   ├── Skeleton.stories.tsx # Storybook 스토리
│   ├── skeleton.css.ts     # 스타일 정의
│   └── index.ts            # 라이브러리 진입점
├── dist/                   # 빌드된 파일들
│   ├── index.js           # CommonJS 형식
│   ├── index.mjs          # ESM 형식
│   └── index.d.ts         # TypeScript 타입 정의
├── stories/                # Storybook 스토리들
├── package.json
└── README.md
```

## 🎨 Storybook

컴포넌트를 시각적으로 확인하고 테스트할 수 있습니다.

```bash
npm run storybook
```

브라우저에서 [http://localhost:6006](http://localhost:6006)을 열어 확인하세요.

## 📦 빌드

라이브러리는 다음 형식으로 빌드됩니다:

- **CommonJS**: `dist/index.js`
- **ESM**: `dist/index.mjs`
- **TypeScript 타입**: `dist/index.d.ts`

빌드에는 [tsup](https://tsup.egoist.dev/)을 사용하여 최적화된 번들을 생성합니다.

## 🔧 기술 스택

- **React**: 18+ / 19+
- **TypeScript**: 5.9+
- **Storybook**: 9.1+
- **tsup**: 8.5+
- **Vanilla Extract**: CSS-in-JS 스타일링

## 📝 라이센스

MIT License - 자유롭게 사용, 수정, 배포 가능합니다.

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 지원

버그 리포트나 기능 제안은 [GitHub Issues](https://github.com/your-username/sw-skeleton/issues)를 이용해주세요.
