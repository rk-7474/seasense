import { defineConfig } from "drizzle-kit";
import 'dotenv/config'

export default defineConfig({
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
  schema: "./src/lib/schema.ts",
});