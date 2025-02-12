'use client';

import Image from 'next/image';
import { useRouter, usePathname } from '@/lib/navigation';
import { Button } from '@/components/ui/button';
import { locales } from '@/lib/navigation';

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = (locale: typeof locales[number]) => {
    router.replace(pathname, { locale });
  };

  return (
    <div className="fixed top-4 right-4 flex gap-2">
      {locales.map((locale) => (
        <Button
          key={locale}
          variant="ghost"
          size="icon"
          onClick={() => switchLanguage(locale)}
          className="w-10 h-10 p-1"
        >
          <Image
            src={`/${locale}-flag.svg`}
            alt={`Switch to ${locale}`}
            width={32}
            height={32}
            className="rounded-sm"
          />
        </Button>
      ))}
    </div>
  );
}
