// Toast.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { css, keyframes } from '@emotion/react';
import styles from './toast.module.css'; // CSS 모듈도 함께 import
import { ToastType } from '../types/type';
import { useToast } from '../context/ToastProvider';

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
  position: relative; /* progressBar를 위한 relative positioning */
  overflow: hidden; /* progressBar가 토스트 영역을 벗어나지 않도록 */
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  /* pauseOnHover 시각적 효과 */
  &:hover {
    transform: translateY(-2px), scale(1.3);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
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

// 🎯 ProgressBar 스타일
const progressBarStyle = css`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 0 0 6px 6px;
  transition: width 0.1s linear;
  box-shadow: 0 0 4px rgba(255, 255, 255, 0.3);
`;

// 타입별 progressBar 색상
const progressBarTypeStyles = {
  success: css`
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0 0 6px rgba(255, 255, 255, 0.4);
  `,
  error: css`
    background: rgba(255, 200, 200, 0.9);
    box-shadow: 0 0 6px rgba(255, 200, 200, 0.5);
  `,
  warning: css`
    background: rgba(255, 235, 150, 0.9);
    box-shadow: 0 0 6px rgba(255, 235, 150, 0.5);
  `,
  info: css`
    background: rgba(200, 230, 255, 0.9);
    box-shadow: 0 0 6px rgba(200, 230, 255, 0.5);
  `,
};

// 일시정지 상태 표시를 위한 스타일
const pausedIndicatorStyle = css`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 8px;
  height: 8px;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.2s ease;
`;

const pausedToastStyle = css`
  ${pausedIndicatorStyle}
  opacity: 1;
`;

const Toast = ({
  id,
  type = 'info',
  message,
  onClose,
  animation = 'slide',
  pauseOnHover = true,
  progressBar = true,
  duration = 3000,
}: Props) => {
  const { pauseToast, resumeToast } = useToast();
  const isPausedRef = useRef(false);

  // 🎯 ProgressBar 상태 관리
  const [progress, setProgress] = useState<number>(100);
  const startTimeRef = useRef<number>(Date.now());
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const remainingTimeRef = useRef<number>(duration);

  // 🔄 ProgressBar 타이머 관리 함수들
  const startProgressTimer = (totalDuration: number, remaining: number = totalDuration) => {
    if (!progressBar || totalDuration <= 0) return;

    startTimeRef.current = Date.now();
    remainingTimeRef.current = remaining;

    // 60fps로 진행률 업데이트
    intervalRef.current = setInterval(() => {
      if (isPausedRef.current) return; // 일시정지 중이면 스킵

      const elapsed = Date.now() - startTimeRef.current;
      const newRemaining = Math.max(0, remainingTimeRef.current - elapsed);
      const progressPercent = (newRemaining / totalDuration) * 100;

      setProgress(progressPercent);

      // 시간이 다 되면 정리
      if (newRemaining <= 0) {
        clearProgressTimer();
      }
    }, 16); // ~60fps
  };

  const clearProgressTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const pauseProgress = () => {
    if (!isPausedRef.current && intervalRef.current) {
      // 현재 남은 시간 계산
      const elapsed = Date.now() - startTimeRef.current;
      remainingTimeRef.current = Math.max(0, remainingTimeRef.current - elapsed);

      clearProgressTimer();
    }
  };

  const resumeProgress = () => {
    if (isPausedRef.current) {
      startProgressTimer(duration, remainingTimeRef.current);
    }
  };

  // 🚀 컴포넌트 마운트 시 progressBar 타이머 시작
  useEffect(() => {
    if (duration > 0 && progressBar) {
      startProgressTimer(duration);
    }

    return () => {
      clearProgressTimer();
    };
  }, [duration, progressBar]);

  //Div handle Event
  const handleMouseEnter = () => {
    if (pauseOnHover && !isPausedRef.current) {
      pauseToast(id);
      pauseProgress();
      isPausedRef.current = true;
    }
  };

  const handleMouseLeave = () => {
    if (pauseOnHover && isPausedRef.current) {
      resumeToast(id);
      resumeProgress();
      isPausedRef.current = false;
    }
  };

  // 컴포넌트 언마운트 시 정리
  useEffect(() => {
    return () => {
      clearProgressTimer();
      if (isPausedRef.current) {
        resumeToast(id);
      }
    };
  }, [id, resumeToast]);

  // Emotion이 작동하지 않을 경우를 대비해 CSS 모듈 클래스도 함께 사용
  const typeClass = styles[type] || '';
  const animationClass = styles[animation] || '';

  return (
    <div
      css={[toastBaseStyle, typeStyles[type], animationStyles[animation]]}
      className={`${styles.toastBase} ${typeClass} ${animationClass}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span>{message}</span>

      {/* 일시정지 표시 */}
      {pauseOnHover && (
        <div css={pausedIndicatorStyle} style={{ opacity: isPausedRef.current ? 1 : 0 }}>
          ⏸
        </div>
      )}

      <button onClick={() => onClose(id)} css={closeButtonStyle} className={styles.closeButton}>
        ×
      </button>

      {/* 🎯 ProgressBar - 토스트 하단에 위치 */}
      {progressBar && duration > 0 && (
        <div
          css={[progressBarStyle, progressBarTypeStyles[type]]}
          style={{
            width: `${progress}%`,
            // 디버깅용 (개발자 도구에서 확인 가능)
            ['data-progress' as any]: progress.toFixed(1),
            ['data-remaining' as any]: remainingTimeRef.current,
          }}
        />
      )}
    </div>
  );
};

export default Toast;
