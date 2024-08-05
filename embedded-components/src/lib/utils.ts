import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const twMerge = extendTailwindMerge({
  prefix: 'eb-',
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createRegExpAndMessage(
  specialCharacters?: string,
  prependedMessage?: string
): [RegExp, string] {
  const escapedChars = (specialCharacters ?? '').split('').map((char) => {
    if ('^-]\\'.includes(char)) {
      return `\\${char}`;
    }

    return char;
  });
  const regExpString = `^[a-zA-Z0-9\\s${escapedChars.join('')}]*$`;
  return [
    new RegExp(regExpString),
    prependedMessage + (specialCharacters ?? '').split('').join(' '),
  ];
}
