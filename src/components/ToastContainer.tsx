'use client';

import * as styles from './Toast.css';
import { ToastType } from '../types/type';
import Toast from './Toast';

type Props = {
  toasts: ToastType[];
  onClose: (id: string) => void;
};

const ToastContainer = ({ toasts, onClose }: Props) => {
  return (
    <div className={styles.container} style={{ top: 20, right: 20 }}>
      {toasts.map((t) => (
        <Toast key={t.id} {...t} onClose={onClose} />
      ))}
    </div>
  );
};

export default ToastContainer;
