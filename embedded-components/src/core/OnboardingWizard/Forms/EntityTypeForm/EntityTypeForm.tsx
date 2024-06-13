import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Box,
  Card,
  CardContent,
  Grid,
  RadioGroup,
  RadioGroupItem,
  Separator,
  Stack,
  Text,
  Title,
} from '@/components/ui';

// import { useOnboardingForm } from '../../context/form.context';
import { useContentData } from '../../utils/useContentData';

const EntityTypeForm = ({ form }: any) => {
  const { getContentToken } = useContentData('features.EntityTypeForm');

  // const { setOnboardingForm } = useOnboardingForm();

  return (
    <>
      <Grid className="eb-grid-flow-row eb-grid-cols-2 eb-gap-4 eb-pt-4">
        <FormField
          control={form.control}
          name="legalStructure"
          render={({ field }) => (
            <FormItem>
              <FormLabel
                aria-label={getContentToken(`radioLabelLegal`) as string}
                aria-live="polite"
                asterisk
              >
                {getContentToken(`radioLabelLegal`)}
              </FormLabel>

              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="eb-flex eb-flex-col eb-space-y-1"
                >
                  <FormItem className="eb-flex eb-flex-col  eb-space-x-3 eb-space-y-0">
                    <Box className="eb-flex">
                      <RadioGroupItem value="Corporation" />

                      <FormLabel
                        className="eb-pl-4 eb-font-normal"
                        aria-label={
                          getContentToken(`radioValueCorpLabel`) as string
                        }
                        aria-live="polite"
                      >
                        {getContentToken(`radioValueCorpLabel`)}
                      </FormLabel>
                    </Box>
                    <FormDescription className="eb-pl-6">
                      {getContentToken(`radioValueCorpDesc`)}
                    </FormDescription>
                  </FormItem>

                  <FormItem className="eb-flex eb-flex-col  eb-space-x-3 eb-space-y-0">
                    <Box className="eb-flex">
                      <RadioGroupItem value="Limited Liability Company" />

                      <FormLabel
                        className="eb-pl-4 eb-font-normal"
                        aria-label={
                          getContentToken(`radioValueLLCLabel`) as string
                        }
                        aria-live="polite"
                      >
                        {getContentToken(`radioValueLLCLabel`)}
                      </FormLabel>
                    </Box>
                    <FormDescription className="eb-pl-6">
                      {getContentToken(`radioValueLLCDesc`)}
                    </FormDescription>
                  </FormItem>
                  <FormItem className="eb-flex eb-flex-col  eb-space-x-3 eb-space-y-0">
                    <Box className="eb-flex">
                      <RadioGroupItem value="Limited Partnership" />

                      <FormLabel
                        className="eb-pl-4 eb-font-normal"
                        aria-label={
                          getContentToken(`radioValueLPLabel`) as string
                        }
                        aria-live="polite"
                      >
                        {getContentToken(`radioValueLPLabel`)}
                      </FormLabel>
                    </Box>
                    <FormDescription className="eb-pl-6">
                      {getContentToken(`radioValueLPDesc`)}
                    </FormDescription>
                  </FormItem>
                  <FormItem className="eb-flex eb-flex-col  eb-space-x-3 eb-space-y-0">
                    <Box className="eb-flex">
                      <RadioGroupItem value="Sole Proprietorship" />

                      <FormLabel
                        className="eb-pl-4 eb-font-normal"
                        aria-label={
                          getContentToken(`radioValueSOLELabel`) as string
                        }
                        aria-live="polite"
                      >
                        {getContentToken(`radioValueSOLELabel`)}
                      </FormLabel>
                    </Box>
                    <FormDescription className="eb-pl-6">
                      {getContentToken(`radioValueSOLEDesc`)}
                    </FormDescription>
                  </FormItem>
                </RadioGroup>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        {/* SIDE PANEL */}
        <Card role="complementary" aria-live="polite">
          <CardContent className="eb-rounded eb-bg-slate-200">
            <Grid className="eb-flex eb-gap-2 eb-bg-slate-200 eb-p-5">
              <Text>{getContentToken('corpText')}</Text>
              <Text>{getContentToken('corpText1')}</Text>

              {form.getValues().legalStructure === '' && (
                <Text>{getContentToken('corpText2')}</Text>
              )}

              {form.getValues().legalStructure !== 'Sole Proprietorship' &&
                form.getValues().legalStructure !== '' && (
                  <>
                    <Text className="eb-font-bold">
                      {getContentToken('corpText3')}
                    </Text>

                    <Text className="eb-px-4">
                      <ul className="eb-list-disc">
                        {getContentToken('corpTextList')
                          .toString()
                          .split(',')
                          .map((val) => (
                            <li key={val}>{val}</li>
                          ))}
                      </ul>
                    </Text>
                  </>
                )}

              {form.getValues().legalStructure === 'Sole Proprietorship' && (
                <>
                  <Text className="eb-font-bold">
                    {getContentToken(`soloText`)}
                  </Text>
                  <ul>
                    {(getContentToken(`soloListText`) as string)
                      .split(',')
                      .filter((i: string) => i)
                      .map((item: string) => {
                        return <li key={item}>{item}</li>;
                      })}
                  </ul>
                </>
              )}
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Separator className="eb-my-8" />

      {/* <Stack className="eb-gap-8">
        <Title as="h2"> {getContentToken(`titleQ`)}</Title>
        {form.getValues().legalStructure !== 'Sole Proprietorship' && (
          <FormField
            control={form.control}
            name="businessInSanctionedCountries"
            render={({ field }) => (
              <FormItem>
                <FormLabel asterisk>{getContentToken(`radioQLabel`)}</FormLabel>

                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="eb-flex eb-flex-row eb-space-y-1"
                  >
                    <FormItem className="eb-flex eb-items-center eb-space-x-3 eb-space-y-0">
                      <RadioGroupItem value="yes" />

                      <FormLabel className="eb-font-normal">
                        {getContentToken(`radioLabelYes`)}
                      </FormLabel>
                    </FormItem>
                    <FormItem className="eb-flex eb-items-center eb-space-x-3 eb-space-y-0">
                      <RadioGroupItem value="no" />

                      <FormLabel className="eb-font-normal">
                        {getContentToken(`radioLabelNo`)}
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>

                {form.getValues().businessInSanctionedCountries === 'yes' && (
                  <Text size="sm" className="eb-text-red-500">
                    {getContentToken(`alertMessageText`)}
                  </Text>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {form.getValues().legalStructure !== 'Sole Proprietorship' && (
          <FormField
            control={form.control}
            name="relatedToATM"
            render={({ field }) => (
              <FormItem>
                <FormLabel asterisk>
                  Do you identify as a provider, owner, and/or operator of
                  private ATM(s) and/or third Party ATM(s) activity?
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

                {form.getValues().relatedToATM === 'yes' && (
                  <Text size="sm" className="eb-text-red-500">
                    {getContentToken(`alertMessageText1`)}
                  </Text>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        )}

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

        <FormField
          control={form.control}
          name="significantOwnership"
          render={({ field }) => (
            <FormItem>
              <FormLabel
                asterisk
                aria-live="polite"
                aria-label={getContentToken(`radioIsBusLabel`) as string}
              >
                {getContentToken(`radioIsBusLabel`)}
              </FormLabel>

              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="eb-flex eb-flex-row eb-space-y-1"
                >
                  <FormItem className="eb-flex eb-items-center eb-space-x-3 eb-space-y-0">
                    <RadioGroupItem value="yes" />

                    <FormLabel
                      className="eb-font-normal"
                      aria-label={getContentToken(`radioLabelYes`) as string}
                    >
                      {getContentToken(`radioLabelYes`)}
                    </FormLabel>
                  </FormItem>
                  <FormItem className="eb-flex eb-items-center eb-space-x-3 eb-space-y-0">
                    <RadioGroupItem
                      value="no"
                      aria-label={getContentToken(`radioLabelNo`) as string}
                    />

                    <FormLabel className="eb-font-normal">
                      {getContentToken(`radioLabelNo`)}
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </Stack> */}
      <Separator className="eb-my-8" />
    </>
  );
};

export { EntityTypeForm };
