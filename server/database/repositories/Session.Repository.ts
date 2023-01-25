import prisma from "../client";

export async function createSession(sessionData: any) {
  if (!sessionData) throw new Error("No session data provided");
  try {
    const sessionExists = await prisma.session.findUnique({
      where: {
        userId: sessionData.userId,
      },
    });

    const sessionExpired = sessionExists && sessionExists.expires < new Date();
    if (sessionExpired) {
      await prisma.session.deleteMany({
        where: {
          userId: sessionData.userId,
        },
      });
    }

    if (!sessionExpired && sessionExists) return sessionExists;

    const session = await prisma.session.create({
      data: sessionData,
    });

    return session;
  } catch (err) {
    console.log(err);
    throw new Error("Error creating session");
  }
}
