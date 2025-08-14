import { style, keyframes } from '@vanilla-extract/css';

// 🟢 기본 toast 스타일
export const toastBase = style({
  padding: '12px 16px',
  borderRadius: 6,
  color: '#fff',
  minWidth: 200,
  boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontSize: 14,
  margin: '8px 0',
});

// 타입별 색상
export const typeStyles = {
  success: style({ backgroundColor: '#4caf50' }),
  error: style({ backgroundColor: '#f44336' }),
  warning: style({ backgroundColor: '#ff9800' }),
  info: style({ backgroundColor: '#2196f3' }),
};

// 컨테이너
export const container = style({
  position: 'fixed',
  zIndex: 9999,
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
});

// 애니메이션
const slideIn = keyframes({
  '0%': { transform: 'translateX(100%)', opacity: 0 },
  '100%': { transform: 'translateX(0)', opacity: 1 },
});

const fadeIn = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

const scaleIn = keyframes({
  '0%': { transform: 'scale(0.8)', opacity: 0 },
  '100%': { transform: 'scale(1)', opacity: 1 },
});

export const animationStyles = {
  slide: style({ animation: `${slideIn} 0.3s ease-out` }),
  fade: style({ animation: `${fadeIn} 0.3s ease-out` }),
  scale: style({ animation: `${scaleIn} 0.3s ease-out` }),
};
