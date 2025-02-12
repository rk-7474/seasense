'use client'

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

const createChartData = (label: string, data: number[], color: string) => ({
  labels: data.map((_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (data.length - 1 - i))
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }),
  datasets: [
    {
      label,
      data,
      borderColor: color,
      backgroundColor: color + '20',
      fill: true,
      tension: 0.4
    }
  ]
})

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
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>pH Levels</CardTitle>
        </CardHeader>
        <CardContent>
          <Line 
            data={createChartData('pH', sensor.dailyData.ph, '#2563eb')}
            options={chartOptions}
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Water Temperature</CardTitle>
        </CardHeader>
        <CardContent>
          <Line 
            data={createChartData('Temperature (°C)', sensor.dailyData.temperature, '#dc2626')}
            options={chartOptions}
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>CO₂ Levels</CardTitle>
        </CardHeader>
        <CardContent>
          <Line 
            data={createChartData('CO₂ (ppm)', sensor.dailyData.co2, '#059669')}
            options={chartOptions}
          />
        </CardContent>
      </Card>
    </div>
  )
}
