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
