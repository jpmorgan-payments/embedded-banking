import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Text } from '@/components/ui/text';

import { createDecisionMakerFormSchema } from '../../DecisionMakersForm/DecisionMakerForm.schema';
import { useContentData } from '../../useContentData';
import { AdditionalDecisionMakerModalForm } from '../AdditionalDecisionMakersModal/AdditionalDescisionMakersModal';

type DecisionMakersCardProps = {
  individual: any;
  key: any;
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

const DecisionMakerCard = ({ individual, key }: DecisionMakersCardProps) => {
  const controller =
    individual?.roles?.includes('CONTROLLER') ||
    individual?.roles?.includes('BENEFICIAL_OWNER');
  const fields = controller
    ? fieldsController(individual)
    : fieldsOther(individual);

  const { getContentToken: getFormSchema } = useContentData(
    'schema.businessOwnerFormSchema'
  );

  const form = useForm<any>({
   // defaultValues: individual,
    resolver: yupResolver(createDecisionMakerFormSchema(getFormSchema)),
  });

  return (
    <div className="eb-w-80">
      <Card>
        <CardContent
          className={`${controller && 'eb-bg-black/10'} eb-h-60 eb-rounded-md`}
        >
          <div className="eb-grid  eb-grid-cols-2 eb-grid-rows-5">
            <div className=" eb-w-16 eb-h-16 eb-bg-secondary  eb-rounded-lg eb-content-center">
              <Text className="eb-text-center eb-content-center">
                {individual?.individualDetails?.firstName?.split('')[0]}
                {individual?.individualDetails?.lastName?.split('')[0]}
              </Text>
            </div>

            <div>
              {individual?.individualDetails?.firstName}{' '}
              {individual?.individualDetails?.lastName}
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
                <Dialog >
                  <DialogTrigger >
                    <Button className="eb-bg-black">View/Edit Details</Button>
                  </DialogTrigger>
                  <AdditionalDecisionMakerModalForm form={form} />
                </Dialog>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export { DecisionMakerCard };
