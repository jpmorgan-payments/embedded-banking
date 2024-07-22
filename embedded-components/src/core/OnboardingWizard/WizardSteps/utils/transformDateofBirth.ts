const transformDateofBirth = (
  dob: string | undefined
): `${string}-${string}-${string}` => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;

  if (!dob) {
    throw new Error('Missing DOB');
  }
  if (!regex.test(dob)) {
    throw new Error('Invalid date format');
  }

  const [year, month, day] = dob.split('-');
  return `${month}-${day}-${year}`;
};

export { transformDateofBirth };
