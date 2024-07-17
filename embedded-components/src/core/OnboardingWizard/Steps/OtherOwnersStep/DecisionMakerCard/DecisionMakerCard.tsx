import { useState } from 'react';
import { User } from 'tabler-icons-react';

import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui';

import { PersonalDetailsValues } from '../../PersonalDetailsStep/PersonalDetailsStep.schema';
import { DecisionMakerModal } from '../DecisionMakerModal/DecisionMakerModal';

type DecisionMakersCardProps = {
  individual: PersonalDetailsValues;
  index?: number;
  controller: boolean;
};

const fieldsController = (individual: any) => {
  return [
    { des: 'Title', var: individual?.jobTitle },
    { des: 'Email', var: individual?.email },
    { des: 'SSN', var: individual?.ssn9 },
  ];
};

const fieldsOther = (individual: any) => {
  return [
    { des: 'Title', var: individual?.jobTitle },
    { des: 'Email', var: individual?.email },
    { des: 'Phone', var: individual?.phone },
  ];
};

const DecisionMakerCard = ({
  individual,
  controller,
  index,
}: DecisionMakersCardProps) => {
  const fields = controller
    ? fieldsController(individual)
    : fieldsOther(individual);

  const [open, setOpen] = useState(false);
  return (
    <div className="eb-component eb-w-80">
      <Card>
        <CardContent
          className={`${controller && 'eb-bg-black/10'} eb-flex eb-h-60 eb-content-center eb-rounded-md`}
        >
          <div className="eb-grid eb-grid-flow-row-dense eb-grid-cols-3 eb-content-center eb-justify-center">
            <div className="eb-col eb-content-center eb-gap-2">
              <div className="eb-mb-3 eb-flex eb-h-12 eb-w-12 eb-place-content-center eb-items-center eb-justify-center eb-justify-items-center eb-rounded-full eb-border-2 eb-border-secondary/90">
                <User key="userIcon" size={20} color="black"></User>
              </div>
              <div>
                {fields?.map((fieldVal) => (
                  <div key={fieldVal.des}>
                    <Text className="eb-text-sm eb-font-bold">
                      {fieldVal?.des}
                    </Text>
                  </div>
                ))}
              </div>
            </div>
            <div className="eb-content-center eb-gap-2">
              <div className="eb-mb-3">
                {individual?.firstName} {individual?.lastName}
              </div>

              <div>
                {fields?.map((fieldVal) => (
                  <div key={fieldVal.var}>
                    <Text className="eb-text-sm">
                      {fieldVal?.var ? fieldVal?.var : 'N/A'}
                    </Text>
                  </div>
                ))}
              </div>
              <div>
                {controller ? (
                  <Text className="eb-w-max eb-text-sm">
                    View/edit details in prior step
                  </Text>
                ) : (
                  <Dialog onOpenChange={setOpen} open={open}>
                    <DialogTrigger>
                      <Button
                        onClick={() => setOpen(true)}
                        type="button"
                        className="eb-mt-1"
                        variant="outline"
                      >
                        View/Edit Details
                      </Button>
                    </DialogTrigger>
                    <DecisionMakerModal
                      owner={individual}
                      index={index}
                      onOpenChange={setOpen}
                    />
                  </Dialog>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export { DecisionMakerCard };
