import { z } from 'zod';

import { useGetAllRecipients } from '@/api/generated/embedded-banking';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { LinkAccountFormDialogTrigger } from './LinkAccountForm/LinkAccountForm';
import { LinkAccountFormSchema } from './LinkAccountForm/LinkAccountForm.schema';

export const LinkedAccountWidget = () => {
  const accountStatus = 'notLinked';

  const handleSubmit = (data: z.infer<typeof LinkAccountFormSchema>) => {
    console.log(data);
    // Handle account linking logic here
  };

  const { data } = useGetAllRecipients();
  console.log(data);

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
