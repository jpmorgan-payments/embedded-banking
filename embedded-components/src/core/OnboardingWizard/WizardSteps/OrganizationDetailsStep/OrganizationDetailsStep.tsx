import { useCallback, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { useSmbdoGetClient, useSmbdoUpdateClient } from '@/api/generated/smbdo';
import { Box, Separator, Stack, Title } from '@/components/ui';
import { ServerAlertMessage } from '@/components/ux/ServerAlerts';
import { useRootConfig } from '@/core/EBComponentsProvider/RootConfigProvider';
import { useFormSchema } from '@/core/OnboardingWizard/context/formProvider.context';
import NavigationButtons from '@/core/OnboardingWizard/Stepper/NavigationButtons';
import { useStepper } from '@/core/OnboardingWizard/Stepper/useStepper';
import { useContentData } from '@/core/OnboardingWizard/utils/useContentData';

import { useError } from '../../context/error.context';
import { fromApiToForm } from '../../utils/fromApiToForm';
import { fromFormToOrgParty } from '../../utils/fromFormToApi';
import { businessSchema } from '../StepsSchema';
import { getOrg, getOrgDetails } from '../utils/getOrgDetails';
// eslint-disable-next-line
import { RenderForms } from '../utils/RenderForms';
import { updateFormValues } from '../utils/updateFormValues';

const OrganizationDetailsStep = ({ formSchema, yupSchema }: any) => {
  const form = useFormContext();
  const [orgCat, setOrgCatType] = useState({
    orgCategory: '',
    orgType: '',
  });
  const { getContentToken } = useContentData('steps.BusinessDetailsStep');
  const { clientId } = useRootConfig();
  const {
    data,
    isError: clientIsError,
    refetch: refetchClient,
  } = useSmbdoGetClient(clientId ?? '', {
    query: {
      enabled: !!clientId,
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  });
  const clientDataForm = data && fromApiToForm(data);

  const { mutateAsync: updateOrganization, isPending: createPartyIsPending } =
    useSmbdoUpdateClient();
  const { updateSchema } = useFormSchema();
  const { activeStep, setCurrentStep } = useStepper();
  const { setError, error: isError } = useError();

  const orgData = getOrg(clientDataForm);
  useEffect(() => {
    updateSchema(yupSchema);
  }, [yupSchema]);

  useEffect(() => {
    if (clientDataForm && clientId) {
      const orgDetail = getOrgDetails(clientDataForm);

      updateFormValues(orgDetail, form.setValue);
      form.setValue('industryCategory', orgDetail.industryCategory);
      form.setValue('industryType', orgDetail.industryType);
      setOrgCatType({
        orgCategory: orgDetail?.industryCategory,
        orgType: orgDetail?.industryType,
      });
    }
  }, [JSON.stringify(orgData), clientId]);

  useEffect(() => {
    if (orgCat.orgCategory) {
      form.setValue('industryCategory', orgCat.orgCategory);
    }
    if (orgCat.orgType) {
      form.setValue('industryType', orgCat.orgType);
    }
  }, [JSON.stringify(orgCat), JSON.stringify(orgCat)]);

  const onSubmit = useCallback(async () => {
    const dataParty = fromFormToOrgParty(form.getValues());

    try {
      await updateOrganization({
        id: clientId ?? '',
        data: {
          addParties: [
            {
              id: orgData?.id ?? '',
              partyType: 'ORGANIZATION',
              email: orgData.email,
              organizationDetails: dataParty,
            },
          ],
        },
      });

      setCurrentStep(activeStep + 1);
    } catch (error: any) {
      setError(true);
    }
  }, [activeStep]);

  return (
    <Stack className="eb-w-full">
      {clientIsError && <ServerAlertMessage tryAgainAction={refetchClient} />}

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
          disabled={createPartyIsPending || isError}
        />
      </form>
    </Stack>
  );
};

OrganizationDetailsStep.title = 'Organization';
OrganizationDetailsStep.contentData = 'BusinessDetailsStep';
OrganizationDetailsStep.formSchema = businessSchema;

export { OrganizationDetailsStep };
