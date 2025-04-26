import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/drizzle';
import { received_data, sensors } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
  
    const data = new Map<string, number>();

    searchParams.entries().forEach(([key, value]) => {
      data.set(key, Number(value));
    });
    
    // Validate request body
    if (!data.has('sensorId')) {
      return NextResponse.json(
        { error: 'Missing required fields: sensorId and data' },
        { status: 400 }
      );
    }

    const sensorId = data.get('sensorId') as number;

    if (isNaN(sensorId)) {
      return NextResponse.json(
        { error: 'Invalid sensorId. It must be a number' },
        { status: 400 }
      );
    }

    // Validate that the sensor exists
    const sensorExists = await db
      .select({ id: sensors.id })
      .from(sensors)
      .where(eq(sensors.id, sensorId))
      .limit(1);

    if (!sensorExists || sensorExists.length === 0) {
      return NextResponse.json(
        { error: 'Sensor not found' },
        { status: 404 }
      );
    }

    // Validate data structure
    const ph = data.get('ph');  
    const temperature = data.get('temperature');  
    const co2 = data.get('co2');

    if (
      (ph !== undefined && typeof ph !== 'number' && ph !== null) ||
      (temperature !== undefined && typeof temperature !== 'number' && temperature !== null) ||
      (co2 !== undefined && typeof co2 !== 'number' && co2 !== null)
    ) {
      return NextResponse.json(
        { error: 'Invalid data format. ph, temperature, and co2 must be numbers or null' },
        { status: 400 }
      );
    }

    // Insert data into the database
    const result = await db.insert(received_data).values({
      sensorId: sensorId,
      data: JSON.stringify({ ph, temperature, co2 }),
      // timestamp will be set to current time by default
    }).returning();

    return NextResponse.json({ 
      success: true, 
      message: 'Data received successfully',
      data: result[0]
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error processing sensor data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
