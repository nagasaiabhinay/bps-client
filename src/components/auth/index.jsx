import Axios from '@axios/index';
import { Button, Card, Group, Text, useMantineTheme } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useGlobalStore } from '@store/index';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/router';
import React from 'react';
import { auth } from 'src/config/firebase';

export default function Auth() {
    const router = useRouter();
    const theme = useMantineTheme();
    const [loading, setLoading] = React.useState(false);
    const setUser = useGlobalStore((state) => state.setUser);
    const setToken = useGlobalStore((state) => state.setToken);

    const LoginWithGoogle = async () => {
        const api = Axios.init();
        signInWithPopup(auth, new GoogleAuthProvider())
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
                    title: 'Login Successful',
                    message: 'Welcome to the Bus Pass System',
                });
                router.push('/');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                console.error(errorCode, errorMessage);
            });
    };

    return (
        <Card className=' bps-w-[80%]  bps-flex bps-flex-col bps-gap-3'>
            <Text component='h1' color={theme.primaryColor}>
                <span className=' bps-text-4xl'>Login / Sign Up</span>
            </Text>
            <div id='recaptcha-container'></div>
            <div className=' bps-flex bps-flex-col bps-flex-1 bps-gap-3'>
                <Group className=' bps-flex bps-flex-col bps-flex-1 bps-gap-3'>
                    <Button fullWidth onClick={LoginWithGoogle}>
                        continue with Google
                    </Button>
                </Group>
            </div>
        </Card>
    );
}
