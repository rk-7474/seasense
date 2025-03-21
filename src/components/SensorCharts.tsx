'use client'

import { useTranslations } from 'next-intl'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

import { SensorData } from "@/app/actions"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface SensorChartsProps {
  sensor: SensorData;
}

const createChartData = (label: string, data: number[], color: string, timestamps: string[]) => {
  // Get the latest 10 data points or all if less than 10
  const latestData = data.slice(-10)
  const latestTimestamps = timestamps.slice(-10)
  
  return {
    // Use the formatted timestamps as labels (DD-MM-YYYY)
    labels: latestTimestamps,
    datasets: [
      {
        label,
        data: latestData,
        borderColor: color,
        backgroundColor: color + '20',
        fill: true,
        tension: 0.4
      }
    ]
  }
}

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    }
  },
  scales: {
    y: {
      beginAtZero: false
    }
  }
}

export default function SensorCharts({ sensor }: SensorChartsProps) {
  const t = useTranslations('SensorCharts')

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>{t('ph')}</CardTitle>
        </CardHeader>
        <CardContent>
          <Line 
            data={createChartData('pH', sensor.dailyData.ph, '#2563eb', sensor.dailyData.timestamps)}
            options={chartOptions}
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>{t('temperature')}</CardTitle>
        </CardHeader>
        <CardContent>
          <Line 
            data={createChartData('Temperature (°C)', sensor.dailyData.temperature, '#dc2626', sensor.dailyData.timestamps)}
            options={chartOptions}
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>{t('co2')}</CardTitle>
        </CardHeader>
        <CardContent>
          <Line 
            data={createChartData('CO₂ (ppm)', sensor.dailyData.co2, '#059669', sensor.dailyData.timestamps)}
            options={chartOptions}
          />
        </CardContent>
      </Card>
    </div>
  )
}
