import {  Key } from 'react';
import { useForm } from 'react-hook-form';
import { Dialog } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Text } from '@/components/ui/text';
import { AdditionalDecisionMakerModalForm } from './AdditionalDecisionMakersModal/AdditionalDescisionMakersModal';
import { DecisionMakerCard } from './DecisionMakerCard/DecisionMakerCard';



const AdditionalDecisionMakersForm = () => {
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

  return (
<>
        <Label as="h1">Additional Decision Makers</Label>
        <Label as="h3">
          Are there any general partners or managing members within in your
          business who can make decisions on behalf of your company that we have
          not already captured in the business details?
        </Label>
        {/* <FormField
          control={form.control}
          name="accountType"
          render={({ field }) => (
            <RadioGroup
              name="additionalParties"
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="eb-flex eb-flex-col eb-space-y-1"
            >
              <FormItem className="eb-flex eb-items-center eb-space-x-3 eb-space-y-0">
                <RadioGroupItem value="Yes" />

                <FormLabel className="eb-font-normal">
                  Yes
                </FormLabel>
              </FormItem>
              <FormItem className="eb-flex eb-items-center eb-space-x-3 eb-space-y-0">
                <RadioGroupItem value="Noy" />

                <FormLabel className="eb-font-normal">No</FormLabel>
              </FormItem>
            </RadioGroup>
          )}
          
        /> */}
        <Text>Listed business decision makers</Text>

        <Dialog>
          {form?.values?.owners.map((owner: any, index: Key) => (
            <DecisionMakerCard data={owner} key={index}></DecisionMakerCard>
          ))}

          <AdditionalDecisionMakerModalForm form={form} onSubmit={()=>{}}/>
        </Dialog>
        </>
  );
};

export { AdditionalDecisionMakersForm };
