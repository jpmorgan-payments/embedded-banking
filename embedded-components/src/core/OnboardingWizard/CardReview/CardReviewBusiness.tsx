import { Edit, Separator } from 'tabler-icons-react';

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Group,
  Stack,
  Text,
  Title,
} from '@/components/ui';

interface CardReviewBusiness {
  data: any;
  type: 'organization' | 'individual';
  title?: string;
  onEdit?: any;
}

const CardReviewBusiness = ({
  data,
  type = 'organization',
  // title,
  onEdit,
}: CardReviewBusiness) => {
  const {
    industryCategory,
    industryType,
    countryOfFormation,
    ein,
    businessAddressLine1,
    businessAddressLine2,
    businessAddressLine3,
    businessCity,
    businessState,
    businessZipCode,
  } = data.organizationDetails.orgDetails;

  return (
    <>
      <Title as="h5" className="eb-my-2 eb-uppercase">
        {type === 'organization' ? `Business details` : `Management Ownership`}
      </Title>
      <Card className="eb-min-w-96 eb-pt-8">
        {onEdit && (
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
        )}
        <CardContent>
          <Group>
            <Text>EIN: &nbsp; </Text>
            <Title as="h5">{ein}</Title>
          </Group>
          <Stack>
            <Group>
              <Text>Category: &nbsp; </Text>
              <Text>{industryCategory}</Text>
            </Group>
            <Group>
              <Text>Type: &nbsp; </Text>
              <Text>{industryType}</Text>
            </Group>
          </Stack>
          <Separator className="eb-my-2" />
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
      </Card>
    </>
  );
};

export { CardReviewBusiness };
