import Axios from '@axios/index';
import { Button, NumberInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { useSWRConfig } from 'swr'

const AdminBusRegionCreateNew = () => {
    const { mutate } = useSWRConfig()
    const CreateNewRegionForm = useForm({
        initialValues: {
            Name: '',
            PerMile: 0,
            SqMiles: 0,
        },
        validate: {
            Name: (value) => {
                if (!value) {
                    return 'Region Name is required';
                }
            },
        },
    });

    const HandleCreateNewRegion = async (e) => {
        if (CreateNewRegionForm.validate()) {
            const api = Axios.init();
            const { data } = await api.auth.createRegion(e);
            CreateNewRegionForm.reset();
            showNotification({
                message: data?.message,
            });
            mutate('/auth/regions/get-all-regions')
        }
    };

    return (
        <div className=' bps-w-full bps-flex bps-flex-col bps-gap-3'>
            <form
                onSubmit={CreateNewRegionForm.onSubmit((values) =>
                    HandleCreateNewRegion(values),
                )}
                className=' bps-flex bps-flex-col bps-gap-3'
            >
                <TextInput
                    label='Region Name'
                    required
                    placeholder='Name'
                    className='bps-w-full'
                    {...CreateNewRegionForm.getInputProps('Name')}
                />
                <NumberInput
                    label='Per Mile'
                    required
                    placeholder='Per Mile'
                    className='bps-w-full'
                    hideControls
                    precision={2}
                    min={0}
                    {...CreateNewRegionForm.getInputProps('PerMile')}
                />
                <NumberInput
                    label='Region Size (Sq Miles)'
                    required
                    placeholder='Sq Miles'
                    className='bps-w-full'
                    hideControls
                    precision={2}
                    min={0}
                    {...CreateNewRegionForm.getInputProps('SqMiles')}
                />
                <Button type='submit' variant='outline' color='blue'>
                    Create Region
                </Button>
            </form>
        </div>
    );
};

export default AdminBusRegionCreateNew;
