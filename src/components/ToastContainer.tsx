'use client';

import * as styles from './Toast.css';
import { ToastType } from '../types/type';
import Toast from './Toast';
import { createPortal } from 'react-dom';

type ToastContainerProps = {
  position: keyof typeof styles.containerPosition;
  toasts: ToastType[];
  onClose: (id: string) => void;
};

const ToastContainer = ({ position, toasts, onClose }: ToastContainerProps) => {
  // 브라우저 환경 확인
  /* typeof document !== 'undefined' 체크: SSR 환경(Next.js App Router)에서도 안전 */
  if (typeof document === 'undefined') return null;

  return createPortal(
    <div className={`${styles.container} ${styles.containerPosition[position]}`}>
      {toasts.map((t) => (
        <Toast key={t.id} {...t} onClose={onClose} />
      ))}
    </div>,
    document.body,
    // body 바로 아래에 렌더링
  );
};

export default ToastContainer;
