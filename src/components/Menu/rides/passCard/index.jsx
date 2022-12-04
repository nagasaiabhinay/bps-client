import { Button, Card, Image, Text } from '@mantine/core';
import { useGlobalStore } from '@store/index';
import jwt from 'jsonwebtoken';
import QRCode from 'qrcode';
import React from 'react';

export default function PassCard(p) {
    const props = {
        key: p.key,
        item: p.item,
    };
    const user = useGlobalStore((state) => state.user);

    const QRData = jwt.sign(
        {
            ...props?.item,
            userID: user?._id,
            userName: user?.Name,
            userEmail: user?.Email,
            QRExpiryTime: new Date().getTime() + 10 * 60 * 1000,
        },
        'decodePass',
    );

    const [qrURL, setQRURL] = React.useState('');
    const active = props?.item?.passStatus === 'active';

    const createQR = async () => {
        const qr = await QRCode.toDataURL(
            `${window.location.origin}/verifyPass?token=${QRData}`,
        );
        setQRURL(qr);
    };

    return (
        <Card
            key={props.key}
            className=' bps-flex bps-flex-col bps-items-center bps-gap-3'
        >
            <Image
                width={400}
                height={400}
                withPlaceholder
                className=' bps-rounded-lg'
                src={active ? qrURL : ''}
            />
            <div className='bps-w-full'>
                <Text>Pass Category = {props?.item?.category}</Text>
                {props?.item?.category === 'region' && (
                    <Text>Region = {props?.item?.details?.passRegion}</Text>
                )}
                {props?.item?.category === 'a2b' && (
                    <Text>
                        From = {props?.item?.details?.passFrom} To ={' '}
                        {props?.item?.details?.passTo}
                    </Text>
                )}
                <Text>Pass Type = {props?.item?.passType}</Text>
                <Text>Pass Status = {props?.item?.passStatus}</Text>
                <Text>Pass expiry Date = {props?.item?.endDate}</Text>
                <a target="_blank" href={`${window.location.origin}/verifyPass?token=${QRData}`}>
                    open
                </a>
            </div>
            <Button
                className='bps-w-full'
                disabled={!active}
                onClick={active ? createQR : null}
            >
                {active ? 'Create QR' : 'Expired'}
            </Button>
        </Card>
    );
}
