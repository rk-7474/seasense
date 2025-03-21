import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/drizzle';
import { received_data, sensors } from '@/lib/schema';
import { eq, desc } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    // Validate that the sensor exists
    const sensorExists = await db
      .select()
      .from(sensors)
      .where(eq(sensors.id, parseInt(id)))
      .limit(1);

    if (!sensorExists || sensorExists.length === 0) {
      return NextResponse.json(
        { error: 'Sensor not found' },
        { status: 404 }
      );
    }

    // Get the latest data for this sensor
    const latestData = await db
      .select()
      .from(received_data)
      .where(eq(received_data.sensorId, parseInt(id)))
      .orderBy(desc(received_data.timestamp))
      .limit(10);

    return NextResponse.json({
      sensor: sensorExists[0],
      data: latestData
    });
    
  } catch (error) {
    console.error('Error retrieving sensor data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
