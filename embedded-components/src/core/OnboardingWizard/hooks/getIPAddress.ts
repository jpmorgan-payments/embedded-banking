import { useQuery } from '@tanstack/react-query';

export const useIPAddress = () => {
  return useQuery(
    ['useIPAddress'],
    async () => {
      if (process.env.NODE_ENV !== 'test') {
        const { publicIpv4 } = await import('public-ip');

        return publicIpv4({
          fallbackUrls: [
            `https://ifconfig.co/ip`,
            'https://api64.ipify.org/',
            'https://ipapi.co/ip',
          ],
        });
      } else {
        return new Promise(function (resolve, reject) {
          resolve('1.1.1.1');
        });
      }
    },
    { retry: 5 }
  );
};
