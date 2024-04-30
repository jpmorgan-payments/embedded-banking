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
import { Separator } from '@/components/ui/separator';
import { Stack } from '@/components/ui/stack';
import { Text } from '@/components/ui/text';
import { Title } from '@/components/ui/title';

import { useContentData } from '../useContentData';
import {
  businessDetailsSchema,
  BusinessDetailsStepValues,
  soleProprietorBusinessDetailsSchema,
  SoleProprietorBusinessDetailsStepValues,
} from './BusinessDetails.schema';
import { BusinessDetailsCommon } from './BusinessDetailsCommon';
import { useOnboardingForm } from '../context/form.context';
import NavigationButtons from '../Stepper/NavigationButtons';

type EntityTypeFormProps = {
  children?: ReactNode;
  setActiveStep: any;
  activeStep: number;
};

export const BusinessDetails: FC<EntityTypeFormProps> = ({
  setActiveStep,
  activeStep,
}: any) => {
  const [selectedAccountType, setSelectedAccountType] = useState(''); // Default to individual
  const { getContentToken } = useContentData('steps.BusinessDetailsStep');
  const { setOnboardingForm, onboardingForm } = useOnboardingForm();
  const defaultInitialValues = businessDetailsSchema().cast(
    {}
  ) as BusinessDetailsStepValues;

  const form = useForm<any>({
    defaultValues: defaultInitialValues,
    resolver: yupResolver(businessDetailsSchema(getContentToken)),
    mode: 'onBlur',
  });

  const onSubmit = () => {
    const errors = form?.formState?.errors;
    if (Object.values(errors).length === 0)  {
      const newOnboardingForm = addBusinessDetails(onboardingForm, form.getValues());
      setOnboardingForm(newOnboardingForm);
      setActiveStep(3);
    }
  };

  return (
    <Stack>
      <Title as="h3">What Kind of Business do you run?</Title>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          onChange={() => {
            setSelectedAccountType(form.getValues().legalStructure);
          }}
        >
         <Title as="h2">{getContentToken(`detailsSectionTitle`)}</Title>
            <Grid
              className={`eb-gap-4 eb-pt-4 ${'eb-grid-flow-row'}  eb-grid-cols-2`}
            >
              <FormField
                control={form.control}
                name="businessName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel asterisk>
                      {getContentToken(`businessName.label`)}
                    </FormLabel>
                    <FormControl>
                      <Input {...field} required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="businessAliasName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel asterisk>
                      {getContentToken(`businessAliasName.label`)}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        required
                        placeholder={
                          getContentToken(
                            `businessAliasName.placeholder`
                          ) as string
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ein"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel asterisk>
                      {getContentToken(`businessAliasName.label`)}
                    </FormLabel>
                    <FormControl>
                      <Input {...field} required type="number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Grid>
            <Separator />
            <BusinessDetailsCommon form={form} />
            <NavigationButtons
              setActiveStep={setActiveStep}
              activeStep={activeStep}
              onSubmit={onSubmit}
            />
        </form>
      </Form>
    </Stack>
  );
};
