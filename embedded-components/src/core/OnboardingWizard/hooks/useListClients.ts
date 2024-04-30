import { useQuery } from '@tanstack/react-query';
import type { UseQueryResult } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
//import { useApiConfig } from './useApiConfig';
import {getClientMock} from './getClientMock';


export function useListClients(): UseQueryResult<any, AxiosError> {
 // const { config } = useApiConfig();
  return useQuery({
    queryKey: ["clients"], queryFn: async () => {return getClientMock}//(await axios.get<any>(`/clients`, config)).data,
  })
}
