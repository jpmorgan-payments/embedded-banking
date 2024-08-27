import { useMemo } from 'react';
import { Separator } from '@radix-ui/react-select';
import {
  AlertCircleIcon,
  CheckCircleIcon,
  CircleIcon,
  ClockIcon,
  PauseCircleIcon,
  XCircleIcon,
} from 'lucide-react';

import { ClientStatus } from '@/api/generated/embedded-banking.schemas';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Box, Title } from '@/components/ui';

import { CardReviewBusiness } from '../../CardReview/CardReviewBusiness';
import { CardReviewIndividual } from '../../CardReview/CardReviewIndividual';
import { fromApiToForm } from '../../utils/fromApiToForm';
import { useGetDataByClientId } from '../hooks';

const statusConfig: Record<ClientStatus, { icon: JSX.Element; color: string }> =
  {
    APPROVED: {
      icon: <CheckCircleIcon className="eb-h-4 eb-w-4" />,
      color: 'eb-bg-green-100 eb-text-green-800',
    },
    DECLINED: {
      icon: <XCircleIcon className="eb-h-4 eb-w-4" />,
      color: 'eb-bg-red-100 eb-text-red-800',
    },
    INFORMATION_REQUESTED: {
      icon: <AlertCircleIcon className="eb-h-4 eb-w-4" />,
      color: 'eb-bg-blue-100 eb-text-blue-800',
    },
    NEW: {
      icon: <CircleIcon className="eb-h-4 eb-w-4" />,
      color: 'eb-bg-purple-100 eb-text-purple-800',
    },
    REVIEW_IN_PROGRESS: {
      icon: <ClockIcon className="eb-h-4 eb-w-4" />,
      color: 'eb-bg-yellow-100 eb-text-yellow-800',
    },
    SUSPENDED: {
      icon: <PauseCircleIcon className="eb-h-4 eb-w-4" />,
      color: 'eb-bg-orange-100 eb-text-orange-800',
    },
    TERMINATED: {
      icon: <XCircleIcon className="eb-h-4 eb-w-4" />,
      color: 'eb-bg-gray-100 eb-text-gray-800',
    },
  };

export const ClientStateStep = () => {
  const { data: clientData, isLoading } = useGetDataByClientId();

  const clientDataForm = useMemo(() => {
    return clientData && fromApiToForm(clientData);
  }, [clientData]);

  if (isLoading) {
    return <div>Loading client information...</div>;
  }

  if (!clientData) {
    return <div>No client data available.</div>;
  }

  const businessDetails = clientData?.parties?.find(
    (party) => party.partyType === 'ORGANIZATION'
  );

  const status = clientData.status as ClientStatus;
  const { icon, color } = statusConfig[status] || statusConfig.NEW;

  return (
    <Card className="eb-w-full">
      <CardHeader>
        <CardTitle className="eb-text-xl eb-font-bold">
          Client Onboarding Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="eb-space-y-4">
          <div className="eb-flex eb-items-center eb-justify-between">
            <span className="eb-text-sm eb-font-medium eb-text-gray-500">
              Status:
            </span>
            <Badge className={`eb-flex eb-items-center eb-gap-1 ${color}`}>
              {icon}
              {status}
            </Badge>
          </div>
          <div className="eb-flex eb-items-center eb-justify-between">
            <span className="eb-text-sm eb-font-medium eb-text-gray-500">
              Client ID:
            </span>
            <span className="eb-text-sm eb-font-bold">{clientData.id}</span>
          </div>
          <div className="eb-flex eb-items-center eb-justify-between">
            <span className="eb-text-sm eb-font-medium eb-text-gray-500">
              Organization:
            </span>
            <span className="eb-text-sm eb-font-bold">
              {businessDetails?.organizationDetails?.organizationName?.replace(
                /_/,
                ' '
              ) || 'N/A'}
            </span>
          </div>
          <div className="eb-flex eb-items-center eb-justify-between">
            <span className="eb-text-sm eb-font-medium eb-text-gray-500">
              Organization Type:
            </span>
            <span className="eb-text-sm eb-font-bold">
              {businessDetails?.organizationDetails?.organizationType?.replace(
                /_/,
                ' '
              ) || 'N/A'}
            </span>
          </div>

          <div className="eb-mt-4 eb-text-sm eb-text-gray-500">
            {status === 'NEW' && (
              <p>
                A new client application has been submitted and is awaiting
                review.
              </p>
            )}
            {status === 'REVIEW_IN_PROGRESS' && (
              <p>The client application is currently under review.</p>
            )}
            {status === 'INFORMATION_REQUESTED' && (
              <p>Additional information has been requested from the client.</p>
            )}
            {status === 'APPROVED' && (
              <p>The client application has been approved.</p>
            )}
            {status === 'DECLINED' && (
              <p>The client application has been declined.</p>
            )}
            {status === 'SUSPENDED' && (
              <p>The client account has been temporarily suspended.</p>
            )}
            {status === 'TERMINATED' && (
              <p>The client account has been terminated.</p>
            )}
          </div>
        </div>

        <Box className="eb-space-y-4">
          <CardReviewBusiness data={clientDataForm} type="organization" />
        </Box>
        <Separator />
        <Title as="h5" className="eb-my-2 eb-uppercase">
          Management Ownership
        </Title>
        <Box className="eb-grid-cols-3">
          {Object.entries(clientDataForm.individualDetails).map(
            ([key, val]: any) => {
              return (
                <CardReviewIndividual
                  data={val}
                  type="organization"
                  key={key}
                />
              );
            }
          )}
        </Box>
      </CardContent>
    </Card>
  );
};
