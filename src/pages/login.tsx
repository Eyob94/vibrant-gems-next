import React, { FC } from "react";
import Head from "next/head";
import Input from "../shared/Input/Input";
import Link from "next/link";
import ButtonPrimary from "../shared/Button/ButtonPrimary";
import Image from "next/image";
import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
  signIn,
} from "next-auth/react";
import { GetServerSideProps } from "next";
import { BuiltInProviderType } from "next-auth/providers";

export interface PageLoginProps {
  className?: string;
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
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
    href: "#",
    icon: "images/Google.svg",
  },
];

const PageLogin: FC<PageLoginProps> = ({ className = "", providers }) => {
  return (
    <div className={`nc-PageLogin ${className}`} data-nc-id="PageLogin">
      <Head>
        <title>Login || Booking React Template</title>
      </Head>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Login
        </h2>
        <div className="max-w-md mx-auto space-y-6">
          <div className="grid gap-3">
            {loginSocials.map((item, index) => (
              <a
                key={index}
                href={item.href}
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
          {/* <form className="grid grid-cols-1 gap-6" action="#" method="post">
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Email address
              </span>
              <Input
                type="email"
                placeholder="example@example.com"
                className="mt-1"
              />
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Password
                <Link href="/forgot-pass" className="text-sm text-green-600">
                  Forgot password?
                </Link>
              </span>
              <Input type="password" className="mt-1" />
            </label>
            <ButtonPrimary type="submit">Continue</ButtonPrimary>
          </form> */}

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            New user? {` `}
            <Link className="text-green-600" href="/signup">
              Create an account
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageLogin;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const providers = await getProviders();
  return {
    props: { providers },
  };
};
