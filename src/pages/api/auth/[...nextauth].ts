import NextAuth, { Awaitable, NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { fetchStrapi, getStrapiURL } from "../../../lib/strapi";

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
        console.log("heree");
        // Add logic here to look up the user from the credentials supplied
        // const user = { id: "1", name: "J Smith", email: "jsmith@example.com" };
        const body = {
          identifier: credentials?.email,
          password: credentials?.password,
        };

        let user = {};
        if (credentials?.username) {
          const response = await fetch(
            getStrapiURL("/api/auth/local/register"),
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(credentials),
            }
          );
          const data = await response.json();
          if (data.error) {
            console.log(data.error);
            throw new Error(data.error.message);
          }
          console.log("set");
          user = data;
        } else {
          const response = await fetch(getStrapiURL("/api/auth/local"), {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          });
          let data = await response.json();
          console.log(data);
          if (data.error) {
            throw new Error(data.error.message);
          }
          user = data;
        }
        console.log("continue");

        console.log(user);
        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user as any;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          throw new Error("Internal Server Error");
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
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
      // (session as any).id = user.id;
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
          console.log(data, "google data");
          token.jwt = data.jwt;
          token.id = data.user.id;
          return Promise.resolve(token);
        }

        // const me = await fetchStrapi(
        //   "/users/me",
        //   {},
        //   {
        //     headers: { Authorization: `BEARER ${token.jwt}` },
        //   }
        // );
        // if (!me.data) {
        //   return null;
        // }
        // console.log(me, "me");
        // token.id = me.user.id;
        // token.jwt = me.jwt;
        // console.log(token);

        // return Promise.resolve(token);
      }
    },
    // jwt: async ({ token, account, user }) => {
    //   const isSignIn = user ? true : false;
    //   if (isSignIn) {
    //     const response = await fetch(
    //       `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/auth/${account?.provider}/callback?access_token=${account?.access_token}`
    //     );
    //     console.log(
    //       `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/auth/${account?.provider}/callback?access_token=${account?.access_token}`
    //     );
    //     const data = await response.json();
    //     token.jwt = data.jwt;
    //     token.id = data.user.id;
    //   }
    //   return Promise.resolve(token);
    // },
  },
};

export default NextAuth(options);
