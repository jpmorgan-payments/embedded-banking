import { Key, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Dialog } from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Text } from '@/components/ui/text';

import { AdditionalDecisionMakerModalForm } from './AdditionalDecisionMakersModal/AdditionalDescisionMakersModal';
import { DecisionMakerCard } from './DecisionMakerCard/DecisionMakerCard';

const AdditionalDecisionMakersForm = ({ setActiveStep }) => {

  const [additionalDecisionMakers, setAdditionalDecisionmakers] = useState(false);
  const form = useForm<any>({});
  const handleAddBusinessOwner = (owner: any) => {
    form.insertListItem('owners', owner);
  };
  const handleEditBusinessOwner = (owner: any, index: number) => {
    form.insertListItem('owners', owner, index);
    form.removeListItem('owners', index + 1);
  };

  const handleDeleteBusinessOwner = (index: number) => {
    form.removeListItem('owners', index);
  };

  const handleToggleButton = (val) => {
    console.log(val)
    if (val === "No") setAdditionalDecisionmakers(false);
    if (val === "Yes") setAdditionalDecisionmakers(true);
  }

  return (
    <>
      <Label as="h1">Additional Decision Makers</Label>

      <Form {...form}>
        <form>
          <FormField
            control={form.control}
            name="additonalDecisionMakers"
            render={({ field }) => (
              <FormItem>
                <FormLabel asterisk>
                  Are there any general partners or managing members within in
                  your business who can make decisions on behalf of your company
                  that we have not already captured in the business details?
                </FormLabel>

                <FormControl>
                  <RadioGroup
                    onValueChange={() => handleToggleButton(field.value)}
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
          {additionalDecisionMakers && <Text>Hi</Text>}
          <Dialog>
            
            {form?.values?.owners.map((owner: any, index: Key) => (
              <DecisionMakerCard data={owner} key={index}></DecisionMakerCard>
            ))}

            <AdditionalDecisionMakerModalForm form={form} onSubmit={() => {}} />
          </Dialog>
        </form>
      </Form>
      <Text>Listed business decision makers</Text>
    </>
  );
};

export { AdditionalDecisionMakersForm };
