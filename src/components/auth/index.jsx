import Axios from "@axios/index";
import { Button, Card, Group, Text, useMantineTheme } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useGlobalStore } from "@store/index";
import { useRouter } from "next/router";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { v4 as uuidv4 } from "uuid";

export default function Auth() {
  const router = useRouter();
  const theme = useMantineTheme();
  const { data: session } = useSession();
  const [loading, setLoading] = React.useState(false);
  const user = useGlobalStore((state) => state.user);
  const setUser = useGlobalStore((state) => state.setUser);
  const setToken = useGlobalStore((state) => state.setToken);
  const token = useGlobalStore((state) => state.token);

  const CreateUser = async () => {
    const api = Axios.init();
    const { data } = await api.auth.createUser({
      Email: session?.user?.email,
      Name: session?.user?.name,
      firebaseUID: uuidv4(),
    });
    await setUser(data.user);
    await setToken(data.token);
    await showNotification({
      title: "Login Successful",
      message: "Welcome to the Bus Pass System",
    });
    setLoading(false);
    router.push("/");
  };

  React.useEffect(() => {
      if (session?.user) {
        if (!user) {
          if (!token) {
            setLoading(true);
            CreateUser();
          }
        }
      }
  }, [session]);

 

  return (
    <Card className=" bps-w-[80%]  bps-flex bps-flex-col bps-gap-3">
      <Text component="h1" color={theme.primaryColor}>
        <span className=" bps-text-4xl">Login / Sign Up</span>
      </Text>
      <div className=" bps-flex bps-flex-col bps-flex-1 bps-gap-3">
        <Group className=" bps-flex bps-flex-col bps-flex-1 bps-gap-3">
          {!loading &&
            (session ? (
              <Button onClick={() => signOut()}>Sign Out</Button>
            ) : (
              <Button onClick={() => signIn()}>SignIn with Google</Button>
            ))}
        </Group>
      </div>
    </Card>
  );
}
