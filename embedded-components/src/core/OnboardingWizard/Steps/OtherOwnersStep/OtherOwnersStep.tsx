import { Key, useState } from 'react';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { useForm } from 'react-hook-form';

import { Dialog } from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Title } from '@/components/ui/title';

import { useOnboardingForm } from '../../context/form.context';
import NavigationButtons from '../../Stepper/NavigationButtons';
import { DecisionMakerCard } from './DecisionMakerCard/DecisionMakerCard';
import { DecisionMakerModal } from './DecisionMakerModal/DecisionMakerModal';
import { smbdoPostClients } from '@/api/generated/embedded-banking';
import { formToAPIBody } from '../../context/form.actions';

type OtherOwnersStepProp = {
  setActiveStep: any;
  activeStep: any;
};

const OtherOwnersStep = ({
  setActiveStep,
  activeStep,
}: OtherOwnersStepProp) => {
  const [open, setOpen] = useState(false);
  const [additionalDecisionMakers, setAdditionalDecisionMakers] =
    useState(false);

  const { setOnboardingForm, onboardingForm } = useOnboardingForm();

  const form = useForm<any>({});

  const handleToggleButton = (val: string) => {
    if (val === 'No') setAdditionalDecisionMakers(false);
    if (val === 'Yes') setAdditionalDecisionMakers(true);
  };

  const onSubmit = async () => {
    //setActiveStep(activeStep + 1);
    console.log(onboardingForm)
    const apiForm = formToAPIBody(onboardingForm);
    console.log(apiForm)
    const res = await smbdoPostClients(apiForm);
    console.log(res)
  };

  return (
    <div className="eb-grid eb-grid-row-3">
      <Title as="h3">Additional Decision Makers</Title>

      <Form {...form}>
        <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name="additonalDecisionMakers"
            render={() => (
              <FormItem>
                <FormLabel asterisk>
                  Are there any general partners or managing members within in
                  your business who can make decisions on behalf of your company
                  that we have not already captured in the business details?
                </FormLabel>

                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => handleToggleButton(value)}
                    defaultValue="No"
                    className="eb-flex eb-flex-col eb-space-y-1"
                  >
                    <FormItem className="eb-flex eb-items-center eb-space-x-3 eb-space-y-0">
                      <RadioGroupItem value="Yes" />

                      <FormLabel className="eb-font-normal">Yes</FormLabel>
                    </FormItem>
                    <FormItem className="eb-flex eb-items-center eb-space-x-3 eb-space-y-0">
                      <RadioGroupItem value="No" />

                      <FormLabel className="eb-font-normal">No</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
        
      {additionalDecisionMakers && (
        <>
          <Title as="h4">Listed business decision makers</Title>

          <div className="eb-grid eb-grid-cols-3">
            {onboardingForm?.controller && (
              <div
                key="controllerPanel"
                className="eb-grid-cols-subgrid eb-grid-cols-2"
              >
                <DecisionMakerCard
                  controller
                  individual={onboardingForm?.controller}
                ></DecisionMakerCard>
              </div>
            )}

            {onboardingForm?.otherOwners?.map((individual: any, index: Key) => (
              <div key={index} className="eb-grid-cols-subgrid eb-grid-cols-2">
                <DecisionMakerCard
                  controller={false}
                  individual={individual}
                  key={index}
                ></DecisionMakerCard>
              </div>
            ))}

            <Dialog open={open} onOpenChange={setOpen}>
              <div className="eb-bg-black eb-w-24 eb-h-20 eb-text-white eb-rounded-md ">
                <DialogTrigger>Click to add a decision maker</DialogTrigger>
              </div>
              <DecisionMakerModal onOpenChange={setOpen} />
            </Dialog>
          </div>
        </>
      )}
      <NavigationButtons
        setActiveStep={setActiveStep}
        activeStep={activeStep}
        onSubmit={onSubmit}
      />
      </form>
      </Form>
    </div>
  );
};

export { OtherOwnersStep  };
