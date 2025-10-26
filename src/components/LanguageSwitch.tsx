'use client';

import { usePathname, useRouter } from 'next/navigation';

import {routing} from '../i18n/routing';
const LOCALES = routing.locales;

export default function LanguageSwitch() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1];

  const changeLocale = (locale: typeof LOCALES[number]) => {
    const parts = pathname.split('/');
    parts[1] = locale;
    router.push(parts.join('/'));
  };

  return (
    <div className="flex gap-2 mx-auto">
      {LOCALES.map((locale) => {
        const isSelected = locale === currentLocale;

        return (
          <button
            key={locale}
            onClick={() => changeLocale(locale)}
            className={`px-3 py-1 rounded cursor-pointer transition-colors duration-200
              ${isSelected 
                ? 'bg-white text-[#fc4c02] border border-[#fc4c02]' 
                : 'bg-white text-gray-800 border border-gray-200'
              }
              hover:bg-[#fc4c02] hover:text-white`}
          >
            {locale.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
