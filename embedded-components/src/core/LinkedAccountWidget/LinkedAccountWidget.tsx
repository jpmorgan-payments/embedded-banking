import { z } from 'zod';

import { useGetAllRecipients } from '@/api/generated/embedded-banking';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { LinkAccountFormDialogTrigger } from './LinkAccountForm/LinkAccountForm';
import { LinkAccountFormSchema } from './LinkAccountForm/LinkAccountForm.schema';

export const LinkedAccountWidget = () => {
  const accountStatus = 'notLinked';

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSubmit = (data: z.infer<typeof LinkAccountFormSchema>) => {
    // Handle account linking logic here
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data } = useGetAllRecipients();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Linked Account</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="eb-flex eb-items-center eb-space-x-4 eb-rounded-md eb-border eb-p-4">
          {accountStatus === 'notLinked' && (
            <LinkAccountFormDialogTrigger onSubmit={handleSubmit}>
              <Button>Link Account</Button>
            </LinkAccountFormDialogTrigger>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
