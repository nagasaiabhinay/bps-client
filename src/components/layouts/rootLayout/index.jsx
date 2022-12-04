import React from 'react';
import RootLayoutBody from './body';
import RootLayoutSidebar from './sidebar';

export default function RootLayout({ children }) {
    const [isOpen, setIsOpen] = React.useState(true);
    return (
        <div
            className={`bps-relative bps-flex bps-flex-col bps-w-screen bps-h-screen lg:bps-flex-row bps-gap-2 `}
        >
            <div
                className={`bps-sticky bps-z-50 bps-transition-all lg:bps-h-full bps-w-full  ${
                    isOpen ? 'lg:bps-w-[90px]' : 'bps-h-full lg:bps-w-1/6 '
                }`}
            >
                <RootLayoutSidebar
                    data={{
                        isOpen,
                        setIsOpen,
                    }}
                />
            </div>
            <div
                className={`bps-w-full bps-h-full bps-overflow-hidden  ${
                    !isOpen &&
                    'bps-hidden lg:bps-block bps-transition-all lg:bps-w-5/6 lg:bps-h-full'
                }`}
            >
                <RootLayoutBody children={children} />
            </div>
        </div>
    );
}
