import RootLayout from '@components/layouts/rootLayout';
import Admin from '@components/Menu/admin';
import { ProtectedRoute } from '@hooks/routesValidator';
import { useGlobalStore } from '@store/index';
import {Text,Title,List,Divider, Tabs} from '@mantine/core'
import NotFoundPage from '@components/404';
import AdminBusRegionsAll from '@components/Menu/admin/BusRegions/All';
import AdminBusRegionCreateNew from '@components/Menu/admin/BusRegions/CreateNew';
import AdminBusRouteCreateNew from '@components/Menu/admin/BusRoutes/CreateNew';

const CreateNewRouteScreen = () => {

    const user = useGlobalStore(e => e.user);

    return  user?.Role?.includes('admin') ? 
    <div className=' bps-h-full bps-flex bps-flex-col bps-items-center bps-gap-3'>
                <Title>Create New Route</Title>
                <Divider className=' bps-w-full' />
                <div className=' bps-w-full bps-h-full'>
                <AdminBusRouteCreateNew />
                </div>
            </div>
    
    
     : <NotFoundPage/>;
}

export default CreateNewRouteScreen;

CreateNewRouteScreen.getLayout = function getLayout(page) {
    return (
        <ProtectedRoute>
            <RootLayout>{page}</RootLayout>
        </ProtectedRoute>
    );
};
