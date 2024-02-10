import { useEffect, useRef, useState } from 'preact/hooks';

export function Drawer({
  width = 300,
  duration = 300,
  isOpen,
  onClose,
  children,
}) {
  const [isFullyOpen, setIsFullyOpen] = useState(false);
  const [isOpenAnimation, setIsOpenAnimation] = useState(false);
  const timeout = useRef<number | null>(null);
  const timeoutAnimation = useRef<number | null>(null);

  useEffect(() => {
    if (isOpen) {
      setIsFullyOpen(true);
      clearTimeout(timeoutAnimation.current);
      timeoutAnimation.current = setTimeout(() => {
        setIsOpenAnimation(true);
      }, 10);
    } else {
      setIsOpenAnimation(false);
      clearTimeout(timeout.current);
      timeout.current = setTimeout(() => {
        setIsFullyOpen(false);
      }, duration);
    }
  }, [isOpen, duration]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('scroll-none');
    } else {
      document.body.classList.remove('scroll-none');
    }
  }, [isOpen]);

  return (
    <>
      {isFullyOpen && (
        <div className="drawer">
          <div
            onClick={() => {
              onClose();
            }}
            className="drawer-backdrop"
            style={{
              backgroundColor: isOpenAnimation ? '#00000060' : '#00000000',
              transition: `background-color ${duration}ms ease-in-out`,
            }}
          />
          <div
            className="drawer-sidepanel"
            style={{
              width: `${width}px`,
              transform: isOpenAnimation
                ? 'translateX(0)'
                : `translateX(${width}px)`,
              transition: `transform ${duration}ms ease-in-out`,
            }}
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
}
