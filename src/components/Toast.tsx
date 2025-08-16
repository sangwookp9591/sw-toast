// Toast.tsx
'use client';

import React from 'react';
import { css, keyframes } from '@emotion/react';
import styles from './toast.module.css'; // CSS 모듈도 함께 import
import { ToastType } from '../types/type';

type Props = ToastType & { onClose: (id: string) => void };

// 애니메이션 키프레임 정의
const slideIn = keyframes`
  0% {
    transform: translateX(100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const scaleIn = keyframes`
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

// 기본 토스트 스타일
const toastBaseStyle = css`
  padding: 12px 16px;
  border-radius: 6px;
  color: #fff;
  min-width: 200px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  margin: 8px 0;
`;

// 타입별 스타일
const typeStyles = {
  success: css`
    background-color: #4caf50;
  `,
  error: css`
    background-color: #f44336;
  `,
  warning: css`
    background-color: #ff9800;
  `,
  info: css`
    background-color: #2196f3;
  `,
};

// 애니메이션 스타일
const animationStyles = {
  slide: css`
    animation: ${slideIn} 0.3s ease-out;
  `,
  fade: css`
    animation: ${fadeIn} 0.3s ease-out;
  `,
  scale: css`
    animation: ${scaleIn} 0.3s ease-out;
  `,
};

// 닫기 버튼 스타일
const closeButtonStyle = css`
  background: none;
  border: none;
  color: white;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  padding: 0;
  margin-left: 12px;
  line-height: 1;
  opacity: 0.8;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 1;
  }
`;

const Toast = ({ id, type = 'info', message, onClose, animation = 'slide' }: Props) => {
  // Emotion이 작동하지 않을 경우를 대비해 CSS 모듈 클래스도 함께 사용
  const typeClass = styles[type] || '';
  const animationClass = styles[animation] || '';

  return (
    <div
      css={[toastBaseStyle, typeStyles[type], animationStyles[animation]]}
      className={`${styles.toastBase} ${typeClass} ${animationClass}`}
    >
      <span>{message}</span>
      <button onClick={() => onClose(id)} css={closeButtonStyle} className={styles.closeButton}>
        ×
      </button>
    </div>
  );
};

export default Toast;
