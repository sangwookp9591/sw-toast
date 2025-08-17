import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ToastProvider, useToast } from './context/ToastProvider';

const meta: Meta = {
  title: 'Components/Toast',
  component: () => null, // 실제로는 Provider + Hook 사용
};

export default meta;
type Story = StoryObj<typeof meta>;

// ✅ Hook을 이용해 Toast를 띄우는 버튼 컴포넌트
const ToastDemo = () => {
  const { showToast } = useToast();

  const handleClose = (id: string) => {
    console.log(`Toast ${id} closed`);
  };

  return (
    <>
      <div style={{ display: 'flex', gap: 12 }}>
        <button
          onClick={() =>
            showToast({
              message: 'Success!',
              type: 'success',
              onClose: handleClose,
            })
          }
        >
          Success
        </button>
        <button
          onClick={() =>
            showToast({
              message: 'Error!',
              type: 'error',
              onClose: handleClose,
            })
          }
        >
          Error
        </button>
        <button
          onClick={() =>
            showToast({
              message: 'Warning!',
              type: 'warning',
              onClose: handleClose,
            })
          }
        >
          Warning
        </button>
        <button
          onClick={() =>
            showToast({
              message: 'Info!',
              type: 'info',
              onClose: handleClose,
            })
          }
        >
          Info
        </button>
      </div>
      <div style={{ display: 'flex', gap: 12 }}>
        <button
          onClick={() =>
            showToast({
              message: 'Success!',
              type: 'success',
              progressColor: 'red',
              onClose: handleClose,
            })
          }
        >
          Success color
        </button>
        <button
          onClick={() =>
            showToast({
              message: 'Error!',
              type: 'error',
              progressColor: 'blue',
              onClose: handleClose,
            })
          }
        >
          Error color
        </button>
        <button
          onClick={() =>
            showToast({
              message: 'Warning!',
              type: 'warning',
              progressBar: false,
              onClose: handleClose,
            })
          }
        >
          Warning !progress
        </button>
        <button
          onClick={() =>
            showToast({
              message: 'Info!',
              type: 'info',
              progressBar: false,
              pauseOnHover: false,
              onClose: handleClose,
            })
          }
        >
          Info !hover !progress
        </button>
      </div>
    </>
  );
};
// ✅ Provider로 감싸서 Storybook에서 렌더링
export const Default: Story = {
  render: () => (
    <ToastProvider>
      <ToastDemo />
    </ToastProvider>
  ),
};
