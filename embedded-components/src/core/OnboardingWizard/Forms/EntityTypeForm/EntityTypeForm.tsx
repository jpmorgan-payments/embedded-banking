import { Card, CardContent } from '@/components/ui/card';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Grid } from '@/components/ui/grid';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Stack } from '@/components/ui/stack';
import { Text } from '@/components/ui/text';
import { Title } from '@/components/ui/title';
import { Checkbox } from '@/components/ui';

import { useOnboardingForm } from '../../context/form.context';
import { useContentData } from '../../utils/useContentData';
import { businessDetailsMock, controllerMock } from '../../mocks/reviewStep.mock';

const EntityTypeForm = ({ form }: any) => {
  const { getContentToken } = useContentData('features.EntityTypeForm');
  const { setOnboardingForm, onboardingForm } = useOnboardingForm();
  return (
    <>
      <Grid className="eb-gap-4 eb-pt-4 eb-grid-flow-row eb-grid-cols-2">
        <FormField
          control={form.control}
          name="legalStructure"
          render={({ field }) => (
            <FormItem>
              <FormLabel asterisk>
                {getContentToken(`radioLabelLegal`)}
              </FormLabel>

              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="eb-flex eb-flex-col eb-space-y-1"
                >
                  <FormItem className="eb-flex eb-items-center eb-space-x-3 eb-space-y-0">
                    <RadioGroupItem value="Corporation" />

                    <FormLabel className="eb-font-normal">
                      Business (Corporation)
                    </FormLabel>
                  </FormItem>
                  <FormItem className="eb-flex eb-items-center eb-space-x-3 eb-space-y-0">
                    <RadioGroupItem value="Limited Liability Company" />

                    <FormLabel className="eb-font-normal">
                      Business (LLC)
                    </FormLabel>
                  </FormItem>
                  <FormItem className="eb-flex eb-items-center eb-space-x-3 eb-space-y-0">
                    <RadioGroupItem value="Limited Partnership" />

                    <FormLabel className="eb-font-normal">
                      Business (LP)
                    </FormLabel>
                  </FormItem>
                  <FormItem className="eb-flex eb-items-center eb-space-x-3 eb-space-y-0">
                    <RadioGroupItem value="Sole Proprietorship" />

                    <FormLabel className="eb-font-normal">
                      Sole Proprietor
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Card>
          <CardContent>
            <Text size="lg">
              {getContentToken('corpText1')}
              The information we request from you will help us complete setting
              up your account. Please review and update any information that
              needs confirmation; and provide any additional information
              requested.
            </Text>
          </CardContent>
        </Card>
      </Grid>
      <Separator className="eb-my-8" />
      <Stack className="eb-gap-8">
        <Title as="h2">Additional Questions</Title>
        <FormField
          control={form.control}
          name="businessInSanctionedCountries"
          render={({ field }) => (
            <FormItem>
              <FormLabel asterisk>
                Do you have locations, sell goods or services, or have vendors
                or suppliers in countries or regions subject to comprehensive
                sanctions programs (Iran, North Korea, Cuba, Syria and the
                Crimea, Donetsk, Luhansk Regions of Ukraine), or work with
                Sanctioned Parties in Russia or Venezuela? *
              </FormLabel>

              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="eb-flex eb-flex-row eb-space-y-1"
                >
                  <FormItem className="eb-flex eb-items-center eb-space-x-3 eb-space-y-0">
                    <RadioGroupItem value="yes" />

                    <FormLabel className="eb-font-normal">Yes</FormLabel>
                  </FormItem>
                  <FormItem className="eb-flex eb-items-center eb-space-x-3 eb-space-y-0">
                    <RadioGroupItem value="no" />

                    <FormLabel className="eb-font-normal">No</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="relatedToATM"
          render={({ field }) => (
            <FormItem>
              <FormLabel asterisk>
                Do you identify as a provider, owner, and/or operator of private
                ATM(s) and/or third Party ATM(s) activity?
              </FormLabel>

              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="eb-flex eb-flex-row eb-space-y-1"
                >
                  <FormItem className="eb-flex eb-items-center eb-space-x-3 eb-space-y-0">
                    <RadioGroupItem value="yes" />

                    <FormLabel className="eb-font-normal">Yes</FormLabel>
                  </FormItem>
                  <FormItem className="eb-flex eb-items-center eb-space-x-3 eb-space-y-0">
                    <RadioGroupItem value="no" />

                    <FormLabel className="eb-font-normal">No</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        {form.getValues().legalStructure !== 'Sole Proprietorship' && (
          <FormField
            control={form.control}
            name="entitiesInOwnership"
            render={({ field }) => (
              <FormItem>
                <FormLabel asterisk>
                  Are there any entities (or non-individuals) in your ownership
                  hierarchy?
                </FormLabel>

                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="eb-flex eb-flex-row eb-space-y-1"
                  >
                    <FormItem className="eb-flex eb-items-center eb-space-x-3 eb-space-y-0">
                      <RadioGroupItem value="yes" />

                      <FormLabel className="eb-font-normal">Yes</FormLabel>
                    </FormItem>
                    <FormItem className="eb-flex eb-items-center eb-space-x-3 eb-space-y-0">
                      <RadioGroupItem value="no" />

                      <FormLabel className="eb-font-normal">No</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {form.getValues().legalStructure !== 'Sole Proprietorship' && (
          <FormField
            control={form.control}
            name="significantOwnership"
            render={({ field }) => (
              <FormItem>
                <FormLabel asterisk>
                  Are there any individuals who own 25% or more of your company?
                </FormLabel>

                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="eb-flex eb-flex-row eb-space-y-1"
                  >
                    <FormItem className="eb-flex eb-items-center eb-space-x-3 eb-space-y-0">
                      <RadioGroupItem value="yes" />

                      <FormLabel className="eb-font-normal">Yes</FormLabel>
                    </FormItem>
                    <FormItem className="eb-flex eb-items-center eb-space-x-3 eb-space-y-0">
                      <RadioGroupItem value="no" />

                      <FormLabel className="eb-font-normal">No</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="significantOwnership"
          render={({ field }) => (
            <FormItem>
              <FormLabel asterisk>Auto-fill forms with mock data</FormLabel>

              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(value) => {
                    if (value) {
                      setOnboardingForm({
                        businessDetails: businessDetailsMock,
                        controller: controllerMock,
                        id: '1000010400',
                        legalStructure: undefined,
                        decisionMakers: undefined,
                        outstandingItems: {
                          attestationDocumentIds: Array(1),
                          documentRequestIds: Array(0),
                          partyIds: Array(0),
                          partyRoles: Array(0),
                          questionIds: Array(3),
                        },
                        owner: controllerMock,
                      });
                    }
                  }}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </Stack>
      <Separator className="eb-my-8" />
    </>
  );
};

export { EntityTypeForm };
