# sw-toast

React용 Toast 컴포넌트 라이브러리입니다. TypeScript로 작성되어 타입 안전성을 보장하며, Storybook을 통해 컴포넌트를 시각적으로 확인할 수 있습니다.

## 📦 설치

```bash
npm install sw-toast
```

## 🚀 빠른 시작

```tsx
import { ToastProvider, useToast } from 'sw-toast';

function App() {
  return (
    <ToastProvider>
      <MyComponent />
    </ToastProvider>
  );
}

function MyComponent() {
  const { showToast } = useToast();

  const handleShowToast = () => {
    showToast({
      message: 'Hello, Toast!',
      type: 'success',
    });
  };

  return <button onClick={handleShowToast}>Show Toast</button>;
}
```

## 🧩 Toast 컴포넌트

사용자에게 알림 메시지를 표시하는 Toast 컴포넌트입니다. 다양한 타입, 위치, 애니메이션을 지원하며 자동으로 사라지는 기능을 제공합니다.

### 기본 사용법

```tsx
import { ToastProvider, useToast } from 'sw-toast';

// 앱 최상위에서 Provider 설정
function App() {
  return (
    <ToastProvider>
      <YourApp />
    </ToastProvider>
  );
}

// 컴포넌트에서 Toast 사용
function YourComponent() {
  const { showToast } = useToast();

  const showSuccessToast = () => {
    showToast({
      message: '성공적으로 처리되었습니다!',
      type: 'success',
    });
  };

  const showErrorToast = () => {
    showToast({
      message: '오류가 발생했습니다.',
      type: 'error',
    });
  };

  return (
    <div>
      <button onClick={showSuccessToast}>Success Toast</button>
      <button onClick={showErrorToast}>Error Toast</button>
    </div>
  );
}
```

### 고급 사용법

```tsx
import { useToast } from 'sw-toast';

function AdvancedToastExample() {
  const { showToast } = useToast();

  const showCustomToast = () => {
    showToast({
      message: '커스텀 설정된 Toast입니다.',
      type: 'warning',
      horizontal: 'center', // left, center, right
      vertical: 'top', // top, middle, bottom
      animation: 'fade', // slide, fade, scale
      duration: 5000, // 5초 후 자동 닫힘 (0이면 수동으로만 닫힘)
      onClose: (id) => {
        console.log(`Toast ${id}가 닫혔습니다.`);
      },
    });
  };

  return <button onClick={showCustomToast}>Custom Toast</button>;
}
```

## 📋 Props

### ToastType

| Prop         | 타입                                          | 기본값    | 설명                                  |
| ------------ | --------------------------------------------- | --------- | ------------------------------------- |
| `message`    | `string`                                      | -         | 표시할 메시지                         |
| `type`       | `'success' \| 'error' \| 'warning' \| 'info'` | `'info'`  | Toast 타입 (색상 결정)                |
| `horizontal` | `'left' \| 'center' \| 'right'`               | `'right'` | 수평 위치                             |
| `vertical`   | `'top' \| 'middle' \| 'bottom'`               | `'top'`   | 수직 위치                             |
| `animation`  | `'slide' \| 'fade' \| 'scale'`                | `'slide'` | 나타나는 애니메이션                   |
| `duration`   | `number`                                      | `3000`    | 자동 닫힘 시간 (ms, 0이면 수동으로만) |
| `onClose`    | `(id: string) => void`                        | -         | Toast가 닫힐 때 호출되는 콜백         |

## 🎨 사용 예제

### 기본 타입별 Toast

```tsx
const { showToast } = useToast();

// 성공 메시지
showToast({
  message: '데이터가 성공적으로 저장되었습니다.',
  type: 'success',
});

// 오류 메시지
showToast({
  message: '네트워크 연결에 실패했습니다.',
  type: 'error',
});

// 경고 메시지
showToast({
  message: '저장되지 않은 변경사항이 있습니다.',
  type: 'warning',
});

// 정보 메시지
showToast({
  message: '새로운 업데이트가 있습니다.',
  type: 'info',
});
```

### 위치별 Toast

```tsx
// 우상단 (기본)
showToast({
  message: '우상단에 표시',
  vertical: 'top',
  horizontal: 'right',
});

// 중앙 상단
showToast({
  message: '중앙 상단에 표시',
  vertical: 'top',
  horizontal: 'center',
});

// 좌하단
showToast({
  message: '좌하단에 표시',
  vertical: 'bottom',
  horizontal: 'left',
});
```

### 애니메이션별 Toast

```tsx
// 슬라이드 애니메이션 (기본)
showToast({
  message: '슬라이드로 나타남',
  animation: 'slide',
});

// 페이드 애니메이션
showToast({
  message: '페이드로 나타남',
  animation: 'fade',
});

// 스케일 애니메이션
showToast({
  message: '스케일로 나타남',
  animation: 'scale',
});
```

### 지속 시간 설정

```tsx
// 5초 후 자동 닫힘
showToast({
  message: '5초 후 자동으로 닫힙니다.',
  duration: 5000,
});

// 수동으로만 닫힘 (자동 닫힘 비활성화)
showToast({
  message: '수동으로만 닫을 수 있습니다.',
  duration: 0,
});
```

## 🛠️ 개발

### 요구사항

- Node.js 18+
- npm 9+

### 설치

```bash
git clone <repository-url>
cd sw-toast
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
sw-toast/
├── src/
│   ├── components/
│   │   ├── Toast.tsx           # Toast 컴포넌트
│   │   ├── ToastContainer.tsx  # Toast 컨테이너
│   │   └── Toast.css.ts        # 스타일 정의
│   ├── context/
│   │   └── ToastProvider.tsx   # Toast Context Provider
│   ├── types/
│   │   └── type.ts             # TypeScript 타입 정의
│   ├── Toast.stories.tsx       # Storybook 스토리
│   └── index.ts                # 라이브러리 진입점
├── dist/                       # 빌드된 파일들
│   ├── index.js               # CommonJS 형식
│   ├── index.mjs              # ESM 형식
│   └── index.d.ts             # TypeScript 타입 정의
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
- **UUID**: 고유 ID 생성

## 📝 라이센스

MIT License - 자유롭게 사용, 수정, 배포 가능합니다.

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 지원

버그 리포트나 기능 제안은 [GitHub Issues](https://github.com/sangwookp9591/sw-toast/issues)를 이용해주세요.
