import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";
import { PrismaClient } from "@prisma/client";
import { makeSession } from "~~/server/services/session.service";

const prisma = new PrismaClient();

const userShape = z.object({
  id: z.optional(z.number()),
  email: z.string(),
  name: z.string(),
  role: z.string(),
  token: z.optional(z.string()),
  refreshToken: z.optional(z.string()),
});

export type User = z.infer<typeof userShape>;

export const userRouter = router({
  login: publicProcedure.input(userShape).mutation(async ({ input, ctx }) => {
    let user = await prisma.user.findUnique({
      where: {
        email: input.email,
      },
    });
    if (!user) {
      //create user
      const newUser = await prisma.user.create({
        data: {
          email: input.email,
          name: input.name,
          role: input.role,
        },
      });
      user = newUser;
    }

    const session = await makeSession(
      ctx.event,
      user,
      input.token!
    );
    
    return [session, input];
  }),
});
