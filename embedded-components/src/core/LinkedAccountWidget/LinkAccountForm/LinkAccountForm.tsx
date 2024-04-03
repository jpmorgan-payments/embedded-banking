import { FC, ReactNode, useState } from 'react';
import { FC, ReactNode, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  LinkAccountFormDataType,
  LinkAccountFormSchema,
} from './LinkAccountForm.schema';

type LinkAccountFormDialogTriggerProps = {
type LinkAccountFormDialogTriggerProps = {
  onSubmit: (data: LinkAccountFormDataType) => void;
  children: ReactNode;
  children: ReactNode;
};

export const LinkAccountFormDialogTrigger: FC<
  LinkAccountFormDialogTriggerProps
> = ({ onSubmit, children }) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
export const LinkAccountFormDialogTrigger: FC<
  LinkAccountFormDialogTriggerProps
> = ({ onSubmit, children }) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedAccountType, setSelectedAccountType] = useState('individual'); // Default to individual

  const form = useForm<LinkAccountFormDataType>({
    resolver: zodResolver(LinkAccountFormSchema),
  });

  const handleAccountTypeChange = (accountType: string) => {
    setSelectedAccountType(accountType);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Dialog
          open={isDialogOpen}
          onOpenChange={(open) => {
            setDialogOpen(open);
          }}
        >
          <DialogTrigger asChild>{children}</DialogTrigger>
          <DialogContent className="eb-max-h-[min(60rem,100vh)] eb-gap-4 eb-px-0 eb-pb-0">
            <DialogHeader className="eb-px-6">
              <DialogTitle>Link an account</DialogTitle>
              <DialogDescription>
                Enter your external account&apos;s information to link it
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="eb-max-h-[calc(min(60rem,100vh)-5.5rem)] eb-border-t-2 eb-px-6">
              <div className="eb-grid eb-gap-4 eb-pt-4">
                <FormField
                  control={form.control}
                  name="accountType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account Type</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          handleAccountTypeChange(value);
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select account type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="individual">Individual</SelectItem>
                          <SelectItem value="business">Business</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
        <Dialog
          open={isDialogOpen}
          onOpenChange={(open) => {
            setDialogOpen(open);
          }}
        >
          <DialogTrigger asChild>{children}</DialogTrigger>
          <DialogContent className="eb-max-h-[min(60rem,100vh)] eb-gap-4 eb-px-0 eb-pb-0">
            <DialogHeader className="eb-px-6">
              <DialogTitle>Link an account</DialogTitle>
              <DialogDescription>
                Enter your external account&apos;s information to link it
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="eb-max-h-[calc(min(60rem,100vh)-5.5rem)] eb-border-t-2 eb-px-6">
              <div className="eb-grid eb-gap-4 eb-pt-4">
                <FormField
                  control={form.control}
                  name="accountType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account Type</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          handleAccountTypeChange(value);
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select account type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="individual">Individual</SelectItem>
                          <SelectItem value="business">Business</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {selectedAccountType === 'individual' && (
                  <>
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input {...field} required />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                {selectedAccountType === 'individual' && (
                  <>
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input {...field} required />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input {...field} required />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input {...field} required />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                {selectedAccountType === 'business' && (
                  <FormField
                    control={form.control}
                    name="businessName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Name</FormLabel>
                        <FormControl>
                          <Input {...field} required />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                {selectedAccountType === 'business' && (
                  <FormField
                    control={form.control}
                    name="businessName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Name</FormLabel>
                        <FormControl>
                          <Input {...field} required />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="routingNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Routing Number</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="routingNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Routing Number</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="accountNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account Number</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter className="eb-my-4 eb-gap-2">
                <Button
                  onClick={() => {
                    setDialogOpen(false);
                  }}
                  variant="secondary"
                >
                  Cancel
                </Button>
                <Button type="submit">Link Account</Button>
              </DialogFooter>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </form>
    </Form>
  );
};
