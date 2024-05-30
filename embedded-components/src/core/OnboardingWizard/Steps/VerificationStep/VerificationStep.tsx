/* eslint react/prop-types: 0 */
import React, { useEffect, useState } from 'react';

import {
  useSmbdoDownloadDocument,
  useSmbdoGetAllDocumentDetails,
  useSmbdoGetDocumentDetail,
  useSmbdoGetDocumentRequest,
  useSmbdoPostClientVerifications,
} from '@/api/generated/embedded-banking';
// import { ListDocumentsResponse } from '@/api/generated/embedded-banking.schemas';
import { Separator, Text, Title } from '@/components/ui';

import { useOnboardingForm } from '../../context/form.context';
import NavigationButtons from '../../Stepper/NavigationButtons';
import { useContentData } from '../../utils/useContentData';
import { PdfDisplay } from './PdfDisplay';
import { verificationsStepSchema } from './validationSchema';

type VerificationsStepProps = {
  setActiveStep: any;
  activeStep: number;
};

const VerificationsStep = ({
  setActiveStep,
  activeStep,
}: VerificationsStepProps) => {
  const { setOnboardingForm, onboardingForm } = useOnboardingForm();
  const [docs, setDocs] = useState({});
  const { data: verifications }: any = useSmbdoGetAllDocumentDetails({
    clientId: onboardingForm.id,
  });

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
  console.log('@@document', onboardingForm);

  const { data: termsAndConditionsDoc, isError: termsIsError } =
    useSmbdoDownloadDocument(
      termsAndConditionsDocId || onboardingForm.attestations[0]
    );

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

  return (
    <section>
      <Title as="h2">{getContentToken(`title`)}</Title>
      <Text>{getContentToken(`text`)}</Text>
      <Title as="h3">{getContentToken(`title1`)}</Title>
      <PdfDisplay
        data-testid="pdf-display"
        // file={
        //   termsAndConditionsDoc ||
        //   (!termsAndConditionsDocId || termsIsError
        //     ? '/assets/docs/terms.pdf'
        //     : undefined)
        // }
        //TODO: why undefined err
        // @ts-ignore
        file={termsAndConditionsDoc}
        onLoad={() => setPdfLoaded(true)}
        onScrolledToBottom={() => {
          // if (pdfLoaded) {
          //   form.setFieldValue('reviewedTerms', true);
          // }
        }}
      />
      <Separator />
      <>
        {/*  <Group>
          <Text size="md">Trouble viewing the document, click here: </Text>
          <Anchor
            href={termsAndConditionsDoc ?? '/assets/docs/terms.pdf'}
            target="_blank"
            size={18}
            onClick={() => form.setFieldValue('reviewedTerms', true)}
          >
            <Group>
              <IconExternalLink size={18} />
              <Text> Terms and Conditions</Text>
            </Group>
          </Anchor>

          {form.values.reviewedTerms ? (
            <Badge color={theme.colors.teal[9]}>
              <Group>
                <IconCheck size={14} /> {getContentToken(`group`)}
              </Group>
            </Badge>
          ) : (
            <Badge color={theme.colors.red[9]}>
              <Group>
                <IconX size={14} /> {getContentToken(`groupX`)}
              </Group>
            </Badge>
          )}
        </Group>
        <Space h="xs" />
        <Text>{form.getInputProps('reviewedTerms').error}</Text>
        <Title as="h3">{getContentToken(`title2`)}</Title>
        <Group>
          <Anchor
            href={disclosureAndConsentDoc ?? '/assets/docs/disclosure.pdf'}
            target="_blank"
            size={18}
            onClick={() => form.setFieldValue('reviewedDisclosure', true)}
          >
            <Group>
              <IconExternalLink size={18} />
              {getContentToken(`anchor`)}
            </Group>
          </Anchor>

          {form.values.reviewedDisclosure ? (
            <Badge color={theme.colors.teal[9]}>
              <Group>
                <IconCheck size={14} /> {getContentToken(`badge`)}
              </Group>
            </Badge>
          ) : (
            <Badge color={theme.colors.red[9]}>
              <Group>
                <IconX size={14} /> {getContentToken(`badgeX`)}
              </Group>
            </Badge>
          )}
        </Group>
        <Text color={theme.colors.red[9]} size={12}>
          {form.getInputProps('reviewedDisclosure').error}
        </Text>

        <Stack mt="lg">
          <Input.Wrapper>
            <Checkbox
              label={
                <span>
                  {getContentToken(`attestedDataCorrectI`)}{' '}
                  <b>{controllerFullName}</b>
                  {getContentToken(`attestedDataCorrectDesc`)}
                </span>
              }
              {...form.getInputProps('attestedDataCorrect', {
                type: 'checkbox',
              })}
            />
          </Input.Wrapper>
          <Input.Wrapper>
            <Checkbox
              label={
                entityType === 'Sole Proprietorship' ? (
                  getContentToken(`solePropAttestationLabel`)
                ) : (
                  <span>
                    {getContentToken(`attestationLabelBeforeName`)}
                    <b>{form.values.businessName}</b>
                    {getContentToken(`attestationLabelAfterName`)}
                  </span>
                )
              }
              {...form.getInputProps('attestedAuthorized', {
                type: 'checkbox',
              })}
            />
          </Input.Wrapper>
          <Input.Wrapper>
            <Checkbox
              label={getContentToken(`attestedReadDocuments`)}
              {...form.getInputProps('attestedReadDocuments', {
                type: 'checkbox',
              })}
              disabled={
                !form.values.reviewedDisclosure || !form.values.reviewedTerms
              }
            />
          </Input.Wrapper>
        </Stack> */}
      </>
      <NavigationButtons
        setActiveStep={setActiveStep}
        activeStep={activeStep}
        onSubmit={() => {
          // setActiveStep(activeStep + 1);
        }}
      />
    </section>
  );
};

export { VerificationsStep };
