import { AlertCircle, RefreshCwIcon, X } from 'lucide-react';

import { useError } from '@/core/OnboardingWizard/context/error.context';
import { useContentData } from '@/core/OnboardingWizard/utils/useContentData';

import { Alert, Box, Button } from '../ui';
import { AlertDescription, AlertTitle } from '../ui/alert';

type ServerErrorAlertProps = {
  title?: string;
  customErrorMessage?: string | Record<string, string>;
  tryAgainAction?: () => void;
};

const ServerAlertMessage = ({
  title,
  tryAgainAction,
  customErrorMessage,
}: ServerErrorAlertProps) => {
  const { setError, error } = useError();
  const { getContentToken: getContent } = useContentData(
    `features.OnboardingWizard`
  );

  return (
    <Alert
      variant="destructive"
      color="orange"
      className="eb-container eb-relative eb-mb-6 eb-max-w-xl"
    >
      <AlertCircle className="eb-h-4 eb-w-4" />
      <AlertTitle>{title || getContent(`alertMessageTitle`)}</AlertTitle>
      <AlertDescription>{getContent(`alertMessageText`)}</AlertDescription>

      <AlertDescription className="eb-mt-4">
        {error?.response?.data?.context?.[0]?.message ?? error?.statusText}
      </AlertDescription>

      {tryAgainAction && (
        <AlertDescription className="eb-mt-4">
          <Button size="sm" onClick={tryAgainAction}>
            <RefreshCwIcon className="eb-mr-1 eb-h-4 eb-w-4" />
            Click to try again
          </Button>
        </AlertDescription>
      )}

      <Box
        className="eb-absolute eb-right-2 eb-top-2 eb-cursor-pointer"
        onClick={() => {
          setError(false);
        }}
      >
        <X className="eb-h-4 eb-w-4" />
      </Box>
    </Alert>
  );
};

export { ServerAlertMessage };
