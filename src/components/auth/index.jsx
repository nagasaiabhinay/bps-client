import Axios from "@axios/index";
import { Button, Card, Group, Text, useMantineTheme } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useGlobalStore } from "@store/index";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/router";
import React from "react";
import firebase from "src/config/firebase";
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
    router.push("/");
  }

  React.useEffect(() => {
    let ignore = false;
    if (!ignore) {
      console.log("0");
      if (session?.user) {
        console.log("1");
        if (!user) {
          console.log("2");
          if (!token) {
            console.log("3");
            console.log({
              Email: session?.user?.email,
              Name: session?.user?.name,
              firebaseUID: uuidv4(),
            });
            CreateUser()
          }
        }
      }
    }
    return () => {
      ignore = true;
    };
  }, [session]);

  const LoginWithGoogle = async () => {
    const api = Axios.init();
    signInWithPopup(firebase.auth, new GoogleAuthProvider())
      .then(async (result) => {
        const user = result.user;
        const { data } = await api.auth.createUser({
          Email: user.email,
          Name: user.displayName,
          firebaseUID: user.uid,
        });
        await setUser(data.user);
        await setToken(data.token);
        showNotification({
          title: "Login Successful",
          message: "Welcome to the Bus Pass System",
        });
        router.push("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.error(errorCode, errorMessage);
      });
  };

  return (
    <Card className=" bps-w-[80%]  bps-flex bps-flex-col bps-gap-3">
      <Text component="h1" color={theme.primaryColor}>
        <span className=" bps-text-4xl">Login / Sign Up</span>
      </Text>
      <div className=" bps-flex bps-flex-col bps-flex-1 bps-gap-3">
        <Group className=" bps-flex bps-flex-col bps-flex-1 bps-gap-3">
          {session ? (
            <Button onClick={() => signOut()}>Sign Out</Button>
          ) : (
            <Button onClick={() => signIn()}>SignIn with Google</Button>
          )}
        </Group>
      </div>
    </Card>
  );
}
