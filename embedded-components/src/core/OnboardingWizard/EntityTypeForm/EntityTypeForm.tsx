import { FC, ReactNode, useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
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
import { Separator } from '@/components/ui/separator';
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

  const formz = useForm<any>({
    resolver: yupResolver(validationSchema()),
  });

  useEffect(() => {
    console.log('@@event on formz', formz.getValues());
  }, [JSON.stringify(formz.getValues())]);

  const handleAccountTypeChange = (accountType: string) => {
    setSelectedAccountType(accountType);
  };
  const sub = (val: any) => {
    console.log('@@WG', val);
  };
  return (
    <Stack>
      <Title as="h3">What Kind of Business do you run?</Title>
      <Form {...formz}>
        <form onSubmit={formz.handleSubmit(sub)}>
          <ScrollArea className="eb-h-[calc(100vh)] eb-border-t-2 eb-px-6">
            <Grid
              className={`eb-gap-4 eb-pt-4 ${'eb-grid-flow-row'}  eb-grid-cols-2`}
            >
              <FormField
                control={formz.control}
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
            <Separator className="eb-my-8" />
            <Stack className="eb-gap-8">
              <Title as="h2">Additional Questions</Title>
              <FormField
                control={formz.control}
                name="businessInSanctionedCountries"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Do you have locations, sell goods or services, or have
                      vendors or suppliers in countries or regions subject to
                      comprehensive sanctions programs (Iran, North Korea, Cuba,
                      Syria and the Crimea, Donetsk, Luhansk Regions of
                      Ukraine), or work with Sanctioned Parties in Russia or
                      Venezuela? *
                    </FormLabel>

                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="eb-flex eb-flex-row eb-space-y-1"
                      >
                        <FormItem className="eb-flex eb-items-center eb-space-x-3 eb-space-y-0">
                          <RadioGroupItem value="yes" />

                          <FormLabel className="eb-font-normal">Yes</FormLabel>
                        </FormItem>
                        <FormItem className="eb-flex eb-items-center eb-space-x-3 eb-space-y-0">
                          <RadioGroupItem value="no" />

                          <FormLabel className="eb-font-normal">No</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formz.control}
                name="relatedToATM"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Do you identify as a provider, owner, and/or operator of
                      private ATM(s) and/or third Party ATM(s) activity? *
                    </FormLabel>

                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="eb-flex eb-flex-row eb-space-y-1"
                      >
                        <FormItem className="eb-flex eb-items-center eb-space-x-3 eb-space-y-0">
                          <RadioGroupItem value="yes" />

                          <FormLabel className="eb-font-normal">Yes</FormLabel>
                        </FormItem>
                        <FormItem className="eb-flex eb-items-center eb-space-x-3 eb-space-y-0">
                          <RadioGroupItem value="no" />

                          <FormLabel className="eb-font-normal">No</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formz.control}
                name="entitiesInOwnership"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Are there any entities (or non-individuals) in your
                      ownership hierarchy? *
                    </FormLabel>

                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="eb-flex eb-flex-row eb-space-y-1"
                      >
                        <FormItem className="eb-flex eb-items-center eb-space-x-3 eb-space-y-0">
                          <RadioGroupItem value="yes" />

                          <FormLabel className="eb-font-normal">Yes</FormLabel>
                        </FormItem>
                        <FormItem className="eb-flex eb-items-center eb-space-x-3 eb-space-y-0">
                          <RadioGroupItem value="no" />

                          <FormLabel className="eb-font-normal">No</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formz.control}
                name="significantOwnership"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Are there any individuals who own 25% or more of your
                      company? *
                    </FormLabel>

                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="eb-flex eb-flex-row eb-space-y-1"
                      >
                        <FormItem className="eb-flex eb-items-center eb-space-x-3 eb-space-y-0">
                          <RadioGroupItem value="yes" />

                          <FormLabel className="eb-font-normal">Yes</FormLabel>
                        </FormItem>
                        <FormItem className="eb-flex eb-items-center eb-space-x-3 eb-space-y-0">
                          <RadioGroupItem value="no" />

                          <FormLabel className="eb-font-normal">No</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </Stack>
            <Separator className="eb-my-8" />
            <FormField
              control={formz.control}
              name="mockEnabled"
              render={({ field }) => (
                <FormItem className="eb-flex eb-flex-row mt-8">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>

                  <FormLabel>Auto-fill forms with mock data</FormLabel>
                  {/* <FormDescription>
                    You can manage your mobile notifications in the{' '}
                  </FormDescription> */}
                </FormItem>
              )}
            />

            <Button
              variant="secondary"
              type="submit"
              className="eb-mt-8"
              onClick={() => {
                console.log('@@click', formz.getValues(), formz.control);
              }}
            >
              Submit
            </Button>
          </ScrollArea>
        </form>
      </Form>
    </Stack>
  );
};
