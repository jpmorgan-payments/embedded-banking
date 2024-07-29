import { useCallback, useEffect, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

import { useSmbdoUpdateParty } from '@/api/generated/embedded-banking';
// import { useSmbdoPostClients } from '@/api/generated/embedded-banking';
import { Box, Separator, Stack, Title } from '@/components/ui';
import { useRootConfig } from '@/core/EBComponentsProvider/RootConfigProvider';
import { useFormSchema } from '@/core/OnboardingWizard/context/formProvider.contex';
import NavigationButtons from '@/core/OnboardingWizard/Stepper/NavigationButtons';
import { useStepper } from '@/core/OnboardingWizard/Stepper/useStepper';
import { useContentData } from '@/core/OnboardingWizard/utils/useContentData';

import { fromApiToForm } from '../../utils/fromApiToForm';
import { fromFormToOrgParty } from '../../utils/fromFormToApi';
import { useGetDataByClientId } from '../hooks';
import { businessSchema } from '../StepsSchema';
import { getOrg, getOrgDetails } from '../utils/getOrgDetails';
// eslint-disable-next-line
import { RenderForms } from '../utils/RenderForms';
import { updateFormValues } from '../utils/updateFormValues';

const OrganizationDetailsStep = ({ formSchema, yupSchema }: any) => {
  const form = useFormContext();
  const { getContentToken } = useContentData('steps.BusinessDetailsStep');
  const { isMock } = useRootConfig();
  const { data } = useGetDataByClientId('client');
  const clientDataForm = useMemo(() => {
    return data && fromApiToForm(data);
  }, [data]);
  const { mutateAsync: updateParty, isPending: updatePartyisPending } =
    useSmbdoUpdateParty();
  const { updateSchema } = useFormSchema();
  const { activeStep, setCurrentStep } = useStepper();

  const orgData = getOrg(clientDataForm);

  useEffect(() => {
    if (clientDataForm) {
      updateFormValues(getOrgDetails(clientDataForm), form.setValue);
    }
  }, [clientDataForm]);

  useEffect(() => {
    updateSchema(yupSchema);
  }, [yupSchema]);

  const onSubmit = useCallback(async () => {
    const dataParty = fromFormToOrgParty(form.getValues());
    try {
      if (!clientDataForm) {
        // await createController({
        //   id: clientId ?? '',
        //   data: {
        //     addParties: [
        //       {
        //         partyType: 'INDIVIDUAL',
        //         email: individualEmail,
        //         individualDetails: dataParty,
        //         roles: ['CONTROLLER', 'BENEFICIAL_OWNER'],
        //       },
        //     ],
        //   },
        // });
      } else {
        await updateParty({
          id: orgData.id ?? '',
          data: {
            email: orgData.email,
            organizationDetails: dataParty,
          },
        });
      }

      setCurrentStep(activeStep + 1);
    } catch (error) {
      if (isMock) {
        setCurrentStep(activeStep + 1);
      }
    }
  }, [activeStep]);

  return (
    <Stack className="eb-w-full ">
      <Title as="h2" className="eb-mb-4">
        Tell us about your organization
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
              className: `eb-space-y-2 eb-grid eb-grid-cols-3 eb-gap-4`,
            }}
          />
        </Box>
        <NavigationButtons
          setActiveStep={setCurrentStep}
          activeStep={activeStep}
          disabled={updatePartyisPending}
        />
      </form>
    </Stack>
  );
};

OrganizationDetailsStep.title = 'Organization';
OrganizationDetailsStep.contentData = 'BusinessDetailsStep';
OrganizationDetailsStep.formSchema = businessSchema;

export { OrganizationDetailsStep };
