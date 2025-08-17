'use client';

import React, { createContext, useContext, useState, ReactNode, useRef } from 'react';
import { ToastType, Position } from '../types/type';
import { v4 as uuid } from 'uuid';
import ToastContainer from '../components/ToastContainer';

type ToastContextType = {
  //showToast 함수 하나만 제공하고, id는 내부에서 생성하도록 설계
  showToast: (toast: Omit<ToastType, 'id'>) => void; //Omit<Type, keys>: keys (id | description) 제외한 타입
  pauseToast: (id: string) => void;
  resumeToast: (id: string) => void;
};

//초깃값으로 undefined를 넣어둔 이유는 Provider 밖에서 접근 시 에러를 발생시키기 위함
const ToastContext = createContext<ToastContextType | undefined>(undefined);
type ToastMap = Record<string, ToastType[]>;

type ToastTimer = {
  timeoutId: NodeJS.Timeout;
  startTime: number;
  remainingTime: number;
  isPaused: boolean;
};

type ToastTimers = Record<string, ToastTimer>;

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const timersRef = useRef<ToastTimers>({});
  const [toastMap, setToastMap] = useState<ToastMap>({});

  const showToast = (toast: Omit<ToastType, 'id'>) => {
    const id = uuid();
    const key = `${toast.vertical || 'top'}-${toast.horizontal || 'right'}`;
    const duration = toast.duration ?? 3000;

    //특정 포지션에 위치
    setToastMap((prev) => ({
      ...prev,
      [key]: [...(prev[key] || []), { id, ...toast }],
    }));

    // 타이머 설정 (duration이 0보다 클 때만)
    if (duration > 0) {
      setToastTimer(id, key, duration);
    }
  };

  const setToastTimer = (id: string, key: string, duration: number) => {
    const startTime = Date.now();
    const timeoutId = setTimeout(() => {
      removeToast(key, id);
      // delete로 timersRef의id 값제거
      delete timersRef.current[id];
    }, duration);

    timersRef.current[id] = {
      timeoutId,
      startTime,
      remainingTime: duration,
      isPaused: false,
    };
  };

  const pauseToast = (id: string) => {
    const timer = timersRef.current[id];
    if (timer && !timer.isPaused) {
      clearTimeout(timer.timeoutId);
      const elapsed = Date.now() - timer.startTime;
      const remaining = Math.max(0, timer.remainingTime - elapsed);

      timersRef.current[id] = {
        ...timer,
        remainingTime: remaining,
        isPaused: true,
      };
    }
  };

  const resumeToast = (id: string) => {
    const timer = timersRef.current[id];
    if (timer && timer.isPaused) {
      const key = findToastKey(id);
      if (key) {
        const timeoutId = setTimeout(() => {
          removeToast(key, id);
          // delete로 timersRef의id 값제거
          delete timersRef.current[id];
        }, timer.remainingTime);

        timersRef.current[id] = {
          ...timer,
          timeoutId,
          startTime: Date.now(),
          isPaused: false,
        };
      }
    }
  };

  const findToastKey = (id: string): string | null => {
    for (const [key, toasts] of Object.entries(toastMap)) {
      /**
       * some(): 조건을 만족하는 요소를 하나라도 찾으면 즉시 중단
       * const hasTarget = toasts.some(toast => toast.id === targetId);
       * 반환값: true/false
       * 성능: O(1) ~ O(n), 보통은 빠르게 찾음
       *
       * filter(): 모든 요소를 검사해서 조건에 맞는 모든 요소 반환
       * const matchingToasts = toasts.filter(toast => toast.id === targetId);
       * 반환값: 배열 (빈 배열이거나 요소들이 담긴 배열)
       * 성능: 항상 O(n), 끝까지 다 검사
       */
      if (toasts.some((toast) => toast.id === id)) {
        return key;
      }
    }
    return null;
  };

  const removeToast = (key: string, id: string) => {
    setToastMap((prev) => ({
      ...prev,
      [key]: prev[key]?.filter((t) => t.id !== id) || [],
    }));

    // 타이머 정리
    if (timersRef.current[id]) {
      clearTimeout(timersRef.current[id].timeoutId);
      delete timersRef.current[id];
    }
  };

  return (
    <ToastContext.Provider value={{ showToast, pauseToast, resumeToast }}>
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
