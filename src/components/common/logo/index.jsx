export default function Logo(props) {
    const propsData = {
        classNames: {
            root: props?.classNames?.root || '',
            image: props?.classNames?.image || '',
            text: props?.classNames?.text || '',
        },
        onClicks: {
            root: props?.onClicks?.root || (() => {}),
            image: props?.onClicks?.image || (() => {}),
            text: props?.onClicks?.text || (() => {}),
        },
        isOpen: props?.isOpen,
    };

    return (
        <>
            <div
                onClick={propsData?.onClicks?.root}
                className={`bps-flex bps-cursor-pointer bps-flex-row bps-items-center bps-gap-2 ${propsData?.classNames?.root}`}
            >
                {/* <img
                    onClick={propsData?.onClicks?.image}
                    className={`${propsData?.classNames?.image}  bps-w-12 bps-h-12`}
                    src='/logo.svg'
                    alt='logo'
                /> */}
                <text
                    className=' bps-text-3xl bps-font-bold'
                    onClick={propsData?.onClicks?.text}
                >
                    BPS
                </text>
                <text
                    onClick={propsData?.onClicks?.text}
                    className={`bps-text-2xl ${
                        propsData?.isOpen && 'lg:bps-hidden'
                    } bps-font-bold bps-text-center bps-text-orange-500  ${
                        propsData?.classNames?.text
                    }`}
                >
                    BusPass System
                </text>
            </div>
        </>
    );
}
