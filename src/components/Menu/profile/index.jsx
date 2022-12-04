import { Avatar, Divider, Text, Title } from '@mantine/core';

const Profile = () => {
    return (
        <>
            <div className=' bps-h-full bps-flex bps-flex-col bps-items-center bps-gap-3'>
                <Title>Profile</Title>
                <Divider className=' bps-w-full' />
                <div className={` bps-w-full  bps-flex bps-flex-row bps-gap-3`}>
                    <div>
                        <Avatar className={` bps-rounded-full`} size={350} />
                    </div>
                    <div>
                        <Title>Name</Title>
                        <Text>Email</Text>
                        <Text>Phone Number</Text>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
