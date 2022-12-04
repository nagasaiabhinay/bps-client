import RootLayout from '@components/layouts/rootLayout';
import CreatePass from '@components/Menu/createpass';
import { ProtectedRoute } from '@hooks/routesValidator';
import { useGlobalStore } from '@store/index';
import NotFoundPage from '@components/404';

const CreatePassScreen=()=> {
    const user = useGlobalStore(e => e.user);
    return  user?.Role?.includes('customer') ? <CreatePass />: <NotFoundPage/>;
}

export default CreatePassScreen;

CreatePassScreen.getLayout = function getLayout(page) {
    return (
        <ProtectedRoute>
            <RootLayout>{page}</RootLayout>
        </ProtectedRoute>
    );
};
