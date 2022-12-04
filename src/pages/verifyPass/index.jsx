import { Container, Text } from '@mantine/core';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/router';
import React from 'react';
import Lottie from 'react-lottie';
import NotVerified from '../../public/NotVerified.json';
import Verified from '../../public/Verified.json';

export default function VerifyPass() {
    const router = useRouter();

    const [data, setData] = React.useState({
        ValidQR: false,
        ValidPass: false,
        pass: {},
    });

    const [isCompleted, setIsCompleted] = React.useState(false);


    const { token } = router.query;
    React.useEffect(() => {
        const res = jwt.decode(token);

        if (res?.QRExpiryTime < new Date().getTime()) {
            setData((prev) => ({
                ...prev,
                ValidQR: false,
            }));
        } else {
            setData((prev) => ({
                ...prev,
                ValidQR: true,
                pass: res,
            }));
        }

        if (res?.endDate < new Date().getTime()) {
            setData((prev) => ({
                ...prev,
                ValidPass: false,
            }));
        } else {
            setData((prev) => ({
                ...prev,
                ValidPass: true,
            }));
        }
    }, [token]);

    return (
        <div className=' bps-w-screen bps-h-screen bps-flex bps-flex-col bps-items-center bps-justify-center bps-overflow-hidden'>
            {data?.ValidQR && data?.ValidPass ? (
                <Lottie
                    options={{
                        loop: false,
                        autoplay: true,
                        animationData: Verified,
                        rendererSettings: {
                            preserveAspectRatio: 'xMidYMid slice',
                        },
                    }}
                    eventListeners={[
                        {
                            eventName: 'complete',
                            callback: () => {
                                setIsCompleted(true);
                            },
                        },
                    ]}
                    height={400}
                    width={400}
                />
            ) : (
                <Lottie
                    options={{
                        loop: false,
                        autoplay: true,
                        animationData: NotVerified,
                        rendererSettings: {
                            preserveAspectRatio: 'xMidYMid slice',
                        },
                    }}
                    eventListeners={[
                        {
                            eventName: 'complete',
                            callback: () => {
                                setIsCompleted(true);
                            },
                        },
                    ]}
                    height={400}
                    width={400}
                />
            )}

            {isCompleted && data?.ValidQR && data?.ValidPass && (
                <>
                    <Container>
                        <div className='bps-w-full bps-text-3xl'>
                            <Text>Pass Category: {data?.pass?.category}</Text>
                            {data?.pass?.category === 'a2b' && (
                                <>
                                <Text>From: {data?.pass?.details?.passFrom}</Text>
                                <Text>To: {data?.pass?.details?.passTo}</Text>
                                </>
                            )}
                            {data?.pass?.category === 'region' && (
                                <>
                                <Text>Region: {data?.pass?.details?.passRegion}</Text>
                                </>
                            )}
                        </div>
                    </Container>
                </>
            )}
        </div>
    );
}
