import { getSensorData } from "@/app/actions"
import ClientSensorInfo from "@/components/ClientSensorInfo"
import { Suspense } from "react"
import { useTranslations } from 'next-intl'

export default async function InfoPage({ params } : { params: Promise<{ id: string }> }) {
  const t = useTranslations('Info');

  try {
    const {id} = await params;
    const sensor = await getSensorData(id);
    
    if (!sensor) {
      return (
        <div className="container mx-auto p-8">
          <h1 className="text-4xl font-bold text-red-500">{t('error.notFound')}</h1>
        </div>
      );
    }

    return (
      <Suspense fallback={
        <div className="absolute w-full h-full inset-0 bg-black z-50 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"/>
        </div>
      }>
        <ClientSensorInfo sensor={sensor} />
      </Suspense>
    );
  } catch (error) {
    console.error("Error loading sensor data:", error);
    return (
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold text-red-500">{t('error.loading')}</h1>
        <p className="mt-4 text-gray-600">{t('error.tryAgain')}</p>
      </div>
    );
  }
}
