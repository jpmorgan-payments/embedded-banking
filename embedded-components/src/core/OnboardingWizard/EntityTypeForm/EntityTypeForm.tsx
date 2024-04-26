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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Stack } from '@/components/ui/stack';
import { Text } from '@/components/ui/text';
import { Title } from '@/components/ui/title';

import { useContentData } from '../useContentData';
import {
  createEntityTypeFormValidationSchema,
  tEntityTypeFormValidationSchemaValues,
} from './EntityTypeForm.schema';

type EntityTypeFormProps = {
  children?: ReactNode;
  setActiveStep: any;
  activeStep: number;
};

export const EntityTypeForm: FC<EntityTypeFormProps> = ({ setActiveStep, activeStep }: any) => {
  const [selectedAccountType, setSelectedAccountType] = useState(''); // Default to individual
  const { getContentToken } = useContentData('features.EntityTypeForm');
  const defaultInitialValues = createEntityTypeFormValidationSchema().cast(
    {}
  ) as tEntityTypeFormValidationSchemaValues;

  const formz = useForm<any>({
    defaultValues: defaultInitialValues,
    resolver: yupResolver(
      createEntityTypeFormValidationSchema(getContentToken)
    ),
    mode: 'onBlur',
  });

  const onSubmit = () => {
    const errors = formz?.formState?.errors;
    if (Object.values(errors).length === 0) setActiveStep(activeStep+1);
  }

  return (
    <Stack>
      <Title as="h3">What Kind of Business do you run?</Title>
      <Form {...formz}>
        <form
          onSubmit={formz.handleSubmit(onSubmit)}
          onChange={() => {
            setSelectedAccountType(formz.getValues().legalStructure);
          }}
        >
          <ScrollArea className="eb-h-[calc(100vh)] eb-border-t-2 eb-px-6">
            <Grid
              className={`eb-gap-4 eb-pt-4 ${'eb-grid-flow-row'}  eb-grid-cols-2`}
            >
              <FormField
                control={formz.control}
                name="legalStructure"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel asterisk>
                      {getContentToken(`radioLabelLegal`)}
                    </FormLabel>

                    <FormControl>
                      <RadioGroup
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
                    {getContentToken('corpText1')}
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
                    <FormLabel asterisk>
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
                    <FormLabel asterisk>
                      Do you identify as a provider, owner, and/or operator of
                      private ATM(s) and/or third Party ATM(s) activity?
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
              {formz.getValues().legalStructure !== 'Sole Proprietorship' && (
                <FormField
                  control={formz.control}
                  name="entitiesInOwnership"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel asterisk>
                        Are there any entities (or non-individuals) in your
                        ownership hierarchy?
                      </FormLabel>

                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="eb-flex eb-flex-row eb-space-y-1"
                        >
                          <FormItem className="eb-flex eb-items-center eb-space-x-3 eb-space-y-0">
                            <RadioGroupItem value="yes" />

                            <FormLabel className="eb-font-normal">
                              Yes
                            </FormLabel>
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
              )}
              {formz.getValues().legalStructure !== 'Sole Proprietorship' && (
                <FormField
                  control={formz.control}
                  name="significantOwnership"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel asterisk>
                        Are there any individuals who own 25% or more of your
                        company?
                      </FormLabel>

                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="eb-flex eb-flex-row eb-space-y-1"
                        >
                          <FormItem className="eb-flex eb-items-center eb-space-x-3 eb-space-y-0">
                            <RadioGroupItem value="yes" />

                            <FormLabel className="eb-font-normal">
                              Yes
                            </FormLabel>
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
              )}
            </Stack>
            <Separator className="eb-my-8" />
            {/* <FormField
              control={formz.control}
              name="mockEnabled"
              render={({ field }) => (
                <FormItem className="eb-flex eb-flex-row eb-mt-8">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>

                  <FormLabel>Auto-fill forms with mock data</FormLabel>
                </FormItem>
              )}
            /> */}

            <Button
              variant="secondary"
              type="submit"
              className="eb-mt-8"
              onClick={onSubmit}
            >
              Submit
            </Button>
          </ScrollArea>
        </form>
      </Form>
    </Stack>
  );
};
