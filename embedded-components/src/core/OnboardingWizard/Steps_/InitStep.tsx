import { useCallback, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { Box, Card, CardContent, Grid, Text } from '@/components/ui';
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

  const [blank, setUpdate] = useState(0);
  const { getContentToken } = useContentData('steps.BusinessDetailsStep');
  const { getContentToken: getInitContentToken } = useContentData(
    'features.EntityTypeForm'
  );
  const orgTypesFormFields = formSchema?.form?.filter(
    (field: any) => field.name === 'organizationType'
  )[0];
  const countryFormFields = formSchema?.form?.filter(
    (field: any) => field.name === 'countryOfFormation'
  )[0];

  useEffect(() => {
    buildStepper(['Init']);
  }, []);

  useEffect(() => {
    if (yupSchema) {
      updateSchema(yupSchema);
    } else {
      updateSchema(initSchema);
    }
  }, [yupSchema]);

  //TODO: Should be API driven, and token Content?
  // TODO: Turn this into a seperate UX Component
  useEffect(() => {
    if (!orgTypesFormFields?.optionsList) {
      orgTypesFormFields.optionsList = [
        { value: 'SOLE_PROPRIETORSHIP', label: 'Sole Proprietorship' },
        {
          value: 'LIMITED_LIABILITY_COMPANY',
          label: 'Limited Liability Company',
        },
        { value: 'S_CORPORATION', label: 'S Corporation' },
        { value: 'C_CORPORATION', label: 'C Corporation' },
        {
          value: 'UNINCORPORATED_ASSOCIATION',
          label: 'Unincorporate Association',
        },
        { value: 'PARTNERSHIP', label: 'Partnership' },
        { value: 'PUBLICLY_TRADED_COMPANY', label: 'Publicly Traded Company' },
        { value: 'NON_PROFIT_CORPORATION', label: 'Non Profit Corporation' },
        { value: 'GOVERNMENT_ENTITY', label: 'Government Entity' },
      ];

      setUpdate(blank + 1);
    }

    if (!countryFormFields?.optionsList) {
      countryFormFields.optionsList = [
        { value: 'US', label: 'US' },
        { value: 'Canada', label: 'Canada' },
        { value: 'UK', label: 'UK' },
      ];

      setUpdate(blank + 1);
    }

    if (jurisdictions) {
      countryFormFields.defaultValue = jurisdictions;
      form.setValue('countryOfFormation', jurisdictions);
      setUpdate(blank + 1);
    }

    if (entityType) {
      orgTypesFormFields.defaultValue = entityType;
      form.setValue('organizationType', entityType);
      setUpdate(blank + 1);
    }
  }, [orgTypesFormFields, countryFormFields, entityType, jurisdictions]);

  const onSubmit = useCallback(async () => {
    const errors = form?.formState?.errors;

    if (Object.keys(errors)?.length) {
      return;
    }
    setCurrentStep(activeStep + 1);
  }, [activeStep]);

  console.log('@@orm.getValues()', form.getValues());

  return (
    <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
      <Box className="eb-grid eb-grid-cols-2 eb-gap-4">
        <RenderForms
          {...{ formSchema: formSchema.form, getContentToken, form }}
        />
        <Card role="complementary" aria-live="polite">
          <CardContent className="eb-rounded eb-bg-slate-200">
            <Grid className="eb-flex eb-gap-2 eb-bg-slate-200 eb-p-5">
              <Text>{getInitContentToken('corpText')}</Text>
              <Text>{getInitContentToken('corpText1')}</Text>

              {form.getValues().organizationType === '' && (
                <Text>{getInitContentToken('corpText2')}</Text>
              )}

              {form.getValues().organizationType !== 'SOLE_PROPRIETORSHIP' &&
                form.getValues().organizationType !== '' && (
                  <>
                    <Text className="eb-font-bold">
                      {getInitContentToken('corpText3')}
                    </Text>

                    <Text className="eb-px-4">
                      <ul className="eb-list-disc">
                        {getInitContentToken('corpTextList')
                          .toString()
                          .split(',')
                          .map((val) => (
                            <li key={val}>{val}</li>
                          ))}
                      </ul>
                    </Text>
                  </>
                )}

              {form.getValues().organizationType === 'SOLE_PROPRIETORSHIP' && (
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
  );
};

InitStep.title = 'Init';
InitStep.contentData = 'BusinessDetailsStep';
InitStep.formSchema = initSchema;

export { InitStep };
