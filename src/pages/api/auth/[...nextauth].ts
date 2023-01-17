import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  session: {
    strategy: "jwt",
  },

  callbacks: {
    session: async ({ session, user }) => {
      (session as any).jwt = (user as any).jwt;
      (session as any).id = user.id;
      return Promise.resolve(session);
    },
    jwt: async ({ token, account, user }) => {
      const isSignIn = user ? true : false;
      console.log("jwt callback", isSignIn);
      if (isSignIn) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/auth/${account?.provider}/callback?access_token=${account?.access_token}`
        );

        const data = await response.json();
        console.log(data);
        token.jwt = data.jwt;
        token.id = data.user.id;
      }
      console.log(token);
      return token;
    },
  },
};

export default NextAuth(options);
