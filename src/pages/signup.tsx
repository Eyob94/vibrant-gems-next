import React, { FC, FormEventHandler, useState } from "react";
import Head from "next/head";
import Input from "../shared/Input/Input";
import ButtonPrimary from "../shared/Button/ButtonPrimary";
import Link from "next/link";
import Image from "next/image";
import {
  useSession,
  signIn,
  signOut,
  getProviders,
  ClientSafeProvider,
  LiteralUnion,
  getCsrfToken,
} from "next-auth/react";
import { GetServerSideProps } from "next";
import { BuiltInProviderType } from "next-auth/providers";
import { fetchStrapi } from "../lib/strapi";
import { useRouter } from "next/router";

export interface PageSignUpProps {
  className?: string;
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
  csrfToken: string | null;
}
const loginSocials = [
  // {
  //   name: "Continue with Facebook",
  //   href: "#",
  //   icon: "images/Facebook.svg",
  // },
  // {
  //   name: "Continue with Twitter",
  //   href: "#",
  //   icon: "images/Twitter.svg",
  // },
  {
    name: "Continue with Google",
    href: "/api/auth/signin",
    icon: "images/Google.svg",
  },
];

const PageSignUp: FC<PageSignUpProps> = ({
  className = "",
  providers,
  csrfToken,
}) => {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  // const onSubmit: FormEventHandler = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const register = await fetchStrapi(
  //       "/auth/local/register",
  //       {},
  //       {
  //         method: "POST",
  //         body: JSON.stringify(credentials),
  //         mode: "cors",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Accept: "*",
  //         },
  //       }
  //     );
  //     if (register) {
  //       router.push("/");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const onSubmit: FormEventHandler = async (event) => {
    event.preventDefault();
    try {
      const res = await signIn("credentials", {
        redirect: false,
        username: credentials.username,
        email: credentials.email,
        password: credentials.password,
        callbackUrl: `${window.location.origin}`,
      });
      console.log(res);
      if (res?.error) {
        setError(res.error);
      } else {
        setError("");
      }
      if (res?.url) router.push(res.url);
      // setSubmitting(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`nc-PageSignUp  ${className}`} data-nc-id="PageSignUp">
      <Head>
        <title>Sign up || Ciscryp React Template</title>
      </Head>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Signup
        </h2>
        <div className="max-w-md mx-auto space-y-6 ">
          <div className="grid gap-3">
            {loginSocials.map((item, index) => (
              <a
                key={index}
                // href={item.href}
                onClick={() => signIn(providers?.google.id)}
                className="cursor-pointer flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
              >
                <Image
                  className="flex-shrink-0"
                  src={item.icon}
                  alt={item.name}
                  width={23}
                  height={23}
                />
                <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
                  {item.name}
                </h3>
              </a>
            ))}
          </div>
          {/* OR */}
          {/* <div className="relative text-center">
            <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
              OR
            </span>
            <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
          </div> */}
          {/* FORM */}
          {error && (
            <div
              className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg "
              role="alert"
            >
              <span className="font-medium">Error: </span>
              {error}
            </div>
          )}
          <form className="grid grid-cols-1 gap-6 mt-10" onSubmit={onSubmit}>
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Username
              </span>
              <input
                name="csrfToken"
                type="hidden"
                defaultValue={csrfToken || ""}
              />

              <Input
                name="username"
                type="text"
                onChange={(e) =>
                  setCredentials({ ...credentials, username: e.target.value })
                }
                required
                placeholder="Your name"
                className="mt-1"
              />
            </label>
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Email address
              </span>
              <Input
                name="email"
                type="email"
                onChange={(e) =>
                  setCredentials({ ...credentials, email: e.target.value })
                }
                required
                placeholder="example@example.com"
                className="mt-1"
              />
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Password
              </span>
              <Input
                name="password"
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
                required
                className="mt-1"
              />
            </label>
            <ButtonPrimary type="submit">Continue</ButtonPrimary>
          </form>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            Already have an account? {` `}
            <Link className="text-green-600" href="/login">
              Sign in
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageSignUp;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const providers = await getProviders();

  return {
    props: {
      providers,
      csrfToken: (await getCsrfToken(context)) || null,
    },
  };
};
