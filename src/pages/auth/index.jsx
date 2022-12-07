import Login from "@components/auth";
import AuthLayout from "@components/layouts/authlayout";
import { useGlobalStore } from "@store/index";
import React from "react";

function AuthScreen() {
  const reset = useGlobalStore((e) => e.reset);

  React.useEffect(() => {
    reset();
  }, []);

  return <Login />;
}

export default AuthScreen;

AuthScreen.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};
