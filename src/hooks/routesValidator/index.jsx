import { useGlobalStore } from '@store/index';
import { useRouter } from 'next/router';

export function ProtectedRoute({ children }) {
    const router = useRouter();
    const user = useGlobalStore.getState().user;
    const token = useGlobalStore.getState().token;
    const isBrowser = () => typeof window !== 'undefined';

    if (isBrowser() && !user && !token) {
        router.replace({
            pathname: '/auth',
            query: {
                redirect: router.pathname,
            },
        });
        return <h1>Loading...</h1>;
    }
    return children;
}

export function PublicRoute({ children }) {
    const router = useRouter();
    const user = useGlobalStore.getState().user;
    const isBrowser = () => typeof window !== 'undefined';

    const url = router.query.redirect || '/';

    if (isBrowser() && user) {
        router.replace(url);
        return <h1>Loading...</h1>;
    }
    return children;
}
