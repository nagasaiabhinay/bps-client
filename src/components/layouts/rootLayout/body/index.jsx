export default function RootLayoutBody({ children }) {
    return (
        <div className='bps-flex bps-flex-col bps-w-full bps-h-full bps-gap-3 bps-overflow-hidden bps-overflow-y-scroll'>
            <div className={`bps-w-full bps-min-h-full bps-h-max bps-p-5 `}>
                {children}
            </div>
        </div>
    );
}
