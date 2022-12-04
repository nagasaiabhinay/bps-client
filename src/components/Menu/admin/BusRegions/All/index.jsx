import { Button, Table, TextInput } from '@mantine/core';
import React from 'react';
import useSWR from 'swr';
import TableRow from './tableRow';

const AdminBusRegionsAll = () => {
    const { data, isValidating,mutate } = useSWR('/auth/regions/get-all-regions');

    const [search, setSearch] = React.useState('');

    return (
        <div className=" bps-w-full bps-flex bps-flex-col bps-gap-3">
            <div className=" bps-flex bps-flex-row bps-items-center bps-gap-3">
                <TextInput value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search" className="bps-w-full" />
            </div>
            <Table highlightOnHover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Region</th>
                    </tr>
                </thead>
                <tbody>{data && data?.regions?.filter((_, i) => _.Name.toLowerCase().includes(search.toLowerCase()))?.map((_, i) => <TableRow  key={i} item={_} />)}</tbody>
            </Table>
        </div>
    );
};

export default AdminBusRegionsAll;
