import { ToastProvider, useToast } from 'sw-toast';

const ToastDemo = () => {
  const { showToast } = useToast();

  const handleClose = (id: string) => {
    console.log(`Toast ${id} closed`);
  };

  return (
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
  );
};

function App() {
  return (
    <>
      <div
        style={{
          flex: 1,
        }}
      >
        <ToastProvider>
          <ToastDemo />
        </ToastProvider>
      </div>
    </>
  );
}

export default App;
