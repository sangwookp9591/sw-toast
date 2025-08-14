'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ToastType } from '../types/type';
import { v4 as uuid } from 'uuid';
import ToastContainer from '../components/ToastContainer';
import { createPortal } from 'react-dom';

type ToastContextType = {
  //showToast 함수 하나만 제공하고, id는 내부에서 생성하도록 설계
  showToast: (toast: Omit<ToastType, 'id'>) => void; //Omit<Type, keys>: keys (id | description) 제외한 타입
};

//초깃값으로 undefined를 넣어둔 이유는 Provider 밖에서 접근 시 에러를 발생시키기 위함
const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  const showToast = (toast: Omit<ToastType, 'id'>) => {
    const id = uuid();
    setToasts((prev) => [...prev, { id, ...toast }]);

    if ((toast.duration ?? 3000) > 0) {
      setTimeout(() => removeToast(id), toast.duration ?? 3000);
    }
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* typeof document !== 'undefined' 체크: SSR 환경(Next.js App Router)에서도 안전 */}
      {typeof document !== 'undefined' &&
        createPortal(<ToastContainer toasts={toasts} onClose={removeToast} />, document.body)}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
};
