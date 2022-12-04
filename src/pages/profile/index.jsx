import RootLayout from '@components/layouts/rootLayout';
import Profile from '@components/Menu/profile';
import { ProtectedRoute } from '@hooks/routesValidator';

function ProfileScreen() {
    return <Profile />;
}

export default ProfileScreen;

ProfileScreen.getLayout = function getLayout(page) {
    return (
        <ProtectedRoute>
            <RootLayout>{page}</RootLayout>
        </ProtectedRoute>
    );
};
