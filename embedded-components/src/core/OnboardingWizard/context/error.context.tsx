import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';

export type Error = {
  error: any;
  setError: Dispatch<SetStateAction<any>>;
  pending: any;
  setPending: Dispatch<SetStateAction<any>>;
};
const ErrorContext = createContext({} as Error);

export const useError = (): Error => {
  return useContext(ErrorContext);
};

export const ErrorProvider = ({ children }: any) => {
  const [error, setError] = useState(false);
  const [pending, setPending] = useState(false);

  return (
    <ErrorContext.Provider value={{ error, setError, pending, setPending }}>
      {children}
    </ErrorContext.Provider>
  );
};