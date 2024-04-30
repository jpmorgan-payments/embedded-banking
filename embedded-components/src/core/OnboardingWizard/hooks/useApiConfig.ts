import { AxiosRequestConfig, RawAxiosRequestHeaders } from 'axios';

export function useApiConfig(additionalHeaders?: RawAxiosRequestHeaders) {
    const apiUrl = "https://t3mpo-eb-service-cat.jpmchase.net/api/v1/";
    const accessToken = undefined;
    const clientId = undefined;
    const platformId = '0005191231';
    const prodMode = false;
  
    const headers = {
      ...(clientId ? { client_id: clientId } : {}),
      ...(platformId ? { platform_id: platformId } : {}),
      token: accessToken,
      ...additionalHeaders,
    };
  
    const config: AxiosRequestConfig = {
      baseURL: apiUrl,
      headers,
    };
  
    return {
      config,
      clientId,
      platformId,
      isTokenValid: true,
      hasClientId: !prodMode || !!clientId,
    };
  }
  