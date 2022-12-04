import { Tabs } from '@mantine/core';
import AdminBusRegionAll from './All';
import AdminBusRegionCreateNew from './CreateNew';

const AdminBusRegions = () => {
    const AdminBusRegionsTabsList = [
        {
            label: 'All',
            value: 'all',
            component: <AdminBusRegionAll />,
        },
        {
            label: 'Create New',
            value: 'create-new',
            component: <AdminBusRegionCreateNew />,
        },
    ];

    return (
        <div className=' bps-w-full bps-h-full'>
            <Tabs
                variant='pills'
                defaultValue={AdminBusRegionsTabsList[0].value}
                className=' bps-h-full'
            >
                <Tabs.List grow>
                    {AdminBusRegionsTabsList.map((_, i) => (
                        <Tabs.Tab value={_?.value}>{_?.label}</Tabs.Tab>
                    ))}
                </Tabs.List>
                {AdminBusRegionsTabsList.map((_, i) => (
                    <Tabs.Panel value={_?.value} className='bps-p-3'>
                        {_?.component}
                    </Tabs.Panel>
                ))}
            </Tabs>
        </div>
    );
};

export default AdminBusRegions;
