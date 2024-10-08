import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { useSmbdoPostClients } from '@/api/generated/smbdo';
import { Box, Card, CardContent, Stack, Text, Title } from '@/components/ui';
import { useRootConfig } from '@/core/EBComponentsProvider/RootConfigProvider';
import { useFormSchema } from '@/core/OnboardingWizard/context/formProvider.context';
import { useStepper } from '@/core/OnboardingWizard/Stepper/Stepper';
import { useContentData } from '@/core/OnboardingWizard/utils/useContentData';

import { useError } from '../../context/error.context';
import NavigationButtons from '../../Stepper/NavigationButtons';
import { introSchema } from '../StepsSchema';
// eslint-disable-next-line
import { RenderForms } from '../utils/RenderForms';

const IntroStep = ({ formSchema, yupSchema }: any) => {
  const { setError, error: isError } = useError();
  const {
    jurisdictions,
    entityType,
    onGetClientsConfirmation,
    setClientId,
    setPartyId,
  } = useRootConfig();
  const form = useFormContext();
  const { updateSchema } = useFormSchema();
  const { activeStep, setCurrentStep } = useStepper();

  const { getContentToken } = useContentData('steps.BusinessDetailsStep');
  const { getContentToken: getInitContentToken } = useContentData(
    'features.EntityTypeForm'
  );

  useEffect(() => {
    if (yupSchema) {
      updateSchema(yupSchema);
    } else {
      updateSchema(introSchema);
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

  const { mutateAsync: postClient, status: postClientStatus } =
    useSmbdoPostClients({
      mutation: {
        onError: (error) => {
          setError(error);
        },
      },
    });

  const onSubmit = async () => {
    const {
      organizationName,
      organizationType,
      businessEmail,
      countryOfFormation,
    } = form.getValues();
    await postClient({
      data: {
        parties: [
          {
            partyType: 'ORGANIZATION',
            email: businessEmail,
            roles: ['CLIENT'],
            organizationDetails: {
              organizationName,
              organizationType,
              countryOfFormation,
            },
          },
        ],
        products: ['EMBEDDED_PAYMENTS'],
      },
    }).then(async (clientResponse) => {
      onGetClientsConfirmation?.({
        clientId: clientResponse?.id,
        clientResponse,
      });
      setClientId(clientResponse.id);
      setPartyId(clientResponse.partyId);
      setCurrentStep(activeStep);
    });
  };

  return (
    <Stack>
      <Title as="h2" className="eb-mb-4">
        {getInitContentToken(`title`)}
      </Title>
      <Box>
        <form
          noValidate
          onSubmit={form.handleSubmit(onSubmit)}
          className="eb-w-full"
        >
          <Box className="eb-grid eb-grid-cols-2 eb-gap-4">
            <RenderForms
              {...{
                formSchema: formSchema.form,
                getContentToken,
                form,
                className: `eb-space-y-2`,
              }}
            />
            <Card
              role="complementary"
              aria-live="polite"
              className="eb-rounded eb-bg-slate-100"
            >
              <CardContent>
                <div className="eb-flex eb-flex-col eb-gap-2 eb-p-2">
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
                            .map((val: any) => (
                              <li key={val}>
                                <Text>{val}</Text>
                              </li>
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
                            return (
                              <li key={item}>
                                <Text>{item}</Text>
                              </li>
                            );
                          })}
                      </ul>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </Box>
          <NavigationButtons
            setActiveStep={setCurrentStep}
            activeStep={activeStep}
            disabled={postClientStatus === 'pending' || isError}
          />
        </form>
      </Box>
    </Stack>
  );
};

IntroStep.title = 'Intro';
IntroStep.contentData = 'BusinessDetailsStep';
IntroStep.formSchema = introSchema;

export { IntroStep };
