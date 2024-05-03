import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Text } from '@/components/ui/text';

import { DecisionMakerModal } from '../DecisionMakerModal/DecisionMakerModal';

type DecisionMakersCardProps = {
  individual: any;
  key?: any;
  controller: boolean;
};

const fieldsController = (individual: any) => {
  return [
    { des: 'Title', var: individual?.individualDetails?.jobTitle },
    { des: 'Email', var: individual?.email },
    { des: 'SSN', var: individual?.individualDetails?.individualIds[0]?.value },
  ];
};

const fieldsOther = (individual: any) => {
  return [
    { des: 'Title', var: individual?.individualDetails?.jobTitle },
    { des: 'Email', var: individual?.email },
    { des: 'Phone', var: individual?.phone },
  ];
};

const DecisionMakerCard = ({
  individual,
  key,
  controller,
}: DecisionMakersCardProps) => {
  const fields = controller
    ? fieldsController(individual)
    : fieldsOther(individual);

  return (
    <Dialog>
      <div className="eb-w-80">
        <Card>
          <CardContent
            className={`${controller && 'eb-bg-black/10'} eb-h-60 eb-rounded-md`}
          >
            <div className="eb-grid  eb-grid-cols-2 eb-grid-rows-5">
              <div className=" eb-w-16 eb-h-16 eb-bg-secondary  eb-rounded-lg eb-content-center">
                <Text className="eb-text-center eb-content-center">
                  {individual?.firstName?.split('')[0]}
                  {individual?.lastName?.split('')[0]}
                </Text>
              </div>

              <div>
                {individual?.firstName} {individual?.lastName}
              </div>

              <div>
                {fields?.map((fieldVal) => (
                  <div key={fieldVal.des}>
                    <Text className="eb-font-bold">{fieldVal?.des}</Text>
                  </div>
                ))}
              </div>
              <div>
                {fields?.map((fieldVal) => (
                  <div key={fieldVal.var}>
                    <Text>{fieldVal?.var ? fieldVal?.var : 'N/A'}</Text>
                  </div>
                ))}
              </div>
              <div></div>
              <div>
                {controller ? (
                  <Text>View/edit details in controller step</Text>
                ) : (
                  <DialogTrigger className="eb-bg-black eb-text-white">
                    View/Edit Details
                  </DialogTrigger>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        {/* <DecisionMakerModal index={key} onOpenChange={() => {}} /> */}
      </div>
    </Dialog>
  );
};
export { DecisionMakerCard };
