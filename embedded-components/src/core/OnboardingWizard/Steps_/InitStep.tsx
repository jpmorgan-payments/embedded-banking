import { useCallback, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import {
  Box,
  Card,
  CardContent,
  Grid,
  Stack,
  Text,
  Title,
} from '@/components/ui';
import { useRootConfig } from '@/core/EBComponentsProvider/RootConfigProvider';

import { useFormSchema } from '../context/formProvider.contex';
// import { useStepper } from '../Stepper/useStepper';
import { useStepper } from '../Stepper/Stepper';
import { useContentData } from '../utils/useContentData';
import { initSchema } from './StepsSchema';
import { RenderForms } from './utils/RenderForms';

const InitStep = ({ formSchema, yupSchema, children }: any) => {
  const { clientId, jurisdictions, products, entityType } = useRootConfig();
  const form = useFormContext();
  const { updateSchema } = useFormSchema();
  const { activeStep, setCurrentStep, buildStepper } = useStepper();

  const { getContentToken } = useContentData('steps.BusinessDetailsStep');
  const { getContentToken: getInitContentToken } = useContentData(
    'features.EntityTypeForm'
  );

  useEffect(() => {
    buildStepper(['Intro']);
  }, []);

  useEffect(() => {
    if (yupSchema) {
      updateSchema(yupSchema);
    } else {
      updateSchema(initSchema);
    }
  }, [yupSchema]);

  //TODO: Should be API driven, and token Content?
  useEffect(() => {
    if (jurisdictions) {
      form.setValue('countryOfFormation', jurisdictions);
    }

    if (entityType) {
      form.setValue('organizationType', entityType);
    }
  }, [entityType, jurisdictions]);

  

  const onSubmit = useCallback(async () => {
    const errors = form?.formState?.errors;

    if (Object.keys(errors)?.length) {
      return;
    }
    setCurrentStep(activeStep + 1);
  }, [activeStep]);

  return (
    <Stack>
      <Title as="h2" className="eb-mb-8">
        {getInitContentToken(`title`)}
      </Title>
      <Box>
        <form
          noValidate
          onSubmit={form.handleSubmit(onSubmit)}
          className="eb-w-full"
        >
          <Box className="eb-grid eb-grid-cols-2 eb-gap-4 ">
            <RenderForms
              {...{
                formSchema: formSchema.form,
                getContentToken,
                form,
                className: `eb-space-y-6`,
              }}
            />
            <Card role="complementary" aria-live="polite">
              <CardContent className="eb-rounded eb-bg-slate-200">
                <Grid className="eb-flex eb-gap-2 eb-bg-slate-200 eb-p-5">
                  <Text>{getInitContentToken('corpText')}</Text>
                  <Text>{getInitContentToken('corpText1')}</Text>

                  {form.getValues().organizationType === '' && (
                    <Text>{getInitContentToken('corpText2')}</Text>
                  )}

                  {form.getValues().organizationType !==
                    'SOLE_PROPRIETORSHIP' &&
                    form.getValues().organizationType !== '' && (
                      <>
                        <Text className="eb-font-bold">
                          {getInitContentToken('corpText3')}
                        </Text>

                        <ul className="eb-list-disc eb-px-4">
                          {getInitContentToken('corpTextList')
                            .toString()
                            .split(',')
                            .map((val) => (
                              <li key={val}>{val}</li>
                            ))}
                        </ul>
                      </>
                    )}

                  {form.getValues().organizationType ===
                    'SOLE_PROPRIETORSHIP' && (
                    <>
                      <Text className="eb-font-bold">
                        {getInitContentToken(`soloText`)}
                      </Text>
                      <ul>
                        {(getInitContentToken(`soloListText`) as string)
                          .split(',')
                          .filter((i: string) => i)
                          .map((item: string) => {
                            return <li key={item}>{item}</li>;
                          })}
                      </ul>
                    </>
                  )}
                </Grid>
              </CardContent>
            </Card>
          </Box>
          {children}
        </form>
      </Box>
    </Stack>
  );
};

InitStep.title = 'Intro';
InitStep.contentData = 'BusinessDetailsStep';
InitStep.formSchema = initSchema;

export { InitStep };
