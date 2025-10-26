'use client';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

export default function LanguageSwitch() {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();

  const changeLocale = (locale: string) => {
    // Remplace le [locale] dans l'URL
    const parts = pathname.split('/');
    parts[1] = locale; 
    router.push(parts.join('/'));
  };

  return (
        

    <div className="flex gap-2 mx-auto">
      <button onClick={() => changeLocale('fr')} className="px-2 py-1 hover:bg-[#fc4c02] hover:text-white lg:hover:bg-white lg:hover:text-black rounded bg-gray-200 cursor-pointer">
        FR
      </button>
      <button onClick={() => changeLocale('en')} className="px-2 py-1 hover:bg-[#fc4c02] hover:text-white rounded bg-gray-200 cursor-pointer lg:hover:bg-white lg:hover:text-black">
        EN
      </button>
    </div>
    
  );
}
