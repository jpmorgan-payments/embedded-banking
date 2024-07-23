const updateFormValues = (data: any, setValue: any) => {
  Object.keys(data).forEach((key) => {
    setValue(key, data[key]);
  });
};

export { updateFormValues };
