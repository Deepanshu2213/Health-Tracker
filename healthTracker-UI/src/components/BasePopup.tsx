import { useEffect, type FC, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface BasePopupProps {
  children: ReactNode;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export const BasePopup: FC<BasePopupProps> = ({ children, setOpen }) => {
  useEffect(() => {
    // Disable scrolling
    document.body.style.overflow = 'hidden';

    return () => {
      // Re-enable scrolling when modal unmounts
      document.body.style.overflow = '';
    };
  }, []);
  const modal = document.getElementById('modal-root');
  if (!modal) return null;
  return createPortal(
    <div
      className="absolute inset-0 flex items-center justify-center bg-black/10 bg-opacity-50 backdrop-blur-sm"
      onClick={(e) => {
        setOpen(false);
      }}
    >
      <div
        className="flex justify-center w-full text-white overflow-y-auto max-h-[85vh]  max-w-[80vw] overflow-y-auto border rounded-xl"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div>
          <X className="mx-4 my-3" onClick={() => setOpen(false)} />
        </div>
        {children}
      </div>
    </div>,
    modal
  );
};
