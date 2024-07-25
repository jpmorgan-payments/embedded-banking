import { useCallback, useEffect, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

import { useSmbdoPostParties } from '@/api/generated/embedded-banking';
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
import { getIndividualDetailsByRole } from '../utils/getIndividualDetailsByRole';
// eslint-disable-next-line
import { RenderForms } from '../utils/RenderForms';
import { updateFormValues } from '../utils/updateFormValues';

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
  // const { mutateAsync: postClient, isPending: isPendingClientPost } =
  //   useSmbdoPostClients();
  const { mutateAsync: createParty, isPending: createPartyisPending } =
    useSmbdoPostParties();
  // const { mutateAsync: updateParty, isPending: updatePartyisPending } =
  //   useSmbdoUpdateParty();
  const clientDataForm = useMemo(() => {
    return data && fromApiToForm(data);
  }, [data]);

  useEffect(() => {
    updateSchema(yupSchema);
  }, [yupSchema]);

  useEffect(() => {
    if (clientDataForm && !isMock) {
      const indController = getIndividualDetailsByRole(
        clientDataForm,
        'CONTROLLER'
      )[0];

      updateFormValues(indController, form.setValue);
      form.setValue('individualEmail', indController.email);
    }
  }, [clientDataForm]);

  const onSubmit = useCallback(async () => {
    const errors = form?.formState?.errors;

    if (!Object.values(errors).length) {
      // TODO: update this
      // const apiForm = formToAPIBody(form.getValues());
      const {
        organizationName,
        countryOfFormation,
        businessEmail,
        organizationType,
        individualEmail,
        ...indi
      } = form.getValues();
      const dataParty = fromFormToIndParty({ email: individualEmail, ...indi });
      console.log(
        '@@dataParty',
        dataParty,
        '\n',
        form.getValues(),
        '>>>',
        clientId
      );

      try {
        await createParty({
          data: {
            partyType: 'INDIVIDUAL',
            email: individualEmail,
            roles: ['CONTROLLER'],
            individualDetails: dataParty,
          },
        });

        setCurrentStep(activeStep + 1);
      } catch (error) {
        console.log(error);
        if (isMock) {
          setCurrentStep(activeStep + 1);
        }
      }
    }
  }, [activeStep]);

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
          disabled={createPartyisPending}
        />
      </form>
    </Stack>
  );
};
IndividualDetailsStep.title = 'Individual';
IndividualDetailsStep.contentData = 'controllerDetailsSchema';
IndividualDetailsStep.formSchema = individualSchema;

export { IndividualDetailsStep };
