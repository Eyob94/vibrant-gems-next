import NextAuth, { Awaitable, NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { fetchStrapi } from "../../../lib/strapi";

const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Add logic here to look up the user from the credentials supplied
        // const user = { id: "1", name: "J Smith", email: "jsmith@example.com" };
        try {
          const user = await fetchStrapi(
            "/auth/local",
            {},
            {
              method: "POST",
              body: JSON.stringify({
                identifier: credentials?.email,
                password: credentials?.password,
              }),
            }
          );
          console.log(user);
          if (user?.error?.status && credentials?.username) {
            const response = await fetchStrapi(
              "/auth/local/register",
              {},
              {
                method: "POST",
                body: JSON.stringify(credentials),
              }
            );
            console.log("created user", response);
            if (response.error) {
              return null;
            }
            return response;
          }

          if (user && !user.error) {
            // Any object returned will be saved in `user` property of the JWT
            return user;
          } else {
            // If you return null then an error will be displayed advising the user to check their details.
            return null;

            // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    session: async ({ session, user, token }) => {
      console.log(session, user, "session");
      (session as any).jwt = token;
      // (session as any).erro = user.id;
      return Promise.resolve(session);
    },
    jwt: async ({ token, account, user }: any) => {
      const isSignIn = user ? true : false;
      console.log("jwt", isSignIn, token, user as any);
      if (isSignIn) {
        if (account?.provider === "google") {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/auth/${account?.provider}/callback?access_token=${account?.access_token}`
          );

          const data = await response.json();
          console.log(data);
          token.jwt = data.jwt;
          token.id = data.user.id;
          return token;
        }
        console.log(user);

        token.jwt = user?.jwt;
        token.id = user?.user?.id;
        return token;
      }
      const me = await fetchStrapi(
        "/users/me",
        {},
        {
          headers: { Authorization: `BEARER ${token.jwt}` },
        }
      );
      console.log(me);
      token.id = me.user.id;

      return token;
    },
  },
};

export default NextAuth(options);
