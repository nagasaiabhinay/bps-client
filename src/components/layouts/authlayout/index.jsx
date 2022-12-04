import { BackgroundImage } from '@mantine/core';

export default function AuthLayout({ children }) {
    return (
        <div className=' bps-flex bps-flex-row bps-w-screen bps-h-screen'>
            <BackgroundImage
                className=' bps-h-full bps-flex bps-flex-row'
                src='null'
            >
                <div className='bps-w-full lg:bps-w-[50%] xl:bps-w-[30%] center bps-transition-all bps-duration-500 bps-p-0'>
                    <div className='bps-flex bps-flex-col lg:bps-rounded-tr-xl lg:bps-rounded-br-xl bps-items-center bps-justify-between bps-w-full bps-h-full center bps-transition-all bps-duration-500'>
                        <div className=' bps-w-full bps-flex bps-items-center bps-justify-center'>
                            <h1>Bus Pass System</h1>
                        </div>
                        <div className='bps-flex bps-items-center bps-justify-center bps-w-full bps-h-full'>
                            {children}
                        </div>
                    </div>
                </div>
                <div className=' bps-w-0  lg:bps-w-[50%]  xl:bps-w-[70%] bps-hidden lg:bps-flex bps-duration-500 center bps-transition-all'>
                    {/* <BackgroundImage
                        className=' bps-h-full'
                        src='https://images.hdqwalls.com/wallpapers/red-black-vector-5k-d1.jpg'
                    ></BackgroundImage> */}
                </div>
            </BackgroundImage>
        </div>
    );
}
