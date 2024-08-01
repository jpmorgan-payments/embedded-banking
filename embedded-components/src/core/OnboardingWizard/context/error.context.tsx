import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';

export type Error = {
  error: boolean;
  setError: Dispatch<SetStateAction<boolean>>;
};
const ErrorContext = createContext({} as Error);

export const useError = (): Error => {
  return useContext(ErrorContext);
};

export const ErrorProvider = ({ children }: any) => {
  const [error, setError] = useState(false);

  return (
    <ErrorContext.Provider value={{ error, setError }}>
      {children}
    </ErrorContext.Provider>
  );
};
