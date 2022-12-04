import Auth from '@components/auth';
import RootLayout from '@components/layouts/rootLayout';
import { showNotification } from '@mantine/notifications';
import { useGlobalStore } from '@store/index';
import React from 'react';
import { auth } from 'src/config/firebase';

function LogoutScreen() {
    const reset = useGlobalStore((state) => state.reset);
    React.useEffect(() => {
        auth.signOut().then(() => {
            reset();
            showNotification({
                title: 'Logged out',
                message: 'You have been logged out',
            });
        });
    });

    return <Auth />;
}

export default LogoutScreen;

LogoutScreen.getLayout = function getLayout(page) {
    return <RootLayout>{page}</RootLayout>;
};
