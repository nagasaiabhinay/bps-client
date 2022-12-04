import { Divider, SimpleGrid, Title } from '@mantine/core';
import { useGlobalStore } from '@store/index';
import useSWR from 'swr';
import PassCard from './passCard';
import { useRouter } from 'next/router';

const Rides = () => {


    const user = useGlobalStore((state) => state.user);
    const { data, isValidating } = useSWR(
        `/auth/passes/get-all-passes?userID=${user?._id}`,
    );
    return (
        <>
            <div className=' bps-w-full bps-flex bps-flex-col bps-gap-3'>
                <div className=' bps-h-full bps-flex bps-flex-col bps-items-center bps-gap-3'>
                    <Title>Rides</Title>
                    <Divider className=' bps-w-full' />
                </div>
                <SimpleGrid cols={4} p='3'>
                    {data &&
                        data?.passes?.map((_, i) => (
                            <PassCard key={i} item={_} />
                        ))}
                </SimpleGrid>
            </div>
        </>
    );
};

export default Rides;
