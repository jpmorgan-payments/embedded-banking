/* eslint react/prop-types: 0 */
import { useEffect, useState } from 'react';
import { IconExternalLink } from '@tabler/icons-react';
import { useFormContext } from 'react-hook-form';

import {
  useSmbdoDownloadDocument,
  useSmbdoGetAllDocumentDetails,
  // useSmbdoGetDocumentDetail,
  // useSmbdoGetDocumentRequest,
  // useSmbdoPostClientVerifications,
} from '@/api/generated/embedded-banking';
// import { ListDocumentsResponse } from '@/api/generated/embedded-banking.schemas';
import {
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
// import { fromApiToForm } from '../../utils/fromApiToForm';
import { useContentData } from '../../utils/useContentData';

// import { PdfDisplay } from './PdfDisplay';

const AttestationStep = () => {
  const form = useFormContext();
  const [TAC, setTAC] = useState(false);
  const [EDC, setEDC] = useState(false);

  // const { isMock } = useRootConfig();
  const { clientId } = useRootConfig();
  const { setCurrentStep, activeStep } = useStepper();
  const { onboardingForm }: any = useOnboardingForm();
  const [doc, setDocs] = useState<any>(null);
  const { data: verifications }: any = useSmbdoGetAllDocumentDetails({
    clientId: onboardingForm?.id || clientId,
  });

  // const { data: clientData } = useSmbdoGetClient(
  //   (clientId || onboardingForm?.id) as string
  // );

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

  // const [pdfLoaded, setPdfLoaded] = useState(false);

  const onSubmit = () => {
    console.log('@@onSubmit');
  };

  // const organizationType =
  //   clientDataForm?.onganizationDetails?.orgDetails?.organizationType;
  // const businessName =
  //   clientDataForm?.onganizationDetails?.orgDetails?.businessName;

  return (
    <section>
      <Title as="h2">{getContentToken(`title`)}</Title>
      <Text>{getContentToken(`text`)}</Text>

      {/* <PdfDisplay
        data-testid="pdf-display"
        // file={termsAndConditionsDoc}

        file={isMock ? '/asset/docs/terms.pdf' : termsAndConditionsDoc}
        onLoad={() => setPdfLoaded(true)}
        onScrolledToBottom={() => {
          if (pdfLoaded) {
            form.setValue('reviewedTerms', true);
          }
        }}
      /> */}

      {/* <Separator /> */}

      <>
        <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
          <Stack className="eb-mt-10">
            <FormField
              control={form.control}
              name="attestedAuthorized"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={() => {}}
                      disabled={!TAC || !EDC}
                    />
                  </FormControl>
                  <FormLabel className="eb-p-3">
                    By checking the box, I acknowledge and agree to the
                    following:
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Stack>

          <Separator />

          <Stack className="eb-mt-4 eb-pl-6">
            <ul className="eb-list-outside eb-list-[square] eb-space-y-6">
              <li>
                <Text>
                  The Embedded Payment Account may only be used to receive funds
                  through [the Platform] pursuant to [my Commerce Terms with the
                  Platform] and I am appointing [the Platform] as my agent for
                  the Account.
                </Text>
              </li>
              <li>
                <Text>
                  The data I am providing is true, accurate, current and
                  complete to the best of my knowledge.
                </Text>
              </li>
              <li>
                <Group>
                  I have read and agree to the &nbsp;
                  <a
                    className="eb-underline eb-decoration-primary eb-underline-offset-4"
                    href={doc ?? '/assets/docs/disclosure.pdf'}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => {
                      setTAC(true);
                    }}
                  >
                    <Group>
                      J.P. Morgan Embedded Payment Terms & Conditions,
                      <IconExternalLink size={12} />
                    </Group>
                  </a>
                  &nbsp;
                  <a
                    className="eb-underline eb-decoration-primary eb-underline-offset-4"
                    href={doc ?? '/assets/docs/disclosure.pdf'}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => {
                      setEDC(true);
                    }}
                  >
                    <Group>
                      the E-Sign Disclosure and Consent,
                      <IconExternalLink size={12} />
                    </Group>
                  </a>
                  and the certifications directly above.
                </Group>
              </li>
            </ul>
          </Stack>
          <Text>{form.getValues().error}</Text>
        </form>
      </>
      <NavigationButtons
        setActiveStep={setCurrentStep}
        activeStep={activeStep}
        disabled={!TAC || !EDC}
        // onSubmit={() => {
        //   // setActiveStep(activeStep + 1);
        // }}
        lastStep
      />
    </section>
  );
};

AttestationStep.title = 'Attestation';

export { AttestationStep };
