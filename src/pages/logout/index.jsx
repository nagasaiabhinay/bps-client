import Auth from "@components/auth";
import AuthLayout from "@components/layouts/authlayout";
import RootLayout from "@components/layouts/rootLayout";
import { showNotification } from "@mantine/notifications";
import { useGlobalStore } from "@store/index";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from 'next/router';

function LogoutScreen() {
  const router = useRouter();
  const reset = useGlobalStore((state) => state.reset);

  // React.useEffect(() => {
  //   signOut();
  //     reset();
  //     showNotification({
  //       title: "Logged out",
  //       message: "You have been logged out",
  //     });
  //     router.replace("/auth");
  // }, []);

  return <Auth />;
}

export default LogoutScreen;

LogoutScreen.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};
