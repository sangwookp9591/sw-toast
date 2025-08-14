/**
 *  
 기능 체크리스트
 기본 toast (success, error, warning, info)
 자동 닫힘 + 호버 시 일시정지
 수동 닫기 버튼
 여러 toast 스택 관리
 다양한 진입/퇴장 애니메이션 (slide, fade, scale)
 위치 선택 (top-right, bottom-left 등)

 */
export type ToastType = {
  type?: 'success' | 'error' | 'warning' | 'info';
  horizontal?: 'left' | 'center' | 'right';
  vertical?: 'bottom' | 'middle' | 'top';
  animation: 'slide' | 'fade' | 'scale';
  text?: string;
};

export function Toast({
  type = 'success',
  horizontal = 'center',
  vertical = 'top',
  text,
}: ToastType) {
  return (
    <div
      style={{
        width: 100,
        height: 100,
        background: 'red',
      }}
    >
      {text ? `${type} !!!` : text}
    </div>
  );
}
