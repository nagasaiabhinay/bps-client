import RootLayout from '@components/layouts/rootLayout';
import Rides from '@components/Menu/rides';
import { ProtectedRoute } from '@hooks/routesValidator';

function RidesScreen() {
    return <Rides />;
}

export default RidesScreen;

RidesScreen.getLayout = function getLayout(page) {
    return (
        <ProtectedRoute>
            <RootLayout>{page}</RootLayout>
        </ProtectedRoute>
    );
};
