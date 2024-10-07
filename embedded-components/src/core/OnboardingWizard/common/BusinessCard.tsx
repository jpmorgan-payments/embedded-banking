import { useState } from 'react';
import { f } from 'msw/lib/core/HttpResponse-B58aIqZM';
import { User } from 'tabler-icons-react';

import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui';

// eslint-disable-next-line
import { IndividualOrgIndModal } from '../Modals/IndividualOrgIndModal';

// import { PersonalDetailsValues } from '../../PersonalDetailsStep/PersonalDetailsStep.schema';

type DecisionMakersCardProps = {
  individual: any;
  index?: number;
  controller?: boolean;
  parentPartyId: string;
  refetch?: any;
  partyId: string;
  type: 'owner' | 'decision';
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

const BusinessCard = ({
  individual,
  controller,
  parentPartyId,
  refetch,
  partyId,
  type,
}: DecisionMakersCardProps) => {
  const fields = controller
    ? fieldsController(individual)
    : fieldsOther(individual);

  const [open, setOpen] = useState(false);
  return (
    <div className="eb-w-80">
      <Card>
        <CardContent
          className={`${controller && 'eb-bg-black/10'} eb-flex eb-h-60 eb-content-center eb-rounded-md`}
        >
          <div className="eb-grid eb-grid-flow-row-dense eb-grid-cols-3 eb-content-center eb-justify-center">
            <div className="eb-content-center eb-gap-2">
              <div className="eb-mb-3 eb-flex eb-h-12 eb-w-12 eb-place-content-center eb-items-center eb-justify-center eb-justify-items-center eb-rounded-full eb-border-2 eb-border-secondary/90">
                <User key="userIcon" size={20} color="black"></User>
              </div>
              <div>
                <div>
                  {fields?.map((fieldVal) => (
                    <Text
                      className="eb-text-sm eb-font-bold"
                      key={fieldVal?.des + fieldVal?.var}
                    >
                      {fieldVal?.des}
                    </Text>
                  ))}
                </div>
              </div>
            </div>
            <div className="eb-content-center eb-gap-2">
              <div className="eb-mb-3">
                {individual?.firstName} {individual?.lastName}
              </div>

              <div>
                <div>
                  {fields?.map((fieldVal) => (
                    <Text className="eb-text-sm" key={fieldVal?.var + individual?.email}>
                      {fieldVal?.var ? fieldVal?.var : 'N/A'}
                    </Text>
                  ))}
                </div>
              </div>
              <div>
                {controller ? (
                  <Text className="eb-w-max eb-text-sm">
                    View/edit details in prior step
                  </Text>
                ) : (
                  <Dialog onOpenChange={setOpen} open={open}>
                    <DialogTrigger asChild>
                      <Button
                        type="button"
                        className="eb-mt-1"
                        variant="outline"
                      >
                        View/Edit Details
                      </Button>
                    </DialogTrigger>
                    <IndividualOrgIndModal
                      data={individual}
                      title={
                        type === 'owner'
                          ? 'Edit business owner details'
                          : 'Edit decision maker details'
                      }
                      onOpenChange={(id: string) => {
                        setOpen((s) => !s);
                        if (id) {
                          refetch();
                        }
                      }}
                      parentPartyId={parentPartyId}
                      partyId={partyId}
                      type={type}
                      key={individual?.id}
                      openDialog={open}
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
export { BusinessCard };
