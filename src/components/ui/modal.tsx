import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface ModalProps {
  title: string;
  renderTitle?: React.ReactNode;
  description: string;
  isOpen: boolean;
  children?: React.ReactNode;
  showCloseButton?: boolean;
  closeOnInteractOutside?: boolean;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({
  title,
  description,
  renderTitle,
  isOpen,
  onClose,
  children,
  showCloseButton = true,
  closeOnInteractOutside = true,
}: ModalProps) => {
  const onChange = (open: boolean) => {
    if (!open) {
      onClose?.();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent
        {...(closeOnInteractOutside
          ? {
              onInteractOutside: (e) => {
                e.preventDefault();
              },
            }
          : {})}
        showCloseButton={showCloseButton}
      >
        <DialogHeader>
          <DialogTitle>{renderTitle ?? title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
};
