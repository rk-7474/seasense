export interface Metrics {
    co2: number | null
    ph: number | null
    temperature: number | null
}

export interface Location {
    id: number
    name: string
    position: [number, number]
    description?: string
    type: string
    metrics: Metrics
    latestUpdate: number
    isActive: boolean
}