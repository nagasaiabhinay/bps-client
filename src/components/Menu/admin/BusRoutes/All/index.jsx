import { Table, TextInput,Button } from '@mantine/core';
import React from 'react';
import useSWR from 'swr';
import TableRow from './tableRow';

const AdminBusRouteAll = () => {
    const { data, isValidating,mutate } = useSWR('/auth/routes/get-all-routes');

    const [search, setSearch] = React.useState('');

    return (
        <div className=" bps-w-full bps-flex bps-flex-col bps-gap-3">
            <div className=" bps-flex bps-flex-row bps-items-center bps-gap-3">
                <TextInput placeholder="Search" className=" bps-w-full" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>

            <Table highlightOnHover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Timings</th>
                    </tr>
                </thead>
                <tbody>{data && data?.Routes?.filter((_, i) => _.Bus.Name.toLowerCase().includes(search.toLowerCase()))?.map((_, i) => <TableRow key={i} item={_} />)}</tbody>
            </Table>
        </div>
    );
};

export default AdminBusRouteAll;
