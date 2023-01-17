import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FC, PropsWithChildren } from "react";

const CheckAuth: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  console.log(session, "session");

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    router.push("/login");
  }
  return <div>{children}</div>;
};

export default CheckAuth;
