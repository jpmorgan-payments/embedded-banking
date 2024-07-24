const transformDobToApi = (
  dob: string | undefined
): `${string}-${string}-${string}` => {
  const month = dob?.slice(0, 2);
  const day = dob?.slice(2, 4);
  const year = dob?.slice(4);
  return `${year}-${month}-${day}`;
};
export { transformDobToApi };
