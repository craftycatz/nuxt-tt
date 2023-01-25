import type { AuthCookie } from "~~/types/Cookie";

export const useAuth = () => {
  const isAuthenticated = () => {
    const authCookie = useCookie<AuthCookie>("session").value;
    
    if(!authCookie|| !authCookie.accessToken) return false;
      return true
  };

  const signOut = () => {
    const authCookie = useCookie<AuthCookie>("session");
    if(authCookie) {
      authCookie.value = null;
      window.location.href = "/signin";
    }
  }

  return {
    isAuthenticated,
    signOut
  };
};
