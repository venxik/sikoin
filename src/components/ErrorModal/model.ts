export interface ErrorModalProps {
  options: {
    isVisible?: boolean;
    errorType?: string;
  };
  error?: {
    title: string;
    message?: string;
  };
}
