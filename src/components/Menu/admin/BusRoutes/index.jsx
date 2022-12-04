import { Tabs } from '@mantine/core';
import AdminBusRouteAll from './All';
import AdminBusRouteCreateNew from './CreateNew';

function AdminBusRoutes() {
    const AdminBusRoutesTabsList = [
        {
            label: 'All',
            value: 'all',
            component: <AdminBusRouteAll />,
        },
        {
            label: 'Create New',
            value: 'create-new',
            component: <AdminBusRouteCreateNew />,
        },
    ];

    return (
        <div className=' bps-w-full bps-h-full'>
            <Tabs
                variant='pills'
                defaultValue={AdminBusRoutesTabsList[0].value}
                className=' bps-h-full'
            >
                <Tabs.List grow>
                    {AdminBusRoutesTabsList.map((_, i) => (
                        <Tabs.Tab value={_?.value}>{_?.label}</Tabs.Tab>
                    ))}
                </Tabs.List>
                {AdminBusRoutesTabsList.map((_, i) => (
                    <Tabs.Panel value={_?.value} className='bps-p-3'>
                        {_?.component}
                    </Tabs.Panel>
                ))}
            </Tabs>
        </div>
    );
}

export default AdminBusRoutes;
