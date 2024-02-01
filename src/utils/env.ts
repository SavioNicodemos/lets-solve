import { z } from 'zod';

const envSchema = z.object({
  API_URL: z.string().url(),
});

const envVars = {
  API_URL: process.env.EXPO_PUBLIC_API_URL,
};

export const env = envSchema.parse(envVars);
