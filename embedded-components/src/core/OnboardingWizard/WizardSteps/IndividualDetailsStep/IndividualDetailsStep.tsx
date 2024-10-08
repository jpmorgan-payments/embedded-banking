import { useEffect, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { useSmbdoUpdateClient } from '@/api/generated/smbdo';
import { Box, Separator, Stack, Title } from '@/components/ui';
import { useRootConfig } from '@/core/EBComponentsProvider/RootConfigProvider';
import { useFormSchema } from '@/core/OnboardingWizard/context/formProvider.context';
import NavigationButtons from '@/core/OnboardingWizard/Stepper/NavigationButtons';
import { useStepper } from '@/core/OnboardingWizard/Stepper/useStepper';
import { useContentData } from '@/core/OnboardingWizard/utils/useContentData';

import { useError } from '../../context/error.context';
import { fromApiToForm } from '../../utils/fromApiToForm';
import { fromFormToIndParty } from '../../utils/fromFormToApi';
import { useGetDataByClientId } from '../hooks';
import { individualSchema } from '../StepsSchema';
import {
  getIndividualByRole,
  getIndividualDetailsByRole,
} from '../utils/getIndividualDetailsByRole';
// eslint-disable-next-line
import { RenderForms } from '../utils/RenderForms';
import { updateFormValues } from '../utils/updateFormValues';

const IndividualDetailsStep = ({ formSchema, yupSchema }: any) => {
  const [jobTitle, setJobTitle] = useState({
    jobTitle: '',
  });
  const { getContentToken } = useContentData('steps.ControllerDetailsStep');
  const { clientId } = useRootConfig();
  const form = useFormContext();
  const { updateSchema } = useFormSchema();
  const { activeStep, setCurrentStep } = useStepper();
  const { setError, error: isError } = useError();

  const { data } = useGetDataByClientId();

  const { mutateAsync: updateController, isPending: createPartyIsPending } =
    useSmbdoUpdateClient();

  const clientDataForm = useMemo(() => {
    return data && fromApiToForm(data);
  }, [data]);

  const indController = getIndividualDetailsByRole(
    clientDataForm,
    'CONTROLLER'
  )?.[0];

  const indControllerData = getIndividualByRole(
    clientDataForm,
    'CONTROLLER'
  )?.[0];

  useEffect(() => {
    updateSchema(yupSchema);
  }, [yupSchema]);

  useEffect(() => {
    if (clientDataForm) {
      if (indController) {
        updateFormValues(indController, form.setValue);

        form.setValue('individualEmail', indController.email);
        form.setValue('jobTitle', indController.jobTitle);

        setJobTitle({
          jobTitle: indController.jobTitle,
        });
      }
    }
  }, [clientDataForm, indController]);

  useEffect(() => {
    if (jobTitle.jobTitle) {
      form.setValue('jobTitle', jobTitle.jobTitle);
    }
  }, [JSON.stringify(jobTitle)]);

  const onSubmit = async () => {
    const errors = form?.formState?.errors;

    if (!Object.values(errors).length) {
      const { individualEmail, ...indi } = form.getValues();
      const dataParty = fromFormToIndParty({ email: individualEmail, ...indi });

      try {
        if (!indController) {
          await updateController({
            id: clientId ?? '',
            data: {
              addParties: [
                {
                  partyType: 'INDIVIDUAL',
                  email: individualEmail,
                  individualDetails: dataParty,
                  roles: ['CONTROLLER'],
                },
              ],
            },
          });
        } else {
          await updateController({
            id: clientId ?? '',
            data: {
              addParties: [
                {
                  id: indControllerData?.id ?? '',
                  partyType: 'INDIVIDUAL',
                  email: individualEmail,
                  individualDetails: dataParty,
                },
              ],
            },
          });
        }

        setCurrentStep(activeStep + 1);
      } catch (error) {
        setError(true);
      }
    }
  };

  return (
    <Stack className="eb-w-full">
      <Title as="h2" className="eb-mb-4">
        Tell us about yourself
      </Title>
      <Separator className="eb-mb-4" />

      <form
        noValidate
        onSubmit={form.handleSubmit(onSubmit)}
        className="eb-w-full"
      >
        <Box className="eb-w-full">
          <RenderForms
            {...{
              formSchema: formSchema.form,
              getContentToken,
              form,
              className: `eb-space-y-2 eb-grid eb-grid-cols-3 eb-gap-4 `,
            }}
          />
        </Box>
        <NavigationButtons
          setActiveStep={setCurrentStep}
          activeStep={activeStep}
          disabled={createPartyIsPending || isError}
        />
      </form>
    </Stack>
  );
};

IndividualDetailsStep.title = 'Individual';
IndividualDetailsStep.contentData = 'controllerDetailsSchema';
IndividualDetailsStep.formSchema = individualSchema;

export { IndividualDetailsStep };
