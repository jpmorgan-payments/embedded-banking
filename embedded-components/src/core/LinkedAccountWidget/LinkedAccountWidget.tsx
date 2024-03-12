import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { SelectContent } from '@radix-ui/react-select';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
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
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const FormSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  accountType: z.enum(['checking', 'savings'], {
    required_error: 'Account type is required',
  }),
  routingNumber: z
    .string()
    .min(9, 'Routing number must be 9 digits')
    .max(9, 'Routing number must be 9 digits'),
  accountNumber: z.string().min(1, 'Account number is required'),
});

export const LinkedAccountWidget = () => {
  const accountStatus = 'notLinked';

  const [isDialogOpen, setDialogOpen] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log(data);
    // Handle account linking logic here
    setDialogOpen(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Linked Account</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4 rounded-md border p-4">
          {/* {accountStatus === 'linked' && <div>Account is Linked</div>}
      {accountStatus === 'pending' && <div>Pending Verification</div>} */}
          {accountStatus === 'notLinked' && (
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  onClick={() => setDialogOpen(true)}
                  className="bg-primary"
                >
                  Link Account
                </Button>
              </DialogTrigger>
              <DialogContent className="eb-z-[100]">
                <DialogHeader>
                  <DialogTitle>Link an account</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="eb-grid eb-gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
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
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="accountType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Account Type</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select account type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="checking">
                                  Checking
                                </SelectItem>
                                <SelectItem value="savings">Savings</SelectItem>
                              </SelectContent>
                            </Select>
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
                      <Button type="submit">Submit</Button>
                    </div>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
