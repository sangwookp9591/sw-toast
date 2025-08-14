export type ToastType = {};

export function Toast({}: ToastType) {
  return (
    <div
      style={{
        width: 100,
        height: 100,
        background: 'red',
      }}
    >
      toast
    </div>
  );
}
