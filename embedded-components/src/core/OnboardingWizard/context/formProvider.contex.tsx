import { createContext, useContext, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider as RHFFormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';

export type FormContextProp = {
  updateSchema: (schema: any) => void;
};
const FormContext = createContext<FormContextProp>({
  updateSchema: () => null,
});

export const useFormSchema = () => useContext(FormContext);

export const FormProvider = ({ children, initialSchema }: any) => {
  const [schema, setSchema] = useState(initialSchema || yup.object({}));
  type FormData = yup.InferType<typeof schema>;

  const form = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const updateSchema = (newSchema: any) => {
    setSchema(newSchema);
    form.reset(
      {},
      {
        keepErrors: true,
        keepDirty: true,
        keepValues: true,
      }
    );
  };

  return (
    <FormContext.Provider value={{ updateSchema }}>
      <RHFFormProvider {...form}>{children}</RHFFormProvider>
    </FormContext.Provider>
  );
};
