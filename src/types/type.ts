export type ToastType = {
  id: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  horizontal?: 'left' | 'center' | 'right';
  vertical?: 'bottom' | 'middle' | 'top';
  animation?: 'slide' | 'fade' | 'scale';
  message?: string;
  duration?: number; // 자동 닫힘 시간 (ms)
  onClose?: (id: string) => void;
};
