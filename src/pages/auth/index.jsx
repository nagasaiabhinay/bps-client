import Login from '@components/auth';
import AuthLayout from '@components/layouts/authlayout';

function AuthScreen() {
    return <Login />;
}

export default AuthScreen;

AuthScreen.getLayout = function getLayout(page) {
    return <AuthLayout>{page}</AuthLayout>;
}