import { useEffect, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

import {
  useSmbdoUpdateClient,
  useSmbdoUpdateParty,
} from '@/api/generated/embedded-banking';
import { Box, Separator, Stack, Title } from '@/components/ui';
import { useRootConfig } from '@/core/EBComponentsProvider/RootConfigProvider';
import { useFormSchema } from '@/core/OnboardingWizard/context/formProvider.contex';
import NavigationButtons from '@/core/OnboardingWizard/Stepper/NavigationButtons';
import { useStepper } from '@/core/OnboardingWizard/Stepper/useStepper';
import { useContentData } from '@/core/OnboardingWizard/utils/useContentData';

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

//TODO: when updating we need to make sure when we come back the data is actual
//TODO: Next step double called, so we skip step
const IndividualDetailsStep = ({ formSchema, yupSchema }: any) => {
  const { getContentToken } = useContentData('steps.ControllerDetailsStep');
  const { isMock, clientId } = useRootConfig();
  const form = useFormContext();
  const { updateSchema } = useFormSchema();
  const { activeStep, setCurrentStep } = useStepper();

  // const { getContentToken: ownerConter } = useContentData(
  //   'schema.businessOwnerFormSchema'
  // );

  const { data } = useGetDataByClientId('client');

  const { mutateAsync: updateParty, isPending: updatePartyisPending } =
    useSmbdoUpdateParty();
  const { mutateAsync: createController, isPending: createPartyisPending } =
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
    if (clientDataForm && !isMock) {
      if (indController) {
        updateFormValues(indController, form.setValue);
        form.setValue('individualEmail', indController.email);
      }
    }
  }, [clientDataForm, indController]);

  const onSubmit = async () => {
    const errors = form?.formState?.errors;

    if (!Object.values(errors).length) {
      const { individualEmail, ...indi } = form.getValues();
      const dataParty = fromFormToIndParty({ email: individualEmail, ...indi });

      try {
        if (!indController) {
          await createController({
            id: clientId ?? '',
            data: {
              addParties: [
                {
                  partyType: 'INDIVIDUAL',
                  email: individualEmail,
                  individualDetails: dataParty,
                  roles: ['CONTROLLER', 'BENEFICIAL_OWNER'],
                },
              ],
            },
          });
        } else {
          await updateParty({
            id: indControllerData.id ?? '',
            data: {
              email: individualEmail,
              individualDetails: dataParty,
            },
          });
        }

        setCurrentStep(activeStep + 1);
      } catch (error) {
        // if (isMock) {
        //   setCurrentStep(activeStep + 1);
        // }
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
          disabled={updatePartyisPending || createPartyisPending}
        />
      </form>
    </Stack>
  );
};
IndividualDetailsStep.title = 'Individual';
IndividualDetailsStep.contentData = 'controllerDetailsSchema';
IndividualDetailsStep.formSchema = individualSchema;

export { IndividualDetailsStep };
