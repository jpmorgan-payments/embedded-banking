import { useState } from 'react';
import { Edit2Icon } from 'lucide-react';
import { Edit } from 'tabler-icons-react';

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Dialog,
  DialogTrigger,
  Group,
  Stack,
  Text,
  Title,
} from '@/components/ui';

import { DecisionMakerModal } from '../WizardSteps/DecisionMakers/DecisionMakerModal/DecisionMakerModal';

interface CardReviewIndividualProps {
  data: any;
  type: 'organization' | 'individual';
  title: string;
  onEdit: any;
}

const CardReviewIndividual = ({
  data,
  type = 'organization',
  title,
  onEdit,
}: CardReviewIndividualProps) => {
  const [open, setOpen] = useState(false);
  const { email, indDetails } = data;
  const {
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
          <Title as="h5">
            {firstName} {lastName}
          </Title>
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
        <CardFooter></CardFooter>
      </Card>
    </>
  );
};

export { CardReviewIndividual };
