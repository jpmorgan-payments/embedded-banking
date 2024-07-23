import { Edit } from 'tabler-icons-react';

import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Group,
  Text,
  Title,
} from '@/components/ui';

interface CardReviewBusiness {
  data: any;
  type: 'organization' | 'individual';
  title: string;
  onEdit: any;
}

const CardReviewBusiness = ({
  data,
  type = 'organization',
  // title,
  onEdit,
}: CardReviewBusiness) => {
  const {
    // email,
    orgDetails,
  } = data;
  const {
    businessName,
    // dba,
    // organizationDescription,
    // industryCategory,
    // industryType,
    countryOfFormation,
    // yearOfFormation,
    // countryCode,
    // phoneNumber,
    // website,
    businessAddressLine1,
    businessAddressLine2,
    businessAddressLine3,
    businessCity,
    businessState,
    businessZipCode,
  } = orgDetails;
  return (
    <>
      <Title as="h5" className="eb-my-2 eb-uppercase">
        {type === 'organization' ? `business details` : `Management Ownership`}
      </Title>
      <Card className="eb-min-w-96">
        <CardHeader className="">
          <CardTitle></CardTitle>
          <Group className="eb-ml-auto">
            <Button
              variant="ghost"
              onClick={() => {
                onEdit(true);
              }}
            >
              <Edit /> Edit
            </Button>
          </Group>
        </CardHeader>
        <CardContent>
          <Title as="h5">{businessName}</Title>
          <Group>
            <Text size="sm">
              {[
                businessAddressLine1,
                businessAddressLine2,
                businessAddressLine3,
              ].join(' ')}
            </Text>
          </Group>
          <Group>
            <Text size="sm">
              {[
                `${businessCity},`,
                businessState,
                businessZipCode,
                countryOfFormation,
              ].join(' ')}
            </Text>
          </Group>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </>
  );
};

export { CardReviewBusiness };
