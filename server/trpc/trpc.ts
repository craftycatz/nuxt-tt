import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";
import type { Context } from "./context";
import OktaJwtVerifier from "@okta/jwt-verifier";

const config = useRuntimeConfig()

const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: config.public.OKTA_ISSUER,
});

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.code === "BAD_REQUEST" && error.cause instanceof ZodError
            ? error.cause!.flatten()
            : null,
      },
    };
  },
});

const isAuthed = t.middleware(async ({ next, ctx }) => {
  let errorMsg: string | null = null;
  const token = JSON.parse(ctx.cookies.session).accessToken;
  if (!token) errorMsg = "No token provided";
  const decodedToken = await oktaJwtVerifier.verifyAccessToken(
    token,
    "api://default"
  );
  const isExpired = decodedToken.claims.exp < Date.now() / 1000;
  if (isExpired) errorMsg = "Token expired";
  if (!decodedToken) errorMsg = "Invalid token";
  if (errorMsg)
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: errorMsg,
    });

  return next({
    ctx: {
      token: decodedToken,
    },
  });
});

/**
 * Create a router
 * @see https://trpc.io/docs/v10/router
 */
export const router = t.router;

/**
 * Create an unprotected procedure
 * @see https://trpc.io/docs/v10/procedures
 **/
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed);

/**
 * @see https://trpc.io/docs/v10/middlewares
 */
export const middleware = t.middleware;

/**
 * @see https://trpc.io/docs/v10/merging-routers
 */
export const mergeRouters = t.mergeRouters;
