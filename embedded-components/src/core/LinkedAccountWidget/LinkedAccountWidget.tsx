import { LinkIcon, PencilLineIcon } from 'lucide-react';

import { useGetAllRecipients } from '@/api/generated/embedded-banking';
import { RecipientStatus } from '@/api/generated/embedded-banking.schemas';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge, Separator } from '@/components/ui';

import { LinkAccountFormDialogTrigger } from './LinkAccountForm/LinkAccountForm';

const StatusBadge = ({ status }: { status: RecipientStatus }) => {
  const propsMap: Record<RecipientStatus, Record<string, string>> = {
    ACTIVE: {
      variant: 'success',
    },
    MICRODEPOSITS_INITIATED: {
      variant: 'secondary',
    },
    REJECTED: {
      variant: 'destructive',
    },
    READY_FOR_VALIDATION: {},
    INACTIVE: {
      variant: 'secondary',
    },
  };

  return <Badge {...propsMap[status]}>{status.replace('_', ' ')}</Badge>;
};

export const LinkedAccountWidget = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, status, failureReason } = useGetAllRecipients({
    type: 'LINKED_ACCOUNT',
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Linked Account</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="eb-space-y-4">
          {status === 'pending' && <p>Loading...</p>}
          {status === 'error' && <p>{failureReason?.message}</p>}

          {status === 'success' &&
            data.recipients &&
            data.recipients.length > 0 &&
            data.recipients.map((recipient) => (
              <div key={recipient.id}>
                <div className="eb-space-y-1">
                  <div className="eb-flex eb-items-center eb-justify-between">
                    <h4
                      key={recipient.id}
                      className="eb-text-sm eb-font-medium eb-leading-none"
                    >
                      {recipient.partyDetails.type === 'INDIVIDUAL'
                        ? [
                            recipient.partyDetails.firstName,
                            recipient.partyDetails.lastName,
                          ].join(' ')
                        : recipient.partyDetails.businessName}
                      {` (...${recipient.account.number.slice(-4)})`}
                    </h4>
                    {recipient.status && (
                      <StatusBadge status={recipient.status} />
                    )}
                  </div>
                  <p className="eb-text-sm eb-text-muted-foreground">
                    {recipient.partyDetails.type.toLocaleUpperCase()}
                  </p>
                  {recipient.status === 'MICRODEPOSITS_INITIATED' && (
                    <div>
                      <Button size="sm" variant="secondary" className="eb-mt-2">
                        <PencilLineIcon className="eb-mr-2 eb-h-4 eb-w-4" />{' '}
                        Verify microdeposits
                      </Button>
                    </div>
                  )}
                </div>
                <Separator className="eb-my-4" />
              </div>
            ))}
          <LinkAccountFormDialogTrigger>
            <Button>
              <LinkIcon className="eb-mr-2 eb-h-4 eb-w-4" /> Link A New Account
            </Button>
          </LinkAccountFormDialogTrigger>
        </div>
      </CardContent>
    </Card>
  );
};
