import { FC } from 'react';
import { AlertCircleIcon, RefreshCwIcon } from 'lucide-react';

import { ErrorType } from '@/api/axios-instance';
import { ApiErrorV2 } from '@/api/generated/embedded-banking.schemas';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

type ServerErrorAlertProps = {
  error: ErrorType<ApiErrorV2>;
  customErrorMessage?: string | Record<string, string>;
  tryAgainAction?: () => void;
};
export const ServerErrorAlert: FC<ServerErrorAlertProps> = ({
  error,
  customErrorMessage,
  tryAgainAction,
}) => {
  const httpStatus = error.response?.data?.httpStatus ?? error.status;
  return (
    <Alert variant="destructive">
      <AlertCircleIcon className="eb-h-4 eb-w-4" />
      <AlertTitle>{error?.response?.data?.title ?? error?.message}</AlertTitle>
      <AlertDescription>
        {typeof customErrorMessage === 'string' && customErrorMessage}

        {typeof customErrorMessage === 'object' &&
          (((httpStatus &&
            httpStatus in customErrorMessage &&
            customErrorMessage[httpStatus]) ||
            customErrorMessage.default) ??
            'An unexpected error occurred.')}

        {typeof customErrorMessage === 'undefined' &&
          'An unexpected error occurred. Please try again later.'}
      </AlertDescription>
      {tryAgainAction && (
        <AlertDescription className="eb-mt-4">
          <Button size="sm" onClick={tryAgainAction}>
            <RefreshCwIcon className="eb-mr-1 eb-h-4 eb-w-4" />
            Click to try again
          </Button>
        </AlertDescription>
      )}
    </Alert>
  );
};
