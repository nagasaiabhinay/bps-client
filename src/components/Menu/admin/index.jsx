import { Divider, Tabs, Title } from '@mantine/core';
import AdminBusRegions from './BusRegions';
import AdminBusRoutes from './BusRoutes';

const Admin = () => {
    const AdminTabsList = [
        {
            label: 'Bus Routes',
            value: 'bus-routes',
            component: <AdminBusRoutes />,
        },
        {
            label: 'Regions',
            value: 'regions',
            component: <AdminBusRegions />,
        },
    ];

    return (
        <>
            <div className=' bps-h-full bps-flex bps-flex-col bps-items-center bps-gap-3'>
                <Title>Admin</Title>
                <Divider className=' bps-w-full' />
                <div className=' bps-w-full bps-h-full'>
                    <Tabs
                        variant='pills'
                        defaultValue={AdminTabsList[0].value}
                        className=' bps-h-full'
                    >
                        <Tabs.List grow>
                            {AdminTabsList.map((_, i) => (
                                <Tabs.Tab value={_?.value}>{_?.label}</Tabs.Tab>
                            ))}
                        </Tabs.List>
                        {AdminTabsList.map((_, i) => (
                            <Tabs.Panel value={_?.value} className='bps-p-3'>
                                {_?.component}
                            </Tabs.Panel>
                        ))}
                    </Tabs>
                </div>
            </div>
        </>
    );
};

export default Admin;
