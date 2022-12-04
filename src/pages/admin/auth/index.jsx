import Login from '@components/auth';
import AuthLayout from '@components/layouts/authlayout';
import { PublicRoute } from '@hooks/routesValidator';

function AuthScreen() {
    return <Login />;
}

export default AuthScreen;

AuthScreen.getLayout = function getLayout(page) {
    return (
        <PublicRoute>
            <AuthLayout>{page}</AuthLayout>
        </PublicRoute>
    );
};
