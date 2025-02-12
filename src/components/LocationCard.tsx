'use client'

import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card"
import { Transition } from '@headlessui/react'
import { AlertTriangle } from 'lucide-react'
import { Location } from '@/lib/types'
import { useRouter } from '@/lib/navigation'

interface LocationCardProps {
  location: Location
  onClose: () => void
  show: boolean
}

export default function LocationCard({ location, onClose, show }: LocationCardProps) {
  const t = useTranslations('LocationCard');
  const metrics = location.metrics
  const isPhHigh = metrics.ph ? metrics.ph > 7.9 : false;
  const router = useRouter()

  return (
    <div className="absolute top-4 right-4 z-[1000] w-80">
      <Transition
        show={show}
        appear={true}
        enter="transition-all duration-300"
        enterFrom="opacity-0 translate-x-5"
        enterTo="opacity-100 translate-x-0"
        leave="transition-all duration-300"
        leaveFrom="opacity-100 translate-x-0"
        leaveTo="opacity-0 translate-x-5"
        afterLeave={onClose}
      >
        <Card className="backdrop-blur-sm bg-white/95">
          <CardHeader>
            <CardTitle className="text-xl">{location.name}</CardTitle>
            <CardDescription className="text-sm font-medium">
              {location.type}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              {location.description}
            </p>
            
            <div className="space-y-3 mb-4">
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{t('metrics.co2')}</span>
                  <span>{metrics.co2 || t('metrics.unavailable')}</span>
                </div>
                <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
                  {metrics.co2 ? <div 
                    className="h-full bg-blue-500 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${metrics.co2}%` }}
                  /> :
                  <div 
                    className="h-full bg-red-500 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `100%` }}
                  />}
                </div>
              </div>

            
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{t('metrics.ph')}</span>
                  <span>{metrics.ph || t('metrics.unavailable')}</span>
                </div>
                <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
                  {metrics.ph ? <div 
                    className="h-full bg-blue-500 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${metrics.ph}%` }}
                  /> :
                  <div 
                    className="h-full bg-red-500 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `100%` }}
                  />}
                </div>
              </div>

              {/* Water Temperature */}
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{t('metrics.temperature')}</span>
                  <span>{metrics.temperature || t('metrics.unavailable')}{metrics.temperature && "°C"}</span>
                </div>
                <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
                  {metrics.temperature ? <div 
                    className="h-full bg-blue-500 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${metrics.temperature/35 * 100}%` }}
                  /> :
                  <div 
                    className="h-full bg-red-500 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `100%` }}
                  />}
                </div>
              </div>

              {/* Warning Message */}
              {isPhHigh && (
                <div className="flex items-center gap-2 p-3 mh-4 bg-yellow-50 border border-yellow-200 rounded-md">
                  <AlertTriangle className="h-10 w-10 mr-4 text-yellow-600" />
                  <p className="text-sm text-yellow-700">
                    {t('warning.highPh')}
                  </p>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <Button 
                variant="default" 
                size="sm"
                className="flex-1"
                onClick={() => router.push(`/info/${location.id}`, { scroll: false })}
              >
                {t('buttons.moreInfo')}
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onClose()}
                className="flex-1"
              >
                {t('buttons.close')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </Transition>
    </div>
  )
}
