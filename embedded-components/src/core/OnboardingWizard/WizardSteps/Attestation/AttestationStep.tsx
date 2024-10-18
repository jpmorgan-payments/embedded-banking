/* eslint react/prop-types: 0 */
import { useEffect, useState } from 'react';
import { IconExternalLink } from '@tabler/icons-react';
import { useFormContext } from 'react-hook-form';

import {
  useSmbdoDownloadDocument,
  useSmbdoGetDocumentDetail,
  useSmbdoPostClientVerifications,
  useSmbdoUpdateClient,
} from '@/api/generated/smbdo';
import {
  DocumentResponse,
  UpdateClientRequestSmbdo,
} from '@/api/generated/smbdo.schemas';
import { useToast } from '@/components/ui/use-toast';
import { Checkbox, Group, Label, Stack, Text, Title } from '@/components/ui';
import { useRootConfig } from '@/core/EBComponentsProvider/RootConfigProvider';

import { useIPAddress } from '../../hooks/getIPAddress';
import NavigationButtons from '../../Stepper/NavigationButtons';
// eslint-disable-next-line
import { useStepper } from '../../Stepper/useStepper';
import { useContentData } from '../../utils/useContentData';
import { useGetDataByClientId } from '../hooks';

const AttestationStep = () => {
  const { data: ip } = useIPAddress();
  const { toast } = useToast();
  const form = useFormContext();
  const [TAC, setTAC] = useState(false);

  const [termsAgreed, setTermsAgreed] = useState({
    useOfAccount: false,
    dataAccuracy: false,
    termsAndConditions: false,
  });

  const allTermsAgreed = Object.values(termsAgreed).every(Boolean);
  const canSubmit = allTermsAgreed && TAC;

  const handleTermsChange =
    (term: keyof typeof termsAgreed) => (checked: boolean) => {
      setTermsAgreed((prev) => ({ ...prev, [term]: checked }));
    };
  const { mutate: updateClientAttestation, status: clientStatus } =
    useSmbdoUpdateClient({
      mutation: {
        onSuccess: () => {},
        onError: () => {},
      },
    });
  const {
    mutate: postVerification,
    isError,
    data,
    isPending,
  }: any = useSmbdoPostClientVerifications({
    mutation: {
      onSuccess: () => {
        toast({
          title: 'Onboarding Complete',
          description: 'Attestation submitted. Thank you.',
        });
      },
      onError: () => {
        toast({
          variant: 'destructive',
          title: 'ERROR',
          description: 'Something went wrong. Please try again later.',
        });
      },
    },
  });

  const { clientId } = useRootConfig();
  const { setCurrentStep, activeStep } = useStepper();

  const [doc, setDocs] = useState<any>(null);
  const { data: clientData } = useGetDataByClientId();
  //TODO: we need to create a
  const { data: DocumentDetail } = useSmbdoGetDocumentDetail<DocumentResponse>(
    clientData?.outstanding.attestationDocumentIds?.[0] ?? ''
  );

  const termsAndConditionsDocId =
    DocumentDetail?.documentType === 'TERMS_CONDITIONS'
      ? DocumentDetail?.id
      : '';

  const { getContentToken } = useContentData('steps.VerificationsStep');

  const { data: disclosureAndConsentDoc } = useSmbdoDownloadDocument(
    termsAndConditionsDocId ?? ''
  );

  useEffect(() => {
    if (disclosureAndConsentDoc) {
      // @ts-ignore
      const newBlob = new Blob([disclosureAndConsentDoc], {
        type: 'application/pdf',
      });
      const urlBlob = URL.createObjectURL(newBlob);

      setDocs(urlBlob);
    }
  }, [disclosureAndConsentDoc]);

  useEffect(() => {
    if (TAC) {
      const { firstName, lastName } =
        clientData?.parties?.find((party) => party?.partyType === 'INDIVIDUAL')
          ?.individualDetails ?? {};

      updateClientAttestation({
        id: clientId ?? '',
        data: {
          addAttestations: clientData?.attestations?.concat({
            attestationTime: new Date().toISOString(),
            attesterFullName: `${firstName} ${lastName}`,
            ipAddress: ip || '1.1.1.1', // TODO: get IP address
            documentId: termsAndConditionsDocId, // TODO: get document id
          }),
        } as UpdateClientRequestSmbdo,
      });
    }
  }, [TAC]);

  const onSubmit = () => {
    postVerification({ id: clientId ?? '' });
  };

  return (
    <section>
      <Title as="h2">{getContentToken(`title`)}</Title>
      <Text>{getContentToken(`text`)}</Text>

      {isError && <>{JSON.stringify(data?.context[0]?.message)}</>}

      <Stack className="eb-mt-4 eb-pl-6">
        <ul className="eb-list-outside eb-space-y-2">
          <li>
            <Checkbox
              id="useOfAccount"
              checked={termsAgreed.useOfAccount}
              onCheckedChange={handleTermsChange('useOfAccount')}
              className="eb-mr-4 eb-mt-2"
            />
            <Label
              htmlFor="useOfAccount"
              className="eb-peer-disabled:eb-cursor-not-allowed eb-peer-disabled:eb-opacity-70 eb-text-sm eb-leading-none"
            >
              The Embedded Payment Account may only be used to receive funds
              through [the Platform] pursuant to [my Commerce Terms with the
              Platform] and I am appointing [the Platform] as my agent for the
              Account.
            </Label>
          </li>
          <li>
            <Checkbox
              id="dataAccuracy"
              checked={termsAgreed.dataAccuracy}
              onCheckedChange={handleTermsChange('dataAccuracy')}
              className="eb-mr-4 eb-mt-2"
            />
            <Label
              htmlFor="dataAccuracy"
              className="eb-peer-disabled:eb-cursor-not-allowed eb-peer-disabled:eb-opacity-70 eb-text-sm eb-leading-none"
            >
              The data I am providing is true, accurate, current and complete to
              the best of my knowledge.
            </Label>
          </li>
          <li>
            {doc && (
              <Group>
                <Checkbox
                  id="termsAndConditions"
                  checked={termsAgreed.termsAndConditions}
                  onCheckedChange={handleTermsChange('termsAndConditions')}
                  disabled={!TAC}
                  className="eb-mr-4 eb-mt-2"
                />
                I have read and agree to the &nbsp;
                <a
                  className={`eb-underline eb-decoration-primary eb-underline-offset-4 ${TAC && 'eb-decoration-transparent'}`}
                  href={doc}
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
                and the certifications directly above.
              </Group>
            )}
          </li>
        </ul>
        <p className="eb-ml-8 eb-text-sm eb-text-muted-foreground">
          Please open the documents links to enable the terms and conditions
          checkbox.
        </p>
      </Stack>

      <Text>{form.getValues().error}</Text>

      <NavigationButtons
        setActiveStep={setCurrentStep}
        activeStep={activeStep}
        disabled={!canSubmit || isPending || clientStatus !== 'success'}
        onSubmit={() => {
          onSubmit();
        }}
      >
        {!canSubmit
          ? 'Please agree to all terms and review all documents'
          : 'Submit'}
      </NavigationButtons>
    </section>
  );
};

AttestationStep.title = 'Attestation';

export { AttestationStep };
