import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const entryShape = z.object({
  id: z.number(),
  content: z.string(),
  date: z.string(),
  hours: z.number(),
});

export type Entry = z.infer<typeof entryShape>;

export const entryRouter = router({
  addEntry: publicProcedure.input(entryShape).mutation(async ({ input }) => {
    const entry = await prisma.journalEntry.create({
      data: {
        content: input.content,
        date: new Date(input.date),
        hours: input.hours,
        userId: input.id,
      },
    });
    return entry;
  }),

  getEntries: publicProcedure.query(async () => {
    const entries = await prisma.journalEntry.findMany();
    return entries;
  }),

  getEntry: publicProcedure.input(z.number()).query(async ({ input }) => {
    const entry = await prisma.journalEntry.findUnique({
      where: {
        id: input,
      },
    });
    return entry;
  }),

  updateEntry: publicProcedure.input(entryShape).mutation(async ({ input }) => {
    const entry = await prisma.journalEntry.update({
      where: {
        id: input.id,
      },
      data: {
        content: input.content,
        date: new Date(input.date),
      },
    });
    return entry;
  }),
});
