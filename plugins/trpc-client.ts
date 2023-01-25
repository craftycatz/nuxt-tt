import { createTRPCNuxtClient, httpBatchLink } from "trpc-nuxt/client";
import { loggerLink } from "@trpc/client";
import superjson from "superjson";
import type { AppRouter } from "~~/server/trpc/routers";

export default defineNuxtPlugin(() => {
  const headers = useRequestHeaders();
  const client = createTRPCNuxtClient<AppRouter>({
    transformer: superjson,
    links: [
      // adds pretty logs to console in development and logs errors in production
      loggerLink({
        enabled: (opts) =>
          process.env.NODE_ENV === "development" ||
          (opts.direction === "down" && opts.result instanceof Error),
      }),
      httpBatchLink({
        url: "http://localhost:3000/api/trpc",
        headers() {
          return headers;
        },
      }),
    ],
  });

  return {
    provide: {
      client,
    },
  };
});
