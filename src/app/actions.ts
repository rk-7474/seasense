"use server";

import { db } from "@/lib/drizzle";
import { received_data, sensors } from "@/lib/schema";
import { eq, sql, and } from 'drizzle-orm';
import { Location, Metrics } from "@/lib/types";

export interface SensorData {
  id: number;
  name: string;
  type: string;
  description: string;
  coordinates: string;
  averages: {
    ph: number;
    temperature: number;
    co2: number;
  };
  dailyData: {
    ph: number[];
    temperature: number[];
    co2: number[];
  };
}

export async function getSensorData(id: string): Promise<SensorData> {
  try {
    // Get sensor info
    const sensorInfo = await db
      .select()
      .from(sensors)
      .where(eq(sensors.id, parseInt(id)))
      .limit(1);

    if (!sensorInfo || sensorInfo.length === 0) {
      throw new Error("Sensor not found");
    }

    // Get the last 10 days of data
    const tenDaysAgo = new Date();
    tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);
    
    const formattedDate = tenDaysAgo.toISOString();

    const sensorData = await db
      .select({
        data: received_data.data,
        timestamp: received_data.timestamp,
      })
      .from(received_data)
      .where(
        and(
          eq(received_data.sensorId, parseInt(id)),
          sql`${received_data.timestamp} >= ${formattedDate}::timestamp`
        )
      )
      .orderBy(received_data.timestamp);

    // Process the data for charts
    const dailyData = {
      ph: [] as number[],
      temperature: [] as number[],
      co2: [] as number[],
    };

    sensorData.forEach((record) => {
      const metrics = record.data as any;
      dailyData.ph.push(metrics.ph || 0);
      dailyData.temperature.push(metrics.temperature || 0);
      dailyData.co2.push(metrics.co2 || 0);
    });

    // Calculate averages
    const averages = {
      ph: dailyData.ph.reduce((a, b) => a + b, 0) / dailyData.ph.length || 0,
      temperature: dailyData.temperature.reduce((a, b) => a + b, 0) / dailyData.temperature.length || 0,
      co2: dailyData.co2.reduce((a, b) => a + b, 0) / dailyData.co2.length || 0,
    };

    // Format coordinates
    const coordinates = `${sensorInfo[0].latitude}° N, ${sensorInfo[0].longitude}° E`;

    return {
      id: sensorInfo[0].id,
      name: sensorInfo[0].name,
      type: sensorInfo[0].type,
      description: sensorInfo[0].description,
      coordinates,
      averages,
      dailyData,
    };
  } catch (error) {
    console.error("Error fetching sensor data:", error);
    throw error;
  }
}

export const getMapData = async () => {
  try {

  const data = await db
    .select({
      id: sensors.id,
      name: sensors.name,
      type: sensors.type,
      description: sensors.description,
      longitude: sensors.longitude,
      latitude: sensors.latitude,
      latestData: received_data.data,
      timestamp: received_data.timestamp,
    })
    .from(sensors)
    .leftJoin(
      received_data,
      and(
        eq(received_data.sensorId, sensors.id),
        sql`${received_data.timestamp} IN (
          SELECT MAX(timestamp)
          FROM ${received_data} rd2
          WHERE rd2.sensor_id = ${sensors.id}
        )`
      )
    )
    .orderBy(sensors.id);

    const map = new Map();
    data.forEach(obj => map.set(obj.id, obj)); // Replace previous objects with the same id
    const result = [...map.values()];
  
    console.log("Raw database result:", result);
    
    if (!result || result.length === 0) {
      console.log("No sensors found in the database");
      return [];
    }

    const locations: Location[] = result.map(sensor => ({
      id: sensor.id,
      name: sensor.name,
      type: sensor.type,
      description: sensor.description,
      latestUpdate: sensor.timestamp,
      position: [Number(sensor.latitude), Number(sensor.longitude)],
      metrics: sensor.latestData ? {
        co2: (sensor.latestData as Metrics).co2,
        ph: (sensor.latestData as Metrics).ph,
        temperature: (sensor.latestData as Metrics).temperature
      } : { co2: null, ph: null, temperature: null }
    }));

    console.log("Processed locations:", locations);
    return locations;
  } catch (error) {
    console.error("Error fetching map data:", error);
    throw error;
  }
}
