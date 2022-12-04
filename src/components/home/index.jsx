import TeamDetails from '@components/teamDetails';
import { Divider, Title } from '@mantine/core';

const Home = () => {
    return (
        <div className=' bps-h-full bps-flex bps-flex-col bps-gap-3'>
            <Title align='center'>BusPass System</Title>
            <Divider className=' bps-w-full' />
            <TeamDetails/>
        </div>
    );
};

export default Home;
