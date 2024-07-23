/* eslint react/prop-types: 0 */
import React, { useEffect, useMemo, useState } from 'react';
import {
  IconCheck,
  // IconClipboardCheck,
  // IconExternalLink,
  IconX,
} from '@tabler/icons-react';
import { useFormContext } from 'react-hook-form';

import {
  useSmbdoDownloadDocument,
  useSmbdoGetAllDocumentDetails,
  useSmbdoGetClient,
  // useSmbdoGetDocumentDetail,
  // useSmbdoGetDocumentRequest,
  // useSmbdoPostClientVerifications,
} from '@/api/generated/embedded-banking';
// import { ListDocumentsResponse } from '@/api/generated/embedded-banking.schemas';
import {
  Badge,
  Checkbox,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Group,
  Separator,
  Stack,
  Text,
  Title,
} from '@/components/ui';
import { useRootConfig } from '@/core/EBComponentsProvider/RootConfigProvider';
import { useOnboardingForm } from '@/core/OnboardingWizard/context/form.context';

import NavigationButtons from '../../Stepper/NavigationButtons';
// eslint-disable-next-line
import { useStepper } from '../../Stepper/useStepper';
import { fromApiToForm } from '../../utils/fromApiToForm';
import { useContentData } from '../../utils/useContentData';
import { PdfDisplay } from './PdfDisplay';

const AttestationStep = () => {
  const form = useFormContext();
  const { clientId } = useRootConfig();
  const { setCurrentStep, activeStep } = useStepper();
  const { onboardingForm }: any = useOnboardingForm();
  const [setDocs] = useState<any>(null);
  const { data: verifications }: any = useSmbdoGetAllDocumentDetails({
    clientId: onboardingForm?.id || clientId,
  });

  const { data: clientData } = useSmbdoGetClient(
    (clientId || onboardingForm?.id) as string
  );

  const clientDataForm = useMemo(() => {
    return clientData && fromApiToForm(clientData);
  }, [clientData]);

  // TODO: we need to list this?
  const termsAndConditionsDocId = verifications?.documentDetails?.find(
    (item: any) => item.documentType === 'TERMS_CONDITIONS'
  )?.id;
  // const disclosureAndConsentDocId = verifications?.documentDetails?.find(
  //   (item: any) => item.documentType === 'DISCLOSURE_AND_CONSENT'
  // )?.documentId;
  const { getContentToken } = useContentData('steps.VerificationsStep');

  // useEffect(() => {
  //   const fetch = async () => {
  //     const verifications: any = await mutateAsync({ id: onboardingForm.id });

  //     const termsAndConditionsDocId = verifications?.attestations?.find(
  //       (item: any) => item.documentType === 'TERMS_CONDITION'
  //     )?.documentId;
  //     const disclosureAndConsentDocId = verifications?.attestations?.find(
  //       (item: any) => item.documentType === 'DISCLOSURE_AND_CONSENT'
  //     )?.documentId;
  //     console.log('@@verifi', verifications);

  //     setDocs({
  //       termsAndConditionsDocId,
  //       disclosureAndConsentDocId,
  //     });
  //   };
  //   fetch();
  // }, []);

  const attestationID: string[] | undefined = onboardingForm?.attestations;
  const { data: termsAndConditionsDoc }: any =
    // TODO: We need to resolve the type undefined on attestionID
    useSmbdoDownloadDocument(
      (termsAndConditionsDocId || attestationID?.[0]) ?? ''
    );

  useEffect(() => {
    const newBlob = new Blob([termsAndConditionsDoc], {
      type: 'application/pdf',
    });
    const urlBlob = URL.createObjectURL(newBlob);

    setDocs(urlBlob);
  }, [termsAndConditionsDoc]);

  // const { data: disclosureAndConsentDoc } = useSmbdoDownloadDocument(
  //   disclosureAndConsentDocId
  // );

  const [pdfLoaded, setPdfLoaded] = useState(false);
  // console.log(
  //   '@@verifications',
  //   verifications,
  //   termsAndConditionsDoc,
  //   disclosureAndConsentDoc
  // );

  // const controllerFullName = [
  //   form.values.controllerFirstName,
  //   form.values.controllerMiddleName,
  //   form.values.controllerLastName,
  // ]
  //   .filter(Boolean)
  //   .join(' ');

  // useEffect(() => {
  //   form.setFieldValue('attestedDataCorrect', false);
  //   form.setFieldValue('attestedReadDocuments', false);
  //   form.setFieldValue('attestedAuthorized', false);
  // }, []);

  const onSubmit = () => {
    console.log('@@onSubmit');
  };

  const organizationType =
    clientDataForm?.onganizationDetails?.orgDetails?.organizationType;
  const businessName =
    clientDataForm?.onganizationDetails?.orgDetails?.businessName;

  return (
    <section>
      <Title as="h2">{getContentToken(`title`)}</Title>
      <Text>{getContentToken(`text`)}</Text>
      <Title as="h3">{getContentToken(`title1`)}</Title>

      <PdfDisplay
        data-testid="pdf-display"
        file={termsAndConditionsDoc}
        onLoad={() => setPdfLoaded(true)}
        onScrolledToBottom={() => {
          if (pdfLoaded) {
            form.setValue('reviewedTerms', true);
          }
        }}
      />

      <Separator />
      <>
        <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
          <Group>
            <Text size="md">Trouble viewing the document, click here: </Text>
            {/* TODO: Anchor component */}
            {/* <Anchor
              href={termsAndConditionsDoc ?? '/assets/docs/terms.pdf'}
              target="_blank"
              size={18}
              onClick={() => form.setFieldValue('reviewedTerms', true)}
            >
              <Group>
                <IconExternalLink size={18} />
                <Text> Terms and Conditions</Text>
              </Group>
            </Anchor> */}

            {form.getValues().reviewedTerms ? (
              <Badge>
                <Group>
                  <IconCheck size={14} /> {getContentToken(`group`)}
                </Group>
              </Badge>
            ) : (
              <Badge>
                <Group>
                  <IconX size={14} /> {getContentToken(`groupX`)}
                </Group>
              </Badge>
            )}
          </Group>
          <Separator />
          <Text>{form.getValues().error}</Text>
          <Title as="h3">{getContentToken(`title2`)}</Title>
          <Group>
            {/* <Anchor
              href={disclosureAndConsentDoc ?? '/assets/docs/disclosure.pdf'}
              target="_blank"
              size={18}
              onClick={() => form.setFieldValue('reviewedDisclosure', true)}
            >
              <Group>
                <IconExternalLink size={18} />
                {getContentToken(`anchor`)}
              </Group>
            </Anchor> */}

            {form.getValues().reviewedDisclosure ? (
              <Badge>
                <Group>
                  <IconCheck size={14} /> {getContentToken(`badge`)}
                </Group>
              </Badge>
            ) : (
              <Badge>
                <Group>
                  <IconX size={14} /> {getContentToken(`badgeX`)}
                </Group>
              </Badge>
            )}
          </Group>
          <Text>{form.getValues().error}</Text>

          <Stack>
            <FormField
              control={form.control}
              name="attestedAuthorized"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={() => {}}
                    />
                  </FormControl>
                  <FormLabel className="eb-p-3">
                    {organizationType === 'SOLE_PROPRIETORSHIP' ? (
                      getContentToken(`solePropAttestationLabel`)
                    ) : (
                      <span>
                        {getContentToken(`attestationLabelBeforeName`)}
                        <b>{businessName}</b>
                        {getContentToken(`attestationLabelAfterName`)}
                      </span>
                    )}
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="attestedReadDocuments"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={() => {}}
                      disabled={
                        !form.getValues().reviewedDisclosure ||
                        !form.getValues().reviewedTerms
                      }
                    />
                  </FormControl>
                  <FormLabel className="eb-p-3">
                    {getContentToken(`attestedReadDocuments`)}
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Stack>
        </form>
      </>
      <NavigationButtons
        setActiveStep={setCurrentStep}
        activeStep={activeStep}
        onSubmit={() => {
          // setActiveStep(activeStep + 1);
        }}
      />
    </section>
  );
};

AttestationStep.title = 'Attestation';

export { AttestationStep };
