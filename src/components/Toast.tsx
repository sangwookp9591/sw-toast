'use client';

import { ToastType } from '../types/type';
import * as styles from './Toast.css';

type Props = ToastType & { onClose: (id: string) => void };

const Toast = ({ id, type = 'info', message, onClose, animation = 'slide' }: Props) => {
  return (
    <div
      className={`${styles.toastBase} ${styles.typeStyles[type]} ${styles.animationStyles[animation]}`}
    >
      <span>{message}</span>
      <button onClick={() => onClose(id)}>×</button>
    </div>
  );
};

export default Toast;
