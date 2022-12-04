import Axios from '@axios/index';
import { timings } from '@components/common/staticData';
import { Button, NumberInput, Select, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';

const AdminBusRouteCreateNew = () => {
    const CreateNewRouteForm = useForm({
        initialValues: {
            routeFrom: '',
            routeTo: '',
            routeTimings: '',
            busName: '',
            busType: '',
            busSeats: null,
            busFare: null,
            busDistance: null,
            busNumber: '',
            busOperatorName: '',
            busOperatorNumber: null,
        },
        validate: {
            routeFrom: (value) => {
                if (!value) {
                    return 'Route From is required';
                }
            },
            routeTo: (value) => {
                if (!value) {
                    return 'Route To is required';
                }
            },
            routeTimings: (value) => {
                if (!value) {
                    return 'Route Timings is required';
                }
            },
            busName: (value) => {
                if (!value) {
                    return 'Bus Name is required';
                }
            },
            busType: (value) => {
                if (!value) {
                    return 'Bus Type is required';
                }
            },
            busSeats: (value) => {
                if (!value) {
                    return 'Bus Seats is required';
                }
            },
            busFare: (value) => {
                if (!value) {
                    return 'Bus Fare is required';
                }
            },
            busDistance: (value) => {
                if (!value) {
                    return 'Bus Distance is required';
                }
            },
            busNumber: (value) => {
                if (!value) {
                    return 'Bus Number is required';
                }
            },
            busOperatorName: (value) => {
                if (!value) {
                    return 'Bus Operator Name is required';
                }
            },
            busOperatorNumber: (value) => {
                if (!value) {
                    return 'Bus Operator Number is required';
                }
            },
        },
        transformValues: (values) => {
            return {
                From: values.routeFrom,
                To: values.routeTo,
                Timings: values.routeTimings,
                BusName: `${values.routeFrom} - ${values.routeTo} - ${values.busName}`,
                BusType: values.busType,
                BusSeats: values.busSeats,
                BusFare: values.busFare,
                BusDistance: values.busDistance,
                BusNumber: values.busNumber,
                BusOperatorName: values.busOperatorName,
                BusOperatorNumber: values.busOperatorNumber,
            };
        },
    });

    const HandleCreateNewRoute = async (e) => {
        if (CreateNewRouteForm.validate()) {
            const api = Axios.init();
            const { data } = await api.auth.createRoutes(e);
            CreateNewRouteForm.reset();
            showNotification({
                title: data?.message,
            });
        }
    };

    return (
        <div className=' bps-w-full bps-flex bps-flex-col bps-gap-3'>
            <form
                onSubmit={CreateNewRouteForm.onSubmit((values) =>
                    HandleCreateNewRoute(values),
                )}
                className=' bps-flex bps-flex-col bps-gap-3'
            >
                <TextInput
                    label='From'
                    required
                    placeholder='From'
                    className='bps-w-full'
                    {...CreateNewRouteForm.getInputProps('routeFrom')}
                />

                <TextInput
                    label='To'
                    required
                    placeholder='To'
                    className='bps-w-full'
                    {...CreateNewRouteForm.getInputProps('routeTo')}
                />
                <Select
                    label='Timings'
                    placeholder='Select Timings'
                    required
                    className='bps-w-full'
                    {...CreateNewRouteForm.getInputProps('routeTimings')}
                    data={timings}
                />
                <TextInput
                    label='Bus Name'
                    required
                    placeholder='Bus Name'
                    className='bps-w-full'
                    description={`${
                        CreateNewRouteForm.getInputProps('routeFrom').value
                    } - ${
                        CreateNewRouteForm.getInputProps('routeTo').value
                    } - ${CreateNewRouteForm.getInputProps('busName').value}`}
                    value={CreateNewRouteForm.getInputProps('busName').value}
                    onChange={(e) =>
                        CreateNewRouteForm.setFieldValue(
                            'busName',
                            e.target.value,
                        )
                    }
                    error={CreateNewRouteForm.getInputProps('busName').error}
                />
                <TextInput
                    label='Bus Type'
                    required
                    placeholder='Bus Type'
                    className='bps-w-full'
                    {...CreateNewRouteForm.getInputProps('busType')}
                />
                <NumberInput
                    withAsterisk
                    label='Bus Seats'
                    required
                    placeholder='Bus Seats'
                    min={0}
                    hideControls
                    {...CreateNewRouteForm.getInputProps('busSeats')}
                />
                <NumberInput
                    min={0}
                    hideControls
                    label='Bus Fare'
                    required
                    placeholder='Bus Fare'
                    description='Per Mile'
                    className='bps-w-full'
                    {...CreateNewRouteForm.getInputProps('busFare')}
                />
                <NumberInput
                    min={0}
                    hideControls
                    label='Total Distance'
                    required
                    placeholder='Total Distance'
                    description='Miles'
                    className='bps-w-full'
                    {...CreateNewRouteForm.getInputProps('busDistance')}
                />
                <TextInput
                    label='Bus Number'
                    required
                    placeholder='Bus Number'
                    className='bps-w-full'
                    {...CreateNewRouteForm.getInputProps('busNumber')}
                />
                <TextInput
                    label='Bus Operator Name'
                    required
                    placeholder='Bus Operator Name'
                    className='bps-w-full'
                    {...CreateNewRouteForm.getInputProps('busOperatorName')}
                />
                <NumberInput
                    withAsterisk
                    label='Bus Operator Number'
                    required
                    placeholder='Bus Operator Number'
                    min={0}
                    hideControls
                    {...CreateNewRouteForm.getInputProps('busOperatorNumber')}
                />

                <Button type='submit' variant='outline' color='blue'>
                    Create Route
                </Button>
            </form>
        </div>
    );
};

export default AdminBusRouteCreateNew;
