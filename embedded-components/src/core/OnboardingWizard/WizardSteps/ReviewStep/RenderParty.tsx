import { get } from 'lodash';

import { PartyResponse } from '@/api/generated/smbdo.schemas';

const RenderParty = (
  party: PartyResponse,
  fields: { label: any; path: any; transformFunc?: any }[]
) => (
  <div key={party.id + (party?.partyType ?? '')} className="eb-mb-4 eb-p-4">
    <h2 className="eb-mb-4 eb-text-xl eb-font-bold">{party.partyType}</h2>
    <dl className="eb-ml-2 eb-space-y-2">
      {fields.map(({ label, path, transformFunc }) => {
        const value = get(party, path);
        if (value !== undefined && value !== null) {
          return (
            <div
              key={path}
              className="eb-flex eb-border-b eb-border-dotted eb-border-gray-300 sm:eb-justify-between"
            >
              <dt className="eb-w-1/3 sm:eb-mb-0">{label}:</dt>
              <dd className="sm:eb-w-2/3 sm:eb-pl-4">
                {transformFunc
                  ? transformFunc(value)
                  : typeof value === 'boolean'
                    ? value.toString()
                    : Array.isArray(value)
                      ? value.join(', ')
                      : value}
              </dd>
            </div>
          );
        }
        return null;
      })}
    </dl>
  </div>
);

export { RenderParty };
