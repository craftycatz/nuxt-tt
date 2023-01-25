import { router } from "../trpc";
import { entryRouter } from "./journalRouter";
import { userRouter } from "./userRouter";

export const appRouter = router({
  entryRouter,
  userRouter,
});

export type AppRouter = typeof appRouter;
