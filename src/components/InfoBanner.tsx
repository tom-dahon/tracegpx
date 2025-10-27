'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

interface InfoBannerProps {
  message?: string;
}



export default function InfoBanner({
  
}: InfoBannerProps) {
const t = useTranslations("infobanner");
const message = t("text")
  return (
    <div className="w-full bg-yellow-100 text-yellow-800 border-l-4 border-yellow-500 px-4 py-2 text-sm md:text-base">
      {message}
    </div>
  );
}
