/* eslint-disable react/no-unescaped-entities */
import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import {
  useSmbdoGetClient,
  useSmbdoUpdateClient,
} from '@/api/generated/embedded-banking';
import { UpdateClientRequestSmbdo } from '@/api/generated/embedded-banking.schemas';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useStepper } from '@/components/ui/stepper';

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

export const OrganizationStepForm = () => {
  const { nextStep } = useStepper();
  const { clientId, onPostClientResponse } = useOnboardingContext();

  const form = useForm<z.infer<typeof OrganizationStepFormSchema>>({
    mode: 'onChange',
    resolver: zodResolver(OrganizationStepFormSchema),
    defaultValues: {
      organizationName: '',
      organizationType: 'C_CORPORATION',
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
      phone: { phoneType: 'BUSINESS_PHONE', countryCode: '', phoneNumber: '' },
      entitiesInOwnership: false,
      significantOwnership: false,
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
      <form onSubmit={onSubmit} className="eb-space-y-6">
        <div className="eb-grid eb-grid-cols-1 eb-gap-6 md:eb-grid-cols-2 lg:eb-grid-cols-3">
          <FormField
            control={form.control}
            name="organizationName"
            render={({ field }) => (
              <FormItem>
                <FormLabel asterisk>Organization name</FormLabel>
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
                <FormLabel asterisk>Doing Business As (DBA) Name</FormLabel>
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
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

          {/* Phone Information */}
          <Card className="eb-mt-6">
            <CardHeader>
              <CardTitle className="eb-text-lg eb-font-medium">
                Phone Information
              </CardTitle>
            </CardHeader>
            <CardContent className="eb-grid eb-grid-cols-1 eb-gap-4 md:eb-grid-cols-3">
              <FormField
                control={form.control}
                name="phone.phoneType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
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
                        <SelectItem value="MOBILE_PHONE">
                          Mobile Phone
                        </SelectItem>
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
                name="phone.countryCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country Code</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g. +1" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone.phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter phone number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <FormField
            control={form.control}
            name="jurisdiction"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jurisdiction</FormLabel>
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
              <FormItem>
                <FormLabel asterisk>Country of formation</FormLabel>
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
              <FormItem>
                <FormLabel asterisk>Year of formation</FormLabel>
                <FormControl>
                  <Input {...field} maxLength={4} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mcc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Merchant Category Code (MCC)</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    maxLength={4}
                    placeholder="Enter 4-digit MCC (optional)"
                  />
                </FormControl>
                <FormDescription>
                  Leave empty or enter exactly 4 digits for the MCC.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="significantOwnership"
            render={({ field }) => (
              <FormItem className="eb-flex eb-flex-row eb-items-start eb-space-x-3 eb-space-y-0 eb-rounded-md eb-border eb-p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="eb-space-y-1 eb-leading-none">
                  <FormLabel>Significant Ownership</FormLabel>
                  <FormDescription>
                    Indicate if there are individuals who own 25% or more of the
                    client's business.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />

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
          {addressFields.map((fieldItem, index) => (
            <div
              key={fieldItem.id}
              className="eb-space-y-4 eb-rounded-md eb-border eb-p-4"
            >
              <h4 className="eb-font-medium">Address {index + 1}</h4>
              <div className="eb-grid eb-grid-cols-1 eb-gap-4 md:eb-grid-cols-2 lg:eb-grid-cols-3">
                <FormField
                  control={form.control}
                  name={`addresses.${index}.addressType`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
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
                <FormField
                  control={form.control}
                  name={`addresses.${index}.addressLines.0`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address Line 1</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter address line 1" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
            </div>
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
          >
            Add Address
          </Button>
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
                  <FormItem className="eb-flex-grow">
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
                  <FormItem className="eb-flex-grow">
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
            name="phone.phoneType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
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
