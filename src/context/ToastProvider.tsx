'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ToastType, Position } from '../types/type';
import { v4 as uuid } from 'uuid';
import ToastContainer from '../components/ToastContainer';

type ToastContextType = {
  //showToast 함수 하나만 제공하고, id는 내부에서 생성하도록 설계
  showToast: (toast: Omit<ToastType, 'id'>) => void; //Omit<Type, keys>: keys (id | description) 제외한 타입
};

//초깃값으로 undefined를 넣어둔 이유는 Provider 밖에서 접근 시 에러를 발생시키기 위함
const ToastContext = createContext<ToastContextType | undefined>(undefined);
type ToastMap = Record<string, ToastType[]>;

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toastMap, setToastMap] = useState<ToastMap>({});
  const showToast = (toast: Omit<ToastType, 'id'>) => {
    const id = uuid();
    const key = `${toast.vertical || 'top'}-${toast.horizontal || 'right'}`;

    setToastMap((prev) => ({
      ...prev,
      [key]: [...(prev[key] || []), { id, ...toast }],
    }));

    if ((toast.duration ?? 3000) > 0) {
      setTimeout(() => removeToast(key, id), toast.duration ?? 3000);
    }
  };

  const removeToast = (key: string, id: string) => {
    setToastMap((prev) => ({
      ...prev,
      [key]: prev[key].filter((t) => t.id !== id),
    }));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {Object.entries(toastMap).map(([key, toasts]) => {
        const [vertical, horizontal] = key.split('-');
        return (
          <ToastContainer
            key={key}
            position={`${vertical}-${horizontal}` as Position}
            toasts={toasts}
            onClose={(id) => removeToast(key, id)}
          />
        );
      })}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
};
