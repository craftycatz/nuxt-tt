import { H3Event } from "h3";
import { User } from "@prisma/client";
import { createSession } from "../database/repositories/Session.Repository";

export const makeSession = async (
  event: H3Event,
  user: User,
  token: string,
) => {

    try{
        const session = await createSession({
          userId: user.id,
          token,
          expires: new Date(Date.now()),
          role: user.role,
        });
      
        const cookieData =JSON.stringify(session);
        
        setCookie(event, "session", cookieData, {
          httpOnly: false,
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
        });
        
        return session;

    } catch(err){
        throw new Error("Error creating session")
    }
};
