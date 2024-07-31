import React from 'react';
import { AlertCircle } from 'lucide-react';

import { useSmbdoGetParty } from '@/api/generated/embedded-banking';
import { ClientResponse } from '@/api/generated/embedded-banking.schemas';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const MissingPartyFields = ({ partyId }: { partyId: string }) => {
  const { data: party } = useSmbdoGetParty(partyId);
  const partyValidationResponseFields = party?.validationResponse?.filter(
    (r) => r.validationStatus !== 'NEEDS_INFO'
  )?.[0]?.fields;

  if (!partyValidationResponseFields) {
    return null;
  }

  return (
    <div key={partyId} className="mt-2">
      <h4 className="eb-font-semibold">
        Missing fields for Party ID: {partyId}
      </h4>
      <ul className="eb-list-inside eb-list-disc">
        {partyValidationResponseFields.map((field, index) => (
          <li key={index}>
            {field.name}: {field.type}
          </li>
        ))}
      </ul>
    </div>
  );
};

const OutstandingKYCRequirements = ({
  clientData,
}: {
  clientData: ClientResponse;
}) => {
  const outstanding = clientData?.outstanding;

  return (
    <Alert variant="destructive" color="orange" className="eb-max-w-xl">
      <AlertCircle className="eb-h-4 eb-w-4" />
      <AlertTitle>Outstanding KYC Requirements</AlertTitle>
      <AlertDescription>
        <p>Please complete the following before initiating KYC:</p>

        {!!outstanding?.attestationDocumentIds?.length && (
          <div className="eb-mt-2">
            <h4 className="eb-font-semibold">Missing Attestations</h4>
            <ul className="eb-list-inside eb-list-disc">
              {outstanding.attestationDocumentIds.map((id) => (
                <li key={id}>Attestation Document ID: {id}</li>
              ))}
            </ul>
          </div>
        )}

        {!!outstanding?.documentRequestIds?.length && (
          <div className="eb-mt-2">
            <h4 className="eb-font-semibold">Missing Documents</h4>
            <ul className="eb-list-inside eb-list-disc">
              {outstanding.documentRequestIds.map((id) => (
                <li key={id}>Document Request ID: {id}</li>
              ))}
            </ul>
          </div>
        )}

        {!!outstanding?.questionIds?.length && (
          <div className="eb-mt-2">
            <h4 className="eb-font-semibold">Unanswered Questions</h4>
            <ul className="eb-list-inside eb-list-disc">
              {outstanding.questionIds.map((id) => (
                <li key={id}>Question ID: {id}</li>
              ))}
            </ul>
          </div>
        )}

        {!!outstanding?.partyIds?.length && (
          <div className="eb-mt-2">
            <h4 className="eb-font-semibold">Incomplete Party Information</h4>
            {outstanding.partyIds.map((partyId) => (
              <MissingPartyFields partyId={partyId} />
            ))}
          </div>
        )}

        {!!outstanding?.partyRoles?.length && (
          <div className="eb-mt-2">
            <h4 className="eb-font-semibold">Missing Parties</h4>
            <ul className="eb-list-inside eb-list-disc">
              {outstanding.partyRoles.map((role) => (
                <li key={role}>Missing party with role: {role}</li>
              ))}
            </ul>
          </div>
        )}
      </AlertDescription>
    </Alert>
  );
};

export default OutstandingKYCRequirements;
