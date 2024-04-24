import {
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

import { AddressForm } from '../../DecisionMakersForm/AddressForm/AddressForm';
import { PersonalDetailsForm } from '../../DecisionMakersForm/PersonalDetailsForm/PersonalDetailsForm';
import { Button } from '@/components/ui/button';

type AdditionalDecisionMakerModalFormProps = {
  form:any;
};

const AdditionalDecisionMakerModalForm = ({
  form,
}: AdditionalDecisionMakerModalFormProps) => {
  

  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogContent>
        <DialogTitle>Enter decision maker details</DialogTitle>
       
       
            <ScrollArea className="eb-border-t-2 eb-px-6">
              <PersonalDetailsForm form={form} />
              <AddressForm form={form}/>

              <div className="mt-[25px] flex justify-end">
                <DialogClose asChild>
                  <Button>
                   Save changes
                   </Button>
                </DialogClose>
              </div>
            </ScrollArea>
         
      </DialogContent>
    </DialogPortal>
  );
};

export { AdditionalDecisionMakerModalForm };
