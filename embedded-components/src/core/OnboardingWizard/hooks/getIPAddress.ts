import { useQuery } from '@tanstack/react-query';

export const useIPAddress = () => {
  return useQuery({
    queryKey: ['useIPAddress'],
    queryFn: async () => {
      if (process.env.NODE_ENV !== 'test') {
        const { publicIpv4 } = await import('public-ip');

        return publicIpv4({
          fallbackUrls: [
            `https://ifconfig.co/ip`,
            'https://api64.ipify.org/',
            'https://ipapi.co/ip',
          ],
        });
      }

      return new Promise((resolve) => {
        resolve('1.1.1.1');
      });
    },
    retry: 5,
  });
};
