'use client';
import { useState } from 'react';
import { MapPinIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import LanguageSwitch from './LanguageSwitch';

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const t = useTranslations();

  const changeLocale = (locale: string) => {
    router.push(`/${locale}${window.location.pathname}`);
  };

  return (
    <nav className="relative flex justify-between items-center p-4 bg-[#fc4c02]">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <MapPinIcon className="w-7 h-7 text-white" />
        <span className="font-semibold text-white text-2xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
          TraceGPX
        </span>
      </div>

      {/* Desktop menu */}
      <div className="hidden md:flex items-center gap-4">
        <button
          onClick={() => window.open('https://forms.gle/LmyEcgzK7an579kZ8', '_blank')}
          className="text-white font-semibold hover:underline"
        >
          {t('navbar.feedback')}
        </button>
            <LanguageSwitch/>

      </div>

      {/* Mobile hamburger */}
      <div className="md:hidden">
        <button onClick={() => setOpen(!open)}>
          {open ? <XMarkIcon className="w-6 h-6 text-white cursor-pointer" /> : <Bars3Icon className="w-6 h-6 text-white cursor-pointer" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
  <div className="fixed top-16 right-4 bg-white shadow-md rounded p-4 flex flex-col gap-2 z-[1000] md:hidden">
    <button
      onClick={() => window.open('https://forms.gle/LmyEcgzK7an579kZ8', '_blank')}
      className="text-[#fc4c02] hover:underline font-semibold cursor-pointer"
    >
      {t('navbar.feedback')}
    </button>
    <LanguageSwitch/>
  </div>
)}
    </nav>
  );
}
