import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Grid } from '@/components/ui/grid';
import { Title } from '@/components/ui/title';
import { Input } from '@/components/ui/input';
import { useContentData } from '../../utils/useContentData';

const BusinessDetailsForm = ({ form }: any) => {
  const { getContentToken } = useContentData('steps.BusinessDetailsStep');
  return (
    <>
      <Title as="h2">{getContentToken(`detailsSectionTitle`)}</Title>
      <Grid
        className={`eb-gap-4 eb-pt-4 eb-grid-flow-row eb-mb-5  eb-grid-cols-2`}
      >
        <FormField
          control={form.control}
          name="businessName"
          render={({ field }) => (
            <FormItem>
              <FormLabel asterisk>
                {getContentToken(`businessName.label`)}
              </FormLabel>
              <FormControl>
                <Input {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="businessAliasName"
          render={({ field }) => (
            <FormItem>
              <FormLabel asterisk>
                {getContentToken(`businessAliasName.label`)}
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  required
                  placeholder={
                    getContentToken(`businessAliasName.placeholder`) as string
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ein"
          render={({ field }) => (
            <FormItem>
              <FormLabel asterisk>
                {getContentToken(`solePropBusinessIdentification.option.ein`)}
              </FormLabel>
              <FormControl>
                <Input {...field} required type="number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </Grid>
    </>
  );
};

export { BusinessDetailsForm as BusinessForm };