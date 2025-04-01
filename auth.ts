import NextAuth, { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

/*
 * In order to log in through your browser and expose the logged in state
 * to the Plasmic studio you would need to additionally configure cookies.
 * This is only needed in development mode, in production mode these
 * policies need to be disabled for security reasons.
 **/
const devCookiesConfig: NextAuthConfig["cookies"] = {
  sessionToken: {
    options: {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    },
  },
  callbackUrl: {
    options: {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    },
  },
  csrfToken: {
    options: {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    },
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  cookies: process.env.NODE_ENV !== "production" ? devCookiesConfig : undefined,
});
