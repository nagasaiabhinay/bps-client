import Axios from '@axios/index';
import { ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { NotificationsProvider } from '@mantine/notifications';
import { useThemeStore } from '@store/index';
import '@styles/globals.css';
import Head from 'next/head';
import React from 'react';
import { SWRConfig } from 'swr';

function MyApp({ Component, pageProps }) {
    const isBrowser = () => typeof window !== 'undefined';
    const api = Axios.init();
    const theme = useThemeStore((state) => state.theme);
    const [colorScheme, setColorScheme] = React.useState(theme);
    const toggleColorScheme = (value) =>
        setColorScheme(value || (colorScheme === 'light' ? 'dark' : 'light'));
    const getLayout = Component.getLayout || ((page) => page);

    return (
        <>
            <Head>
                <title>Bus Pass System</title>
            </Head>
            <SWRConfig
                value={{
                    revalidateIfStale: false,
                    revalidateOnFocus: true,
                    revalidateOnReconnect: false,
                    fetcher: (url) =>
                        api.global.get(url).then((res) => res.data),
                }}
            >
                <ColorSchemeProvider
                    colorScheme={colorScheme}
                    toggleColorScheme={toggleColorScheme}
                >
                    <MantineProvider
                        withGlobalStyles
                        withNormalizeCSS
                        theme={{
                            colorScheme,
                        }}
                    >
                        <NotificationsProvider>
                            <ModalsProvider>
                                <div className=' bps-flex bps-flex-col bps-relative bps-w-screen bps-h-screen'>
                                    {getLayout(<Component {...pageProps} />)}
                                </div>
                            </ModalsProvider>
                        </NotificationsProvider>
                    </MantineProvider>
                </ColorSchemeProvider>
            </SWRConfig>
        </>
    );
}

export default MyApp;
