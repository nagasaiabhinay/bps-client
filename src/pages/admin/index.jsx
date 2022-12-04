import RootLayout from '@components/layouts/rootLayout';
import Admin from '@components/Menu/admin';
import { ProtectedRoute } from '@hooks/routesValidator';

function AdminScreen() {
    return <Admin />;
}

export default AdminScreen;

AdminScreen.getLayout = function getLayout(page) {
    return (
        <ProtectedRoute>
            <RootLayout>{page}</RootLayout>
        </ProtectedRoute>
    );
};
