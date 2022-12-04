import Home from '@components/home';
import RootLayout from '@components/layouts/rootLayout';
import { ProtectedRoute } from '@hooks/routesValidator';

export default function HomeScreen() {
    return <Home />;
}

HomeScreen.getLayout = function getLayout(page) {
    return (
        <ProtectedRoute>
            <RootLayout>{page}</RootLayout>
        </ProtectedRoute>
    );
};
