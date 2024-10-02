import { useMemo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { DocumentTypeSmbdo } from '@/api/generated/smbdo.schemas';
import Dropzone from '@/components/ui/dropzone';
import { useStepper } from '@/components/ui/stepper';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Separator,
  Text,
} from '@/components/ui';

import { FormActions } from '../FormActions/FormActions';
import { DOCUMENT_TYPE_MAPPING } from '../utils/documentTypeMapping';

export const DocumentUploadStepForm = () => {
  const { nextStep } = useStepper();

  const SAMPLE_DOCUMENTS: DocumentTypeSmbdo[] = ['DRIVERS_LICENSE', 'PASSPORT'];

  const DocumentUploadSchema = useMemo(() => {
    const schema: Record<string, z.ZodType<any>> = {};

    SAMPLE_DOCUMENTS.forEach((documentType) => {
      schema[documentType] = z.instanceof(Array<File>);
    });

    return z.object(schema);
  }, [SAMPLE_DOCUMENTS]);

  const form = useForm<z.infer<typeof DocumentUploadSchema>>({
    resolver: zodResolver(DocumentUploadSchema),
  });

  const onSubmit = form.handleSubmit((values) => {
    console.log(values);
    nextStep();
  });

  return (
    <Form {...form}>
      <form
        onSubmit={onSubmit}
        className="eb-grid eb-w-full eb-items-start eb-gap-6 eb-overflow-auto eb-p-1"
      >
        <Text>You have been requested to provide the following documents.</Text>
        <Separator />
        {SAMPLE_DOCUMENTS.map((documentType) => (
          <FormField
            control={form.control}
            name={documentType}
            render={({ field: { onChange, ...fieldProps } }) => {
              return (
                <>
                  <FormItem>
                    <FormLabel>
                      {DOCUMENT_TYPE_MAPPING[documentType].label}
                    </FormLabel>
                    <FormDescription>
                      {DOCUMENT_TYPE_MAPPING[documentType].description}
                    </FormDescription>
                    <FormControl>
                      <Dropzone
                        containerClassName="eb-max-w-xl"
                        {...fieldProps}
                        multiple={false}
                        accept={{
                          'application/pdf': ['.pdf'],
                        }}
                        onDrop={(acceptedFiles) => {
                          onChange(acceptedFiles);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>

                  <Separator />
                </>
              );
            }}
          />
        ))}

        <FormActions />
      </form>
    </Form>
  );
};
