import { FC, ReactNode, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Grid } from '@/components/ui/grid';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Stack } from '@/components/ui/stack';
import { Text } from '@/components/ui/text';
import { Title } from '@/components/ui/title';

import { validationSchema } from './EntityTypeForm.schema';

type EntityTypeFormProps = {
  onSubmit: (data: any) => void;
  children?: ReactNode;
};

export const EntityTypeForm: FC<EntityTypeFormProps> = ({ onSubmit }: any) => {
  const [selectedAccountType, setSelectedAccountType] = useState('individual'); // Default to individual

  const form = useForm<any>({
    resolver: yupResolver(validationSchema()),
  });

  const handleAccountTypeChange = (accountType: string) => {
    setSelectedAccountType(accountType);
  };

  return (
    <Stack>
      <Title as="h3">What Kind of Business do you run?</Title>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <ScrollArea className="eb-h-[calc(100vh)] eb-border-t-2 eb-px-6">
            <Grid
              className={`eb-gap-4 eb-pt-4 ${'eb-grid-flow-row'}  eb-grid-cols-2`}
            >
              <FormField
                control={form.control}
                name="accountType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account Type</FormLabel>

                    <FormControl>
                      <RadioGroup
                        name="legalStructure"
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="eb-flex eb-flex-col eb-space-y-1"
                      >
                        <FormItem className="eb-flex eb-items-center eb-space-x-3 eb-space-y-0">
                          <RadioGroupItem value="Corporation" />

                          <FormLabel className="eb-font-normal">
                            Business (Corporation)
                          </FormLabel>
                        </FormItem>
                        <FormItem className="eb-flex eb-items-center eb-space-x-3 eb-space-y-0">
                          <RadioGroupItem value="Limited Liability Company" />

                          <FormLabel className="eb-font-normal">
                            Business (LLC)
                          </FormLabel>
                        </FormItem>
                        <FormItem className="eb-flex eb-items-center eb-space-x-3 eb-space-y-0">
                          <RadioGroupItem value="Limited Partnership" />

                          <FormLabel className="eb-font-normal">
                            Business (LP)
                          </FormLabel>
                        </FormItem>
                        <FormItem className="eb-flex eb-items-center eb-space-x-3 eb-space-y-0">
                          <RadioGroupItem value="Sole Proprietorship" />

                          <FormLabel className="eb-font-normal">
                            Sole Proprietor
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Card>
                <CardContent>
                  <Text size="lg">
                    The information we request from you will help us complete
                    setting up your account. Please review and update any
                    information that needs confirmation; and provide any
                    additional information requested.
                  </Text>
                </CardContent>
              </Card>
            </Grid>
            <Stack>
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
            </Stack>

            <Button variant="secondary" type="submit">
              Submit
            </Button>
          </ScrollArea>
        </form>
      </Form>
    </Stack>
  );
};
