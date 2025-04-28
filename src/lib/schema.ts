import { boolean, integer, jsonb, numeric, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

// Define the sensors table
export const sensors = pgTable('devices_infos', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    type: varchar('type', { length: 255 }).notNull(),
    description: text('description').notNull(),
    longitude: numeric('longitude').notNull(),
    latitude: numeric('latitude').notNull(),
    isActive: boolean('is_active').default(false).notNull(),
});

export const received_data = pgTable('received_data', {
    id: serial('id').primaryKey(),
    sensorId: integer('sensor_id')
        .notNull()
        .references(() => sensors.id), 
    data: jsonb('data').notNull(),
    timestamp: timestamp('timestamp').defaultNow().notNull()
});
  