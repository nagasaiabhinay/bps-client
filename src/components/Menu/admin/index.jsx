import TeamDetails from '@components/teamDetails';
import { Divider, Tabs, Title } from '@mantine/core';
import AdminBusRegions from './BusRegions';
import AdminBusRoutes from './BusRoutes';

const Admin = () => {

    return (
        <>
            <div className=' bps-h-full bps-flex bps-flex-col bps-items-center bps-gap-3'>
                <Title>Admin</Title>
                <Divider className=' bps-w-full' />
                <TeamDetails/>
            </div>
        </>
    );
};

export default Admin;
