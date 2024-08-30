import { Edit } from 'tabler-icons-react';

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Group,
  Text,
  Title,
} from '@/components/ui';

interface CardReviewIndividualProps {
  data: any;
  type: 'organization' | 'individual';
  title?: string;
  onEdit?: any;
}

const CardReviewIndividual = ({
  data,
  // type = 'organization',
  // title,
  onEdit,
}: CardReviewIndividualProps) => {
  const {
    // email,
    indDetails,
  } = data;

  const {
    jobTitle,
    jobTitleDescription,
    city,
    countryOfResidence,
    firstName,
    addressLine1,
    addressLine2,
    addressLine3,
    lastName,
    postalCode,
    state,
  } = indDetails;

  return (
    <>
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
            <Title as="h5">
              {firstName} {lastName},
            </Title>
            <Text>
              &nbsp; {jobTitle === 'Other' ? jobTitleDescription : jobTitle}
            </Text>
          </Group>
          <Group>
            <Text size="sm">
              {[addressLine1, addressLine2, addressLine3].join(' ')}
            </Text>
          </Group>
          <Group>
            <Text size="sm">
              {[`${city},`, state, postalCode, countryOfResidence].join(' ')}
            </Text>
          </Group>
        </CardContent>
      </Card>
    </>
  );
};

export { CardReviewIndividual };
