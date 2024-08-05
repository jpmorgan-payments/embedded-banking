const transformDateofBirth = (
  dob: string | undefined
): `${string}-${string}-${string}` | undefined => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;

  if (typeof dob === 'undefined') {
    return undefined;
  }
  if (!regex.test(dob)) {
    throw new Error('Invalid date format');
  }

  const [year, month, day] = dob.split('-');
  return `${month}-${day}-${year}`;
};

export { transformDateofBirth };
