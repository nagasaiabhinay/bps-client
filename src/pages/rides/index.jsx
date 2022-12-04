import RootLayout from '@components/layouts/rootLayout';
import Rides from '@components/Menu/rides';
import { ProtectedRoute } from '@hooks/routesValidator';
import { useGlobalStore } from '@store/index';
import NotFoundPage from '@components/404';

function RidesScreen() {
    const user = useGlobalStore(e => e.user);
    return  user?.Role?.includes('customer') ? <Rides />: <NotFoundPage/>;
}

export default RidesScreen;

RidesScreen.getLayout = function getLayout(page) {
    return (
        <ProtectedRoute>
            <RootLayout>{page}</RootLayout>
        </ProtectedRoute>
    );
};
