import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/drizzle';
import { received_data, sensors } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate request body
    if (!body.sensorId || !body.data) {
      return NextResponse.json(
        { error: 'Missing required fields: sensorId and data' },
        { status: 400 }
      );
    }

    // Validate that the sensor exists
    const sensorExists = await db
      .select({ id: sensors.id })
      .from(sensors)
      .where(eq(sensors.id, body.sensorId))
      .limit(1);

    if (!sensorExists || sensorExists.length === 0) {
      return NextResponse.json(
        { error: 'Sensor not found' },
        { status: 404 }
      );
    }

    // Validate data structure
    const { ph, temperature, co2 } = body.data;
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
      sensorId: body.sensorId,
      data: body.data,
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
