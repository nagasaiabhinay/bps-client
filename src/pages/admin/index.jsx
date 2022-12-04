import RootLayout from '@components/layouts/rootLayout';
import Admin from '@components/Menu/admin';
import { ProtectedRoute } from '@hooks/routesValidator';
import { useGlobalStore } from '@store/index';
import {Text,Title,List} from '@mantine/core'
import NotFoundPage from '@components/404';

const AdminScreen = () => {

    const user = useGlobalStore(e => e.user);

    return  user?.Role?.includes('admin') ? <Admin /> : <NotFoundPage/>;
}

export default AdminScreen;

AdminScreen.getLayout = function getLayout(page) {
    return (
        <ProtectedRoute>
            <RootLayout>{page}</RootLayout>
        </ProtectedRoute>
    );
};
