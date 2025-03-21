"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "@/lib/navigation";
import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Card } from "@/components/ui/card";

export default function AboutPage() {
  const t = useTranslations('About');
  const router = useRouter();

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/ocean.jpg" 
          alt="Ocean background" 
          fill 
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50 z-10" />
      </div>

      {/* Content */}
      <div className="relative z-20 min-h-screen flex flex-col items-center pt-16 px-4 sm:px-6 lg:px-8 text-white">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <LanguageSwitcher />
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 drop-shadow-2xl shadow-white tracking-tighter bg-gradient-to-r from-sky-400 to-blue-600 text-transparent bg-clip-text animate-gradient"> 
            {t('title')}
          </h1>
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 tracking-tight">
            {t('subtitle')}
          </h2>
        </div>

        {/* About Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto px-4 mb-12">
          <Card className="backdrop-blur-sm bg-white/10 p-6 rounded-lg border-none">
            <h3 className="text-2xl font-semibold mb-4 text-blue-400">{t('mission.title')}</h3>
            <p className="text-gray-200 text-lg">
              {t('mission.description')}
            </p>
          </Card>
          
          <Card className="backdrop-blur-sm bg-white/10 p-6 rounded-lg border-none">
            <h3 className="text-2xl font-semibold mb-4 text-blue-400">{t('vision.title')}</h3>
            <p className="text-gray-200 text-lg">
              {t('vision.description')}
            </p>
          </Card>
          
          <Card className="backdrop-blur-sm bg-white/10 p-6 rounded-lg border-none">
            <h3 className="text-2xl font-semibold mb-4 text-blue-400">{t('technology.title')}</h3>
            <p className="text-gray-200 text-lg">
              {t('technology.description')}
            </p>
          </Card>
          
          <Card className="backdrop-blur-sm bg-white/10 p-6 rounded-lg border-none">
            <h3 className="text-2xl font-semibold mb-4 text-blue-400">{t('team.title')}</h3>
            <p className="text-gray-200 text-lg">
              {t('team.description')}
            </p>
          </Card>
        </div>

        {/* Team Logo */}
        <div className="flex flex-col items-center mb-12">
          <Image 
            src="/planck_team_logo.png" 
            alt="Planck Team Logo" 
            width={120} 
            height={90} 
            className="mb-4"
          />
        </div>

        {/* Back to Home Button */}
        <Button
          size="lg"
          className="bg-blue-600 w-60 h-12 text-xl font-bold hover:bg-blue-700 text-white mb-12"
          onClick={() => router.push('/', { scroll: false })}
        >
          {t('backToHome')}
        </Button>
      </div>
    </div>
  );
}
