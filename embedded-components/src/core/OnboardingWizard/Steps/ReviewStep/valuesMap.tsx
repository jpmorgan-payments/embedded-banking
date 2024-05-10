// @ts-nocheck
// eslint-disable-next-line import/no-unresolved
import { diff, IChange } from 'json-diff-ts';

import { EntityType, ValuesMapType } from '@/core/OnboardingWizard/utils/models';

// import { VerificationResponse } from '../../../../../generated-api-models';
// import { EntityType, OnboardingValues } from '../../models';
// import { BusinessOwnerFormValues } from '../BusinessOwnersStep/validationSchema';
// import { DecisionMakerFormValues } from '../DecisionMakersStep/validationSchema';

const formatPhone = (phone?: string) =>
  phone?.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
const formatEin = (ein?: string) => ein?.replace(/(\d{2})(\d{7})/, '$1-$2');
const formatSsn = (ssn?: string) =>
  ssn?.replace(/(\d{3})(\d{2})(\d{4})/, '$1-$2-$3');

export const valuesMap = (
  values: any, //OnboardingValues,
  initialValues?: any, //Partial<OnboardingValues>,
  verifications?: any[], //VerificationResponse[]
  entityType?: EntityType,
  getContentToken?: (val: string) => string
) => {
  const newValues = {
    owners: values.significantOwnership
      ? values.owners.map((owner, index) => {
          const ownerCopy = Object.assign({}, owner);
          if (!ownerCopy.id) {
            ownerCopy.id = `NEW_${index}`;
          }
          return ownerCopy;
        })
      : [],
    decisionMakers:
      entityType === 'Sole Proprietorship' ||
      values.decisionMakersExist === 'yes'
        ? values.decisionMakers.map((decisionMaker, index) => {
            const decisionMakerCopy = Object.assign({}, decisionMaker);
            if (!decisionMakerCopy.id) {
              decisionMakerCopy.id = `NEW_${index}`;
            }
            return decisionMakerCopy;
          })
        : [],
  };

  const diffArray = diff(
    initialValues,
    {
      ...values,
      owners: newValues.owners,
      decisionMakers: newValues.decisionMakers,
    },
    {
      owners: 'id',
      decisionMakers: 'id',
    }
  );

  const stringifyFieldValue = (
    value?: string | boolean | number | Date,
    emptyValue = 'N/A'
  ) => {
    if (typeof value === 'string') {
      if (value.length === 0) {
        return emptyValue;
      }
      return value;
    } else if (typeof value === 'boolean' || typeof value === 'number') {
      return String(value);
    } else if (value instanceof Date) {
      return value.toLocaleDateString();
    } else {
      return emptyValue;
    }
  };

  const generateDiff = (
    field: IChange,
    formatFn: (
      value?: string,
      valuesObject?: Partial<any>
    ) => string | undefined
  ) => {
    return formatFn(stringifyFieldValue(field.value), values);
    // const type = field.type;
    // return (
    //   <>
    //     {(type === 'REMOVE' || type === 'UPDATE') && (
    //       <Del>
    //         {formatFn(stringifyFieldValue(field.oldValue, ''), initialValues)}
    //       </Del>
    //     )}{' '}
    //     {(type === 'ADD' || type === 'UPDATE') && (
    //       <Ins>{formatFn(stringifyFieldValue(field.value), values)}</Ins>
    //     )}
    //   </>
    // );
  };

  const getFieldDiff = (
    fieldKey: keyof Omit<
      any,
      'owners' | 'decisionMakers' | 'verificationResponses'
    >,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    formatFn = (value?: string, valuesObject?: Partial<any>) => value
  ) => {
    const field = diffArray.find(
      (item) => item.key === fieldKey && item.type !== 'REMOVE'
    );

    if (!field) {
      return formatFn(stringifyFieldValue(values[fieldKey]), values);
    }
    return generateDiff(field, formatFn);
  };

  const getPersonsDiff = (personType: 'owners' | 'decisionMakers') => {
    const persons = diffArray.find((item) => item.key === personType);

    type PersonValues = any; //BusinessOwnerFormValues & DecisionMakerFormValues;

    const unchangedPersons = (
      diffArray.find((item) => item.key === personType)?.changes ?? []
    ).reduce<PersonValues[]>(
      (persons, change) => {
        if (change.type !== 'ADD') {
          return persons.filter((person) => person.id !== change.key);
        }
        return persons;
      },
      (newValues[personType] as PersonValues[]).filter(
        (person) => !person.id.startsWith('NEW')
      )
    );

    const unchangedPersonsChanges =
      unchangedPersons?.map(
        (person) =>
          ({ key: 'UNCHANGED', type: 'ADD', value: person }) as IChange
      ) ?? [];
    return (
      (persons?.changes ?? [])
        .concat(unchangedPersonsChanges)
        .filter((personDiff) => personDiff.type !== 'REMOVE')
        .map((personDiff) => {
          const personValues = (newValues[personType] as PersonValues[]).find(
            (person) => person.id === personDiff.key
          );

          const getPersonFieldDiff = (
            fieldKey: keyof PersonValues,
            formatFn = (value?: string) => value
          ) => {
            const originalValue = stringifyFieldValue(
              personDiff.value?.[fieldKey],
              'N/A'
            );

            if (personDiff.type === 'ADD') {
              if (personDiff.key === 'UNCHANGED' || originalValue === 'N/A') {
                return originalValue;
              }
              // return <Ins>{originalValue}</Ins>;
              return originalValue;
            } else if (personDiff.type === 'REMOVE') {
              if (originalValue === 'N/A') {
                return originalValue;
              }
              // return <Del>{originalValue}</Del>;
              return originalValue;
            }

            const field = personDiff.changes?.find(
              (item) => item.key === fieldKey && item.type !== 'REMOVE'
            );

            if (!field) {
              return formatFn(stringifyFieldValue(personValues?.[fieldKey]));
            }
            return generateDiff(field, formatFn);
          };

          const personName = (
            personValues
              ? [
                  personValues?.['firstName'],
                  personValues?.['middleName'],
                  personValues?.['lastName'],
                ]
              : [
                  personDiff.value?.['firstName'],
                  personDiff.value?.['middleName'],
                  personDiff.value?.['lastName'],
                ]
          )
            .filter(Boolean)
            .join(' ');

          // const personNameDiff = () => {
          //   switch (personDiff.type) {
          //     case 'ADD':
          //       if (personDiff.key !== 'UNCHANGED') {
          //         return <Ins>{personName}</Ins>;
          //       } else {
          //         return personName;
          //       }
          //     case 'REMOVE':
          //       return <Del>{personName}</Del>;
          //     default:
          //       return personName;
          //   }
          // };

          return {
            title: personName,
            // titleRightContent: statusBadges(
            //   personDiff.key === 'UNCHANGED' ? 'UNCHANGED' : personDiff.type,
            //   getContentToken,
            // ),
            subtitle:
              personType === 'owners'
                ? getContentToken?.(`subtitleBuss`) ?? ''
                : getContentToken?.(`subtitleDec`) ?? '',
            entries: [
              {
                label: getContentToken?.(`firstName`) ?? '',
                value: getPersonFieldDiff('firstName'),
              },
              {
                label: getContentToken?.(`middleName`) ?? '',
                value: getPersonFieldDiff('middleName'),
              },
              {
                label: getContentToken?.(`lastName`) ?? '',
                value: getPersonFieldDiff('lastName'),
              },
              {
                label: getContentToken?.(`jobTitle`) ?? '',
                value: getPersonFieldDiff('jobTitle'),
              },
              ...(personValues?.jobTitle === 'Other'
                ? [
                    {
                      label: getContentToken?.(`jobTitleDescription`) ?? '',
                      value: getPersonFieldDiff('jobTitleDescription'),
                    },
                  ]
                : []),
              {
                label: getContentToken?.(`email`) ?? '',
                value: getPersonFieldDiff('email'),
              },
              {
                label: getContentToken?.(`addressLine1`) ?? '',
                value: getPersonFieldDiff('addressLine1'),
              },
              {
                label: getContentToken?.(`addressLine2`) ?? '',
                value: getPersonFieldDiff('addressLine2'),
              },
              {
                label: getContentToken?.(`addressLine3`) ?? '',
                value: getPersonFieldDiff('addressLine3'),
              },
              {
                label: getContentToken?.(`city`) ?? '',
                value: getPersonFieldDiff('city'),
              },
              {
                label: getContentToken?.(`state`) ?? '',
                value: getPersonFieldDiff('state'),
              },
              {
                label: getContentToken?.(`zipCode`) ?? '',
                value: getPersonFieldDiff('zipCode'),
              },
              {
                label: getContentToken?.(`phone`) ?? '',
                value: getPersonFieldDiff('phone', formatPhone),
              },
              {
                label: getContentToken?.(`birthDate`) ?? '',
                value: getPersonFieldDiff('birthDate'),
              },
              ...(personType === 'owners'
                ? [
                    {
                      label: getContentToken?.(`ssn9`) ?? '',
                      value: getPersonFieldDiff('ssn9', formatSsn),
                    },
                  ]
                : []),
            ],
          };
        }) ?? []
    );
  };

  return (
    [
      {
        title: getContentToken?.(`title`) ?? '',
        entries: [
          {
            label: getContentToken?.(`legalStructure`) ?? '',
            value: getFieldDiff('legalStructure'),
          },
          {
            label:
              (entityType === 'Sole Proprietorship'
                ? getContentToken?.(`solePropBusinessName`)
                : getContentToken?.(`businessName`)) || '',
            value: getFieldDiff('businessName', (value, valuesObject) => {
              return entityType === 'Sole Proprietorship'
                ? [
                    valuesObject?.controllerFirstName,
                    valuesObject?.controllerMiddleName,
                    valuesObject?.controllerLastName,
                  ]
                    .filter(Boolean)
                    .join(' ')
                : value;
            }),
          },
          {
            label:
              (entityType === 'Sole Proprietorship'
                ? getContentToken?.(`solePropBusinessAliasName`)
                : getContentToken?.(`businessAliasName`)) || '',
            value: getFieldDiff('businessAliasName'),
          },
          {
            label: getContentToken?.(`businessEmail`) ?? '',
            value: getFieldDiff('businessEmail'),
          },
          {
            label: getContentToken?.(`country`) ?? '',
            value: 'United States',
          },
          {
            label: getContentToken?.(`yearOfFormation`) ?? '',
            value: getFieldDiff('yearOfFormation'),
          },
          {
            label:
              (entityType === 'Sole Proprietorship'
                ? getContentToken?.(`businessIdentification`)
                : getContentToken?.(`ein`)) || '',
            value:
              entityType === 'Sole Proprietorship'
                ? values.businessIdentification === 'ein'
                  ? getFieldDiff('ein', formatEin)
                  : getFieldDiff('controllerSsn9', formatSsn)
                : getFieldDiff('ein', formatEin),
          },
          {
            label: getContentToken?.(`website`) ?? '',
            value: getFieldDiff('website', (value, valuesObject) =>
              valuesObject?.websiteNotAvailable
                ? getContentToken?.(`notAvailable`) ?? ''
                : value
            ),
          },
          {
            label: getContentToken?.(`businessDescription`) ?? '',
            value: getFieldDiff('businessDescription'),
          },
          {
            label: getContentToken?.(`businessAddressLine1`) ?? '',
            value: getFieldDiff(
              'businessAddressLine1',
              (value, valuesObject) =>
                valuesObject?.businessAddressSameAsController
                  ? valuesObject?.controllerAddressLine1
                  : value
            ),
          },
          {
            label: getContentToken?.(`businessAddressLine2`) ?? '',
            value: getFieldDiff(
              'businessAddressLine2',
              (value, valuesObject) =>
                valuesObject?.businessAddressSameAsController
                  ? valuesObject?.controllerAddressLine2
                  : value
            ),
          },
          {
            label: getContentToken?.(`businessAddressLine3`) ?? '',
            value: getFieldDiff(
              'businessAddressLine3',
              (value, valuesObject) =>
                valuesObject?.businessAddressSameAsController
                  ? valuesObject?.controllerAddressLine3
                  : value
            ),
          },
          {
            label: getContentToken?.(`businessCity`) ?? '',
            value: getFieldDiff('businessCity', (value, valuesObject) =>
              valuesObject?.businessAddressSameAsController
                ? valuesObject?.controllerCity
                : value
            ),
          },
          {
            label: getContentToken?.(`businessState`) ?? '',
            value: getFieldDiff('businessState', (value, valuesObject) =>
              valuesObject?.businessAddressSameAsController
                ? valuesObject?.controllerState
                : value
            ),
          },
          {
            label: getContentToken?.(`businessZipCode`) ?? '',
            value: getFieldDiff('businessZipCode', (value, valuesObject) =>
              valuesObject?.businessAddressSameAsController
                ? valuesObject?.controllerZipCode
                : value
            ),
          },
          {
            label: getContentToken?.(`businessPhone`) ?? '',
            value: getFieldDiff('businessPhone', formatPhone),
          },
          {
            label: getContentToken?.(`industryCategory`) ?? '',
            value: getFieldDiff('industryCategory'),
          },
          {
            label: getContentToken?.(`industryType`) ?? '',
            value: getFieldDiff('industryType'),
          },
        ],
      },
      {
        title: [
          values.controllerFirstName,
          values.controllerMiddleName,
          values.controllerLastName,
        ]
          .filter(Boolean)
          .join(' '),
        // titleRightContent: diffArray.find(
        //   (change) => change.key.indexOf('controller') !== -1,
        // )
        //   ? statusBadges('UPDATE', getContentToken)
        //   : null,
        subtitle:
          values.controllerIsOwner === 'yes' ? (
            <>
              {getContentToken?.(`controllerIsOwner`) ?? ''}
              {getFieldDiff('controllerIsOwner', (value) =>
                value === 'yes'
                  ? getContentToken?.(`controllerIsOwnerBuss`) ?? ''
                  : ''
              )}
            </>
          ) : (
            getContentToken?.(`controllerIsOwner`) ?? ''
          ),
        entries: [
          {
            label: getContentToken?.(`controllerFirstName`) ?? '',
            value: getFieldDiff('controllerFirstName'),
          },
          {
            label: getContentToken?.(`controllerMiddleName`) ?? '',
            value: getFieldDiff('controllerMiddleName'),
          },
          {
            label: getContentToken?.(`controllerLastName`) ?? '',
            value: getFieldDiff('controllerLastName'),
          },
          {
            label: getContentToken?.(`controllerEmail`) ?? '',
            value: getFieldDiff('controllerEmail'),
          },
          {
            label: getContentToken?.(`controllerJobTitle`) ?? '',
            value: getFieldDiff('controllerJobTitle'),
          },
          ...(values.controllerJobTitle === 'Other'
            ? [
                {
                  label:
                    getContentToken?.(`controllerJobTitleDescription`) ?? '',
                  value: getFieldDiff('controllerJobTitleDescription'),
                },
              ]
            : []),
          {
            label: getContentToken?.(`controllerAddressLine1`) ?? '',
            value: getFieldDiff('controllerAddressLine1'),
          },
          {
            label: getContentToken?.(`controllerAddressLine2`) ?? '',
            value: getFieldDiff('controllerAddressLine2'),
          },
          {
            label: getContentToken?.(`controllerAddressLine3`) ?? '',
            value: getFieldDiff('controllerAddressLine3'),
          },
          {
            label: getContentToken?.(`controllerCity`) ?? '',
            value: getFieldDiff('controllerCity'),
          },
          {
            label: getContentToken?.(`controllerState`) ?? '',
            value: getFieldDiff('controllerState'),
          },
          {
            label: getContentToken?.(`controllerZipCode`) ?? '',
            value: getFieldDiff('controllerZipCode'),
          },
          {
            label: getContentToken?.(`controllerPhone`) ?? '',
            value: getFieldDiff('controllerPhone', formatPhone),
          },
          {
            label: getContentToken?.(`controllerBirthDate`) ?? '',
            value: getFieldDiff('controllerBirthDate'),
          },
          {
            label: getContentToken?.(`controllerSsn9`) ?? '',
            value: getFieldDiff('controllerSsn9', formatSsn),
          },
        ],
      },
    ] as ValuesMapType
  )
    .concat(getPersonsDiff('owners'))
    .concat(getPersonsDiff('decisionMakers'))
    .concat({
      title: 'Additional Info',
      entries:
        values.verificationResponses?.map(({ id, response }) => {
          const item: any | undefined = (verifications ?? []).find(
            (v) => v.verification?.id === id
          );
          const label = item?.verification?.label;
          const options =
            item?.response?.answerOptions?.reduce(
              (a, { id = '', label = '' }) => ({
                ...a,
                [id]: label,
              }),
              {}
            ) ?? {};
          return {
            label: label ?? '',
            value:
              typeof response === 'string'
                ? options[response] || response
                : response?.map((s = '') => options[s])?.join(', '),
          };
        }) ?? [],
    });
};
