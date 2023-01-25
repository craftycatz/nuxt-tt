import {z} from 'zod';

const envVariables = z.object({
    DATABASE_URL: z.string(),
    OKTA_ISSUER: z.string(),
    OKTA_CLIENT_ID: z.string(),
    OKTA_REDIRECT_URI: z.string(),
});

envVariables.parse(process.env);

// Providing type definitions for process.env which gives us nice autocomplete and type checking (°◡°♡)
declare global {
    namespace NodeJS {
        interface ProcessEnv extends z.infer<typeof envVariables> {}
    }
}