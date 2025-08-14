'use client';

import styles from './toast.module.css';
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

const ToastContainer = ({ position, toasts, onClose }: ToastContainerProps) => {
  // 브라우저 환경 확인
  /* typeof document !== 'undefined' 체크: SSR 환경(Next.js App Router)에서도 안전 */
  if (typeof document === 'undefined') return null;

  // position을 CSS 클래스명으로 변환
  const getPositionClass = (pos: Position) => {
    const positionMap = {
      'top-left': styles.topLeft,
      'top-center': styles.topCenter,
      'top-right': styles.topRight,
      'bottom-left': styles.bottomLeft,
      'bottom-center': styles.bottomCenter,
      'bottom-right': styles.bottomRight,
    };
    return positionMap[pos];
  };

  return createPortal(
    <div className={`${styles.container} ${getPositionClass(position)}`}>
      {toasts.map((t) => (
        <Toast key={t.id} {...t} onClose={onClose} />
      ))}
    </div>,
    document.body,
    // body 바로 아래에 렌더링
  );
};

export default ToastContainer;
