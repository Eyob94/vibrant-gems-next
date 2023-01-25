import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import { FC, FormEventHandler, useState } from "react";
import Label from "../components/Label/Label";
import CommonLayout from "../containers/AccountPage/CommonLayout";
import { fetchStrapi } from "../lib/strapi";
import ButtonPrimary from "../shared/Button/ButtonPrimary";
import CheckAuth from "../shared/CheckAuth";
import Input from "../shared/Input/Input";

const AccountPass: FC = () => {
  const { data: session } = useSession();
  console.log(session, "session");
  const [error, setError] = useState("");
  const [password, setPassword] = useState({
    currentPassword: "",
    password: "",
    passwordConfirmation: "",
  });
  const onSubmit: FormEventHandler = async (event) => {
    event.preventDefault();

    console.log();
    const data = await fetchStrapi(
      "/auth/change-password",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${(session as any).jwt}`,
        },
        method: "POST",
        body: JSON.stringify({
          ...password,
        }),
      }
    );
    if (data.error) {
      setError(data.error.message);
    }
    console.log(data);
  };
  return (
    <div>
      <CheckAuth>
        <CommonLayout>
          <div className="space-y-10 sm:space-y-12">
            {/* HEADING */}
            <h2 className="text-2xl sm:text-3xl font-semibold">
              Update your password
            </h2>

            <form onSubmit={onSubmit}>
              <div className=" max-w-xl space-y-6">
                {error && (
                  <div
                    className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg "
                    role="alert"
                  >
                    <span className="font-medium">Error: </span>
                    {error}
                  </div>
                )}
                <div>
                  <Label>Current password</Label>
                  <Input
                    type="password"
                    className="mt-1.5"
                    value={password.currentPassword}
                    required
                    onChange={(event) =>
                      setPassword((p) => ({
                        ...p,
                        currentPassword: event.target.value,
                      }))
                    }
                  />
                </div>
                <div>
                  <Label>New password</Label>
                  <Input
                    type="password"
                    className="mt-1.5"
                    value={password.password}
                    required
                    onChange={(event) =>
                      setPassword((p) => ({
                        ...p,
                        password: event.target.value,
                      }))
                    }
                  />
                </div>
                <div>
                  <Label>Confirm password</Label>
                  <Input
                    type="password"
                    className="mt-1.5"
                    value={password.passwordConfirmation}
                    required
                    onChange={(event) =>
                      setPassword((p) => ({
                        ...p,
                        passwordConfirmation: event.target.value,
                      }))
                    }
                  />
                </div>
                <div className="pt-2">
                  <ButtonPrimary type="submit">Update password</ButtonPrimary>
                </div>
              </div>
            </form>
          </div>
        </CommonLayout>
      </CheckAuth>
    </div>
  );
};

export default AccountPass;
