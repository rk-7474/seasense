import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

const config = {
  // Other config options
};

export default withNextIntl(config);  
