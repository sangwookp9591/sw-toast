'use client';

import { ToastType } from '../types/type';
import styles from './toast.module.css';

type Props = ToastType & { onClose: (id: string) => void };

const Toast = ({ id, type = 'info', message, onClose, animation = 'slide' }: Props) => {
  return (
    <div className={`${styles.toastBase} ${styles[type]} ${styles[animation]}`}>
      <span>{message}</span>
      <button onClick={() => onClose(id)} className={'closeButton'}>
        ×
      </button>
    </div>
  );
};

export default Toast;
