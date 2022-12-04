import Axios from '@axios/index';
import { timings } from '@components/common/staticData';

import { Button, createStyles, Group, Modal, NumberInput, Select, Switch, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import React from 'react';

const useStyles = createStyles((theme) => ({
    body: {
        display: 'flex',
        alignItems: 'center'
    },

    track: {
        width: 40,
        height: 6,
        overflow: 'visible'
    },

    thumb: {
        width: 20,
        height: 20,
        left: -2,
        transition: 'background-color 100ms ease, left 100ms ease',

        'input:checked + * > &': {
            backgroundColor: theme.fn.primaryColor()
        }
    }
}));

const TableRow = (p) => {
    const { classes } = useStyles();
    const [opened, setOpened] = React.useState(false);
    const [editMode, setEditMode] = React.useState(false);

    const props = {
        key: p.key,
        item: p.item
    };

    const EditRouteForm = useForm({
        initialValues: {
            routeFrom: props.item.From || '',
            routeTo: props.item.To || '',
            routeTimings: props.item.Timings || '',
            busName: props.item.Bus.Name || '',
            busType: props.item.Bus.Type || '',
            busSeats: parseInt(props.item.Bus.Seats) || null,
            busFare: parseInt(props.item.Bus.Fare) || null,
            busNumber: props.item.Bus.Number || '',
            busOperatorName: props.item.BusOperator.Name || '',
            busOperatorNumber: parseInt(props.item.BusOperator.Number) || null
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
            }
        },
        transformValues: (values) => {
            return {
                From: values.routeFrom,
                To: values.routeTo,
                Timings: values.routeTimings,
                BusName: values.busName,
                BusType: values.busType,
                BusSeats: values.busSeats,
                BusFare: values.busFare,
                BusNumber: values.busNumber,
                BusOperatorName: values.busOperatorName,
                BusOperatorNumber: values.busOperatorNumber
            };
        }
    });

    const HandleEditRoute = async (e) => {
        if (EditRouteForm.validate()) {
            const api = Axios.init();
            const { data } = await api.auth.updateRouteById(props?.item?._id, e);
            showNotification({
                title: data?.message
            });
            setOpened(false);
        }
    };

    return (
        <>
            <tr key={props.key}>
                <th
                    className="bps-text-start hover:bps-underline bps-cursor-pointer"
                    onClick={() => {
                        setOpened(true);
                        setEditMode(false);
                    }}
                >
                    {props?.item?.Bus?.Name}
                </th>
                <th className="bps-text-start">{props?.item?.From}</th>
                <th className="bps-text-start">{props?.item?.To}</th>
                <th className="bps-text-start">
                    {props?.item?.Timings === 'EVERY-15-MIN'
                        ? 'Every 15 Minutes'
                        : props?.item?.Timings === 'EVERY-30-MIN'
                        ? 'Every 30 Minutes'
                        : props?.item?.Timings === 'EVERY-1-HOUR'
                        ? 'Every 1 Hour'
                        : props?.item?.Timings === 'EVERY-2-HOUR'
                        ? 'Every 2 Hour'
                        : null}
                </th>
            </tr>
            <Modal
                overflow="inside"
                size="lg"
                opened={opened}
                onClose={() => {
                    setOpened(false);
                    setEditMode(false);
                }}
                title={`${props?.item?.Bus?.Name}`}
            >
                <div>
                    <Group position="center" p="md">
                        <Switch
                            checked={editMode}
                            onChange={(e) => {
                                setEditMode(e.target.checked);
                            }}
                            value={true}
                            label="Edit Mode"
                            classNames={classes}
                        />
                    </Group>
                </div>
                <form onSubmit={EditRouteForm.onSubmit((values) => HandleEditRoute(values))} className=" bps-flex bps-flex-col bps-gap-3">
                    <TextInput
                        variant={!editMode ? 'unstyled' : 'default'}
                        readOnly={!editMode}
                        label="From"
                        withAsterisk={editMode}
                        placeholder="From"
                        className="bps-w-full"
                        {...EditRouteForm.getInputProps('routeFrom')}
                    />

                    <TextInput
                        variant={!editMode ? 'unstyled' : 'default'}
                        readOnly={!editMode}
                        label="To"
                        withAsterisk={editMode}
                        placeholder="To"
                        className="bps-w-full"
                        {...EditRouteForm.getInputProps('routeTo')}
                    />
                    <Select
                        variant={!editMode ? 'unstyled' : 'default'}
                        readOnly={!editMode}
                        label="Timings"
                        placeholder="Select Timings"
                        withAsterisk={editMode}
                        className="bps-w-full"
                        {...EditRouteForm.getInputProps('routeTimings')}
                        data={timings}
                    />
                    <TextInput
                        variant={!editMode ? 'unstyled' : 'default'}
                        readOnly={!editMode}
                        label="Bus Name"
                        withAsterisk={editMode}
                        placeholder="Bus Name"
                        className="bps-w-full"
                        {...EditRouteForm.getInputProps('busName')}
                    />
                    <TextInput
                        variant={!editMode ? 'unstyled' : 'default'}
                        readOnly={!editMode}
                        label="Bus Type"
                        withAsterisk={editMode}
                        placeholder="Bus Type"
                        className="bps-w-full"
                        {...EditRouteForm.getInputProps('busType')}
                    />
                    <NumberInput
                        variant={!editMode ? 'unstyled' : 'default'}
                        readOnly={!editMode}
                        label="Bus Seats"
                        withAsterisk={editMode}
                        placeholder="Bus Seats"
                        min={0}
                        hideControls
                        {...EditRouteForm.getInputProps('busSeats')}
                    />
                    <NumberInput
                        variant={!editMode ? 'unstyled' : 'default'}
                        readOnly={!editMode}
                        min={0}
                        hideControls
                        label="Bus Fare"
                        withAsterisk={editMode}
                        placeholder="Bus Fare"
                        description="Per KM/Mile"
                        className="bps-w-full"
                        {...EditRouteForm.getInputProps('busFare')}
                    />
                    <TextInput
                        variant={!editMode ? 'unstyled' : 'default'}
                        readOnly={!editMode}
                        label="Bus Number"
                        withAsterisk={editMode}
                        placeholder="Bus Number"
                        className="bps-w-full"
                        {...EditRouteForm.getInputProps('busNumber')}
                    />
                    <TextInput
                        variant={!editMode ? 'unstyled' : 'default'}
                        readOnly={!editMode}
                        label="Bus Operator Name"
                        withAsterisk={editMode}
                        placeholder="Bus Operator Name"
                        className="bps-w-full"
                        {...EditRouteForm.getInputProps('busOperatorName')}
                    />
                    <NumberInput
                        variant={!editMode ? 'unstyled' : 'default'}
                        readOnly={!editMode}
                        label="Bus Operator Number"
                        withAsterisk={editMode}
                        placeholder="Bus Operator Number"
                        min={0}
                        hideControls
                        {...EditRouteForm.getInputProps('busOperatorNumber')}
                    />

                    {editMode && (
                        <Button type="submit" variant="outline" color="blue">
                            Update Route
                        </Button>
                    )}
                </form>
            </Modal>
        </>
    );
};

export default TableRow;
