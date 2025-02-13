import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

const config = {
  async redirects() {
    return [
      // Basic redirect
      {
        source: '/',
        destination: '/it',
        permanent: true,
      },
    ]
  }
};

export default withNextIntl(config);  
