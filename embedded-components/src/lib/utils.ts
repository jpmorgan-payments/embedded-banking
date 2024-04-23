import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  console.log(
    '@@inputs',
    inputs,
    '::\n',
    clsx(inputs),
    '::\n',
    twMerge(clsx(inputs))
  );

  return twMerge(clsx(inputs));
}
