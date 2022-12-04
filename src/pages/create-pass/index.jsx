import RootLayout from '@components/layouts/rootLayout';
import CreatePass from '@components/Menu/createpass';
import { ProtectedRoute } from '@hooks/routesValidator';

function CreatePassScreen() {
    return <CreatePass />;
}

export default CreatePassScreen;

CreatePassScreen.getLayout = function getLayout(page) {
    return (
        <ProtectedRoute>
            <RootLayout>{page}</RootLayout>
        </ProtectedRoute>
    );
};
