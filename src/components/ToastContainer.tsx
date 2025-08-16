// ToastContainer.tsx
'use client';

import React from 'react';
import { css } from '@emotion/react';
import { ToastType } from '../types/type';
import Toast from './Toast';
import { createPortal } from 'react-dom';

type Position =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

type ToastContainerProps = {
  position: Position;
  toasts: ToastType[];
  onClose: (id: string) => void;
};

// 기본 컨테이너 스타일
const containerBaseStyle = css`
  position: fixed;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 8px;
  pointer-events: none;

  & > * {
    pointer-events: auto;
  }
`;

// 포지션별 스타일
const positionStyles = {
  'top-left': css`
    top: 16px;
    left: 16px;
  `,
  'top-center': css`
    top: 16px;
    left: 50%;
    transform: translateX(-50%);
  `,
  'top-right': css`
    top: 16px;
    right: 16px;
  `,
  'bottom-left': css`
    bottom: 16px;
    left: 16px;
  `,
  'bottom-center': css`
    bottom: 16px;
    left: 50%;
    transform: translateX(-50%);
  `,
  'bottom-right': css`
    bottom: 16px;
    right: 16px;
  `,
};

const ToastContainer = ({ position, toasts, onClose }: ToastContainerProps) => {
  // 브라우저 환경 확인
  if (typeof document === 'undefined') return null;

  return createPortal(
    <div css={[containerBaseStyle, positionStyles[position]]}>
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onClose={onClose} />
      ))}
    </div>,
    document.body,
  );
};

export default ToastContainer;
