import { useState } from 'react';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { LinkAccountForm } from './LinkAccountForm/LinkAccountForm';
import { LinkAccountFormSchema } from './LinkAccountForm/LinkAccountForm.schema';

export const LinkedAccountWidget = () => {
  const accountStatus = 'notLinked';
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleSubmit = (data: z.infer<typeof LinkAccountFormSchema>) => {
    console.log(data);
    // Handle account linking logic here
    setDialogOpen(false);
  };

  return (
    <div className="eb-flex eb-items-center eb-space-x-4 eb-rounded-md eb-border eb-p-4">
      {accountStatus === 'notLinked' && (
        <Dialog
          open={isDialogOpen}
          onOpenChange={(open) => {
            setDialogOpen(open);
          }}
        >
          <DialogTrigger asChild>
            <Button>Link Account</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Link an account</DialogTitle>
              <DialogDescription>This is a description</DialogDescription>
            </DialogHeader>
            <LinkAccountForm onSubmit={handleSubmit} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
