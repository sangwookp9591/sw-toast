export type ToastType = {
  id: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  horizontal?: 'left' | 'center' | 'right';
  vertical?: 'bottom' | 'middle' | 'top';
  animation?: 'slide' | 'fade' | 'scale';
  message?: string;
  duration?: number; // 자동 닫힘 시간 (ms)
  pauseOnHover?: boolean;
  progressBar?: boolean;
  onClose?: (id: string) => void;
};

// Toast 컨테이너 위치 타입
export type Position =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';
