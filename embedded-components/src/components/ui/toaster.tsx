import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';

export function Toaster({ swipeDirection }: any) {
  const { toasts } = useToast();

  return (
    <ToastProvider swipeDirection={swipeDirection}>
      {toasts.map(({ id, title, description, action, ...props }: any) => {
        return (
          <Toast key={id} {...props}>
            <div className="eb-grid eb-gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
