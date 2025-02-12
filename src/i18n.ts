import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async ({
  requestLocale
}) => {
  let locale = await requestLocale;

  return {
    locale: locale || "it",
  };
});