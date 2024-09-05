/* eslint-disable react/no-unescaped-entities */
import { FC, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { useSmbdoGetClient, useSmbdoUpdateClient } from '@/api/generated/smbdo';
import {
  PhoneSmbdoPhoneType,
  UpdateClientRequestSmbdo,
} from '@/api/generated/smbdo.schemas';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PhoneInput } from '@/components/ui/phone-input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useStepper } from '@/components/ui/stepper';
import { InfoPopover } from '@/components/ux/InfoPopover';

import { FormActions } from '../FormActions/FormActions';
import { FormLoadingState } from '../FormLoadingState/FormLoadingState';
import { useOnboardingContext } from '../OnboardingContextProvider/OnboardingContextProvider';
import { ServerErrorAlert } from '../ServerErrorAlert/ServerErrorAlert';
import {
  convertClientResponseToFormValues,
  generateRequestBody,
  setApiFormErrors,
  translateApiErrorsToFormErrors,
} from '../utils/formUtils';
import { OrganizationStepFormSchema } from './OrganizationStepForm.schema';

type AddressLinesProps = {
  control: any;
  addressIndex: number;
};

const AddressLines: FC<AddressLinesProps> = ({ control, addressIndex }) => {
  const {
    fields: addressLineFields,
    append: appendAddressLine,
    remove: removeAddressLine,
  } = useFieldArray({
    control,
    name: `addresses.${addressIndex}.addressLines`,
    rules: {
      maxLength: 5,
      minLength: 1,
    },
  });

  return (
    <>
      {addressLineFields.map((addressLineField, index) => (
        <FormField
          key={addressLineField.id}
          control={control}
          name={`addresses.${addressIndex}.addressLines.${index}`}
          render={({ field }) => (
            <FormItem>
              <div className="eb-flex eb-items-center eb-space-x-2">
                <FormLabel asterisk={index === 0}>
                  Address Line {index + 1}
                </FormLabel>
                {index === 0 && (
                  <InfoPopover>
                    The first line must not be a PO Box and must begin with a
                    number.
                  </InfoPopover>
                )}
              </div>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
      <div className="eb-grid eb-grid-cols-2 eb-gap-6">
        <Button
          type="button"
          variant="outline"
          onClick={() => appendAddressLine('')}
          disabled={addressLineFields.length >= 5}
        >
          Add Line
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => removeAddressLine(addressLineFields.length - 1)}
          disabled={addressLineFields.length <= 1}
        >
          Remove Line
        </Button>
      </div>
    </>
  );
};

export const OrganizationStepForm = () => {
  const { nextStep } = useStepper();
  const { clientId, onPostClientResponse } = useOnboardingContext();

  const form = useForm<z.infer<typeof OrganizationStepFormSchema>>({
    mode: 'onBlur',
    resolver: zodResolver(OrganizationStepFormSchema),
    defaultValues: {
      organizationName: '',
      dbaName: '',
      organizationDescription: '',
      organizationType: undefined,
      jurisdiction: '',
      countryOfFormation: '',
      addresses: [
        {
          addressType: 'BUSINESS_ADDRESS',
          addressLines: [''],
          city: '',
          postalCode: '',
          country: '',
        },
      ],
      organizationIds: [],
      phone: {
        phoneType: undefined,
        countryCode: '',
        phoneNumber: '',
      },
      entitiesInOwnership: false,
      tradeOverInternet: false,
      websiteAvailable: false,
      secondaryMccList: [],
      mcc: '',
      associatedCountries: [],
    },
  });

  const {
    fields: addressFields,
    append: appendAddress,
    remove: removeAddress,
  } = useFieldArray({
    control: form.control,
    name: 'addresses',
  });

  const {
    fields: organizationIdFields,
    append: appendOrganizationId,
    remove: removeOrganizationId,
  } = useFieldArray({
    control: form.control,
    name: 'organizationIds',
  });

  const {
    fields: associatedCountriesFields,
    append: appendAssociatedCountry,
    remove: removeAssociatedCountry,
  } = useFieldArray({
    control: form.control,
    name: 'associatedCountries',
  });

  const {
    fields: secondaryMccFields,
    append: appendSecondaryMcc,
    remove: removeSecondaryMcc,
  } = useFieldArray({
    control: form.control,
    name: 'secondaryMccList',
  });

  // Fetch client data
  const { data: clientData, status: getClientStatus } = useSmbdoGetClient(
    clientId ?? ''
  );

  // Get organization's partyId
  const partyId = clientData?.parties?.find(
    (party) => party.partyType === 'ORGANIZATION'
  )?.id;

  // Populate form with client data
  useEffect(() => {
    if (getClientStatus === 'success' && clientData) {
      const formValues = convertClientResponseToFormValues(clientData, partyId);
      console.log('formValues', formValues);
      form.reset(formValues);
    }
  }, [clientData, getClientStatus, form, partyId]);

  const {
    mutate: updateClient,
    error: updateClientError,
    status: updateClientStatus,
  } = useSmbdoUpdateClient({
    mutation: {
      onSettled: (data, error) => {
        onPostClientResponse?.(data, error?.response?.data);
      },
      onSuccess: () => {
        nextStep();
        toast.success("Client's organization details updated successfully");
      },
      onError: (error) => {
        if (error.response?.data?.context) {
          const { context } = error.response.data;
          const apiFormErrors = translateApiErrorsToFormErrors(
            context,
            0,
            'addParties'
          );
          setApiFormErrors(form, apiFormErrors);
        }
      },
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    if (clientId) {
      const requestBody = generateRequestBody(values, 0, 'addParties', {
        addParties: [
          {
            ...(partyId ? { id: partyId } : {}),
          },
        ],
      }) as UpdateClientRequestSmbdo;

      updateClient({
        id: clientId,
        data: requestBody,
      });
    }
  });

  if (updateClientStatus === 'pending') {
    return <FormLoadingState message="Submitting..." />;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={onSubmit}
        className="eb-grid eb-w-full eb-items-start eb-gap-6 eb-overflow-auto eb-p-4 eb-pt-0"
      >
        <div className="eb-grid eb-grid-cols-1 eb-gap-6 md:eb-grid-cols-2 lg:eb-grid-cols-3">
          <FormField
            control={form.control}
            name="organizationName"
            render={({ field }) => (
              <FormItem>
                <div className="eb-flex eb-items-center eb-space-x-2">
                  <FormLabel asterisk>Organization name</FormLabel>
                  <InfoPopover>
                    The organization's legal name. It is the official name of
                    the person or entity that owns a company. Must be the name
                    used on the legal party's government forms and business
                    paperwork.
                  </InfoPopover>
                </div>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dbaName"
            render={({ field }) => (
              <FormItem>
                <div className="eb-items-center eb-space-x-2">
                  <FormLabel>DBA (Doing Business As) name (optional)</FormLabel>
                </div>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel asterisk>Organization email</FormLabel>
                <FormControl>
                  <Input {...field} type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="organizationType"
            render={({ field }) => (
              <FormItem>
                <FormLabel asterisk>Organization type</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select organization type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="LIMITED_LIABILITY_COMPANY">
                      Limited Liability Company
                    </SelectItem>
                    <SelectItem value="C_CORPORATION">C Corporation</SelectItem>
                    <SelectItem value="S_CORPORATION">S Corporation</SelectItem>
                    <SelectItem value="PARTNERSHIP">Partnership</SelectItem>
                    <SelectItem value="PUBLICLY_TRADED_COMPANY">
                      Publicly Traded Company
                    </SelectItem>
                    <SelectItem value="NON_PROFIT_CORPORATION">
                      Non-Profit Corporation
                    </SelectItem>
                    <SelectItem value="GOVERNMENT_ENTITY">
                      Government Entity
                    </SelectItem>
                    <SelectItem value="SOLE_PROPRIETORSHIP">
                      Sole Proprietorship
                    </SelectItem>
                    <SelectItem value="UNINCORPORATED_ASSOCIATION">
                      Unincorporated Association
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="eb-flex eb-flex-wrap eb-gap-6 md:eb-flex-nowrap">
          <FormField
            control={form.control}
            name="jurisdiction"
            render={({ field }) => (
              <FormItem className="eb-grow md:eb-grow-0">
                <div className="eb-flex eb-items-center eb-space-x-2">
                  <FormLabel asterisk>Jurisdiction</FormLabel>
                  <InfoPopover>Country code in ISO alpha-2 format.</InfoPopover>
                </div>
                <FormControl>
                  <Input {...field} maxLength={2} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="countryOfFormation"
            render={({ field }) => (
              <FormItem className="eb-grow md:eb-grow-0">
                <div className="eb-flex eb-items-center eb-space-x-2">
                  <FormLabel asterisk>Country of formation</FormLabel>
                  <InfoPopover>Country code in ISO alpha-2 format.</InfoPopover>
                </div>
                <FormControl>
                  <Input {...field} maxLength={2} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="yearOfFormation"
            render={({ field }) => (
              <FormItem className="eb-grow md:eb-grow-0">
                <div className="eb-flex eb-items-center eb-space-x-2">
                  <FormLabel asterisk>Year of formation</FormLabel>
                  <InfoPopover>Year of company formation.</InfoPopover>
                </div>
                <FormControl>
                  <Input {...field} maxLength={4} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <fieldset className="eb-grid eb-gap-6 eb-rounded-lg eb-border eb-p-4">
          <legend className="-eb-m-1 eb-px-1 eb-text-sm eb-font-medium">
            Organization Phone Information
          </legend>

          <div className="eb-grid eb-grid-cols-1 eb-gap-6 md:eb-grid-cols-2">
            <FormField
              control={form.control}
              name="phone.phoneType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Type</FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value);
                      form.setValue('phone', {
                        ...form.getValues().phone,
                        phoneType: value as PhoneSmbdoPhoneType,
                      });
                    }}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select phone type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="BUSINESS_PHONE">
                        Business Phone
                      </SelectItem>
                      <SelectItem value="MOBILE_PHONE">Mobile Phone</SelectItem>
                      <SelectItem value="ALTERNATE_PHONE">
                        Alternate Phone
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <PhoneInput
                      {...field}
                      countries={['US']}
                      placeholder="Enter phone number"
                      international={false}
                      defaultCountry="US"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </fieldset>
        <fieldset className="eb-grid eb-gap-6 eb-rounded-lg eb-border eb-p-4">
          <legend className="-eb-m-1 eb-px-1 eb-text-sm eb-font-medium">
            Industry Information
          </legend>

          <div className="eb-grid eb-grid-cols-1 eb-gap-6 sm:eb-grid-cols-2">
            <FormField
              control={form.control}
              name="industryCategory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Industry Category</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="industryType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Industry Type</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="eb-flex">
            <FormField
              control={form.control}
              name="mcc"
              render={({ field }) => (
                <FormItem className="eb-grow sm:eb-grow-0">
                  <div className="eb-flex eb-items-center eb-space-x-2">
                    <FormLabel>Merchant Category Code (MCC)</FormLabel>
                    <InfoPopover>
                      Leave empty or enter exactly 4 digits for the MCC.
                    </InfoPopover>
                  </div>
                  <FormControl>
                    <Input
                      {...field}
                      maxLength={4}
                      placeholder="Enter 4-digit MCC (optional)"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </fieldset>
        <div>
          <FormField
            control={form.control}
            name="entitiesInOwnership"
            render={({ field }) => (
              <FormItem className="eb-flex eb-flex-row eb-items-start eb-space-x-3 eb-space-y-0 eb-rounded-md eb-border eb-p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="eb-space-y-1 eb-leading-none">
                  <FormLabel>Entities in Ownership</FormLabel>
                  <FormDescription>
                    Indicate if one or more businesses own part of the business
                    connected to the client.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tradeOverInternet"
            render={({ field }) => (
              <FormItem className="eb-flex eb-flex-row eb-items-start eb-space-x-3 eb-space-y-0 eb-rounded-md eb-border eb-p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="eb-space-y-1 eb-leading-none">
                  <FormLabel>Trade Over Internet</FormLabel>
                  <FormDescription>
                    Indicate if the business conducts trade over the internet.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
        </div>

        {/* Addresses */}
        <div className="eb-space-y-4">
          <h3 className="eb-text-lg eb-font-medium">Addresses</h3>
          <div className="eb-grid eb-grid-cols-1 eb-gap-6 md:eb-grid-cols-2 lg:eb-grid-cols-3 xl:eb-grid-cols-4">
            {addressFields.map((fieldItem, index) => (
              <fieldset
                key={fieldItem.id}
                className="eb-grid eb-gap-6 eb-rounded-lg eb-border eb-p-4"
              >
                <legend className="-eb-m-1 eb-px-1 eb-text-sm eb-font-medium">
                  Address {index + 1}
                </legend>
                <FormField
                  control={form.control}
                  name={`addresses.${index}.addressType`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select address type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="LEGAL_ADDRESS">
                            Legal Address
                          </SelectItem>
                          <SelectItem value="MAILING_ADDRESS">
                            Mailing Address
                          </SelectItem>
                          <SelectItem value="BUSINESS_ADDRESS">
                            Business Address
                          </SelectItem>
                          <SelectItem value="RESIDENTIAL_ADDRESS">
                            Residential Address
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <AddressLines control={form.control} addressIndex={index} />

                <div className="eb-grid eb-grid-cols-1 eb-gap-6 sm:eb-grid-cols-2">
                  <FormField
                    control={form.control}
                    name={`addresses.${index}.city`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter city" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`addresses.${index}.state`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter state" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`addresses.${index}.postalCode`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Postal Code</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter postal code" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`addresses.${index}.country`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            maxLength={2}
                            placeholder="e.g., US"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  type="button"
                  onClick={() => removeAddress(index)}
                  variant="outline"
                  size="sm"
                  className="eb-mt-2"
                >
                  Remove Address
                </Button>
              </fieldset>
            ))}
            <Button
              type="button"
              onClick={() =>
                appendAddress({
                  addressType: 'BUSINESS_ADDRESS',
                  addressLines: [''],
                  city: '',
                  postalCode: '',
                  country: '',
                })
              }
              variant="outline"
              size="sm"
              className="eb-mt-2"
            >
              Add Address
            </Button>
          </div>
        </div>

        {/* Organization IDs */}
        <div className="eb-space-y-4">
          <h3 className="eb-text-lg eb-font-medium">Organization IDs</h3>
          {organizationIdFields.map((fieldItem, index) => (
            <div
              key={fieldItem.id}
              className="eb-space-y-4 eb-rounded-md eb-border eb-p-4"
            >
              <h4 className="eb-font-medium">Organization ID {index + 1}</h4>
              <div className="eb-grid eb-grid-cols-1 eb-gap-4 md:eb-grid-cols-2 lg:eb-grid-cols-3">
                <FormField
                  control={form.control}
                  name={`organizationIds.${index}.idType`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ID Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select ID type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="EIN">EIN</SelectItem>
                          <SelectItem value="BUSINESS_REGISTRATION_ID">
                            Business Registration ID
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`organizationIds.${index}.value`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ID Value</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter ID value" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`organizationIds.${index}.issuer`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Issuer</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter issuer" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`organizationIds.${index}.expiryDate`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expiry Date</FormLabel>
                      <FormControl>
                        <Input {...field} type="date" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`organizationIds.${index}.description`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter description (optional)"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="button"
                onClick={() => removeOrganizationId(index)}
                variant="outline"
                size="sm"
                className="eb-mt-2"
              >
                Remove Organization ID
              </Button>
            </div>
          ))}
          <Button
            type="button"
            onClick={() =>
              appendOrganizationId({ idType: 'EIN', value: '', issuer: '' })
            }
            variant="outline"
            size="sm"
          >
            Add Organization ID
          </Button>
        </div>

        {/* Associated Countries */}
        <div className="eb-space-y-4">
          <h3 className="eb-text-lg eb-font-medium">Associated Countries</h3>
          {associatedCountriesFields.map((fieldItem, index) => (
            <div
              key={fieldItem.id}
              className="eb-flex eb-items-center eb-space-x-2"
            >
              <FormField
                control={form.control}
                name={`associatedCountries.${index}.country`}
                render={({ field }) => (
                  <FormItem className="eb-grow">
                    <FormControl>
                      <Input
                        {...field}
                        maxLength={2}
                        placeholder="Country code (e.g., US)"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                onClick={() => removeAssociatedCountry(index)}
                variant="outline"
                size="sm"
              >
                Remove
              </Button>
            </div>
          ))}
          <Button
            type="button"
            onClick={() => appendAssociatedCountry({ country: '' })}
            variant="outline"
            size="sm"
          >
            Add Associated Country
          </Button>
        </div>

        {/* Secondary MCC */}
        <div className="eb-space-y-4">
          <h3 className="eb-text-lg eb-font-medium">Secondary MCC</h3>
          {secondaryMccFields.map((fieldItem, index) => (
            <div
              key={fieldItem.id}
              className="eb-flex eb-items-center eb-space-x-2"
            >
              <FormField
                control={form.control}
                name={`secondaryMccList.${index}.mcc`}
                render={({ field }) => (
                  <FormItem className="eb-grow">
                    <FormControl>
                      <Input
                        {...field}
                        maxLength={4}
                        placeholder="Secondary MCC"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                onClick={() => removeSecondaryMcc(index)}
                variant="outline"
                size="sm"
              >
                Remove
              </Button>
            </div>
          ))}
          <Button
            type="button"
            onClick={() => appendSecondaryMcc({ mcc: '' })}
            variant="outline"
            size="sm"
          >
            Add Secondary MCC
          </Button>
        </div>

        {/* Additional Fields */}
        <div className="eb-grid eb-grid-cols-1 eb-gap-6 md:eb-grid-cols-2 lg:eb-grid-cols-3">
          <FormField
            control={form.control}
            name="websiteAvailable"
            render={({ field }) => (
              <FormItem className="eb-flex eb-flex-row eb-items-start eb-space-x-3 eb-space-y-0 eb-rounded-md eb-border eb-p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="eb-space-y-1 eb-leading-none">
                  <FormLabel>Website Available</FormLabel>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <Input {...field} type="url" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <ServerErrorAlert error={updateClientError} />
        <FormActions />
      </form>
    </Form>
  );
};
