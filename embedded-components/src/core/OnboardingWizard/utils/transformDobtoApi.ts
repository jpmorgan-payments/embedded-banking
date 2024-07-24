const transformDobToApi = (dob: string): `${string}-${string}-${string}` => {
  if (dob.includes('-')) {
    const [month, day, year] = dob?.split('-');
    return `${year}-${month}-${day}`;
  }
  
  const month = dob.slice(0, 2);
  const day = dob.slice(2, 4);
  const year = dob.slice(4);
  return `${year}-${month}-${day}`;
};
export { transformDobToApi };
