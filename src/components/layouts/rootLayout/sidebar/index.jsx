import Logo from '@components/common/logo';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
    Bus,
    CircleWavyCheck,
    Door,
    HouseLine,
    Ticket,
    User,
} from 'phosphor-react';

const SideBarIcon = (props) => {
    const router = useRouter();
    const { pathname } = router;
    const menu = pathname.split('/');

    const propsData = {
        key: props.key,
        icon: props.icon,
        title: props.title,
        route: props.route,
        isOpen: props.isOpen,
    };

    const active = menu[1] === propsData.route || menu.length === 1;

    return (
        <div key={propsData.key}>
            <Link
                href={`${propsData?.route === '' ? '/' : propsData?.route}`}
                key={propsData?.key}
                className='bps-text-white bps-no-underline'
            >
                <div
                    className={` bps-flex bps-w-min bps-flex-row bps-gap-4 ${
                        propsData?.isOpen && 'bps-justify-center'
                    } bps-items-center bps-relative bps-cursor-pointer bps-group ${
                        active && 'bps-active-button'
                    } `}
                >
                    {propsData?.icon && (
                        <propsData.icon className='bps-w-7 bps-h-7 ' />
                    )}
                    <text
                        className={` ${
                            propsData?.isOpen &&
                            'bps-hidden group-hover:bps-block group-hover:bps-absolute bps-left-12 bps-shadow-lg bps-text-black bps-bg-white bps-p-2 bps-rounded-md'
                        }   bps-text-xl bps-whitespace-nowrap bps-font-medium`}
                    >
                        {propsData?.title}
                    </text>
                </div>
            </Link>
        </div>
    );
};

export default function RootLayoutSidebar(props) {
    const propsData = {
        isOpen: props?.data?.isOpen,
        setIsOpen: props?.data?.setIsOpen,
    };

    const SidebarMenu = [
        {
            title: 'Admin',
            route: 'admin',
            icon: CircleWavyCheck,
        },
        {
            title: 'Home',
            route: '',
            icon: HouseLine,
        },
        {
            title: 'Create Pass',
            route: 'create-pass',
            icon: Ticket,
        },
        {
            title: 'My Passes',
            route: 'rides',
            icon: Bus,
        },
        // {
        //     title: 'My Wallet',
        //     route: 'wallet',
        // },
        // {
        //     title: 'Referrals',
        //     route: 'referrals',
        // },
        // {
        //     title: 'Profile',
        //     route: 'profile',
        //     icon: User,
        // },

        // {
        //     title: 'Terms and Conditions',
        //     route: 'terms-and-conditions',
        // },
        // {
        //     title: 'Privacy Policy',
        //     route: 'privacy-policy',
        // },
        // {
        //     title: 'FAQ & Support',
        //     route: 'faq-and-support',
        // },
    ];

    return (
        <div
            className={`bps-h-full   bps-flex bps-items-center bps-justify-start`}
        >
            <div className={`bps-h-full bps-w-full  `}>
                <div
                    className={`bps-flex bps-p-2 bps-h-full bps-flex-col bps-items-center  lg:bps-pt-16 bps-gap-2 `}
                >
                    <div className='bps-flex bps-items-center bps-justify-center bps-w-full '>
                        <Logo
                            onClicks={{
                                text: () =>
                                    propsData?.setIsOpen(!propsData?.isOpen),
                            }}
                            classNames={{
                                root: !propsData?.isOpen && 'bps-flex-col',
                            }}
                            isOpen={propsData?.isOpen}
                        />
                    </div>
                    <div
                        className={` bps-w-full bps-h-full bps-gap-3 bps-flex bps-flex-col  bps-my-10  ${
                            propsData?.isOpen
                                ? 'bps-hidden lg:bps-block'
                                : 'bps-block '
                        }`}
                    >
                        {/* Only visible on MOBILE */}

                        {/* Only visible on DESKTOP */}
                        {/* <div className={` hidden lg:block`}>
                    Only Visible on Desktop
                </div> */}

                        <div
                            className={`bps-flex bps-flex-col bps-p-2 bps-h-full bps-justify-between `}
                        >
                            <div
                                className={` bps-flex bps-flex-col bps-gap-8 ${
                                    propsData?.isOpen && 'bps-items-center'
                                } bps-justify-center`}
                            >
                                {SidebarMenu?.map((_, i) => (
                                    <SideBarIcon
                                        key={_?.title}
                                        isOpen={propsData?.isOpen}
                                        {..._}
                                    />
                                ))}
                            </div>
                            <div>
                                <div
                                    className={` bps-w-full ${
                                        propsData?.isOpen &&
                                        ' bps-shadow-none !bps-bg-transparent bps-p-0'
                                    } bps-shadow-lg bps-flex bps-items-center bps-justify-center bps-p-2 bps-rounded-md bps-cursor-pointer`}
                                >
                                    <SideBarIcon
                                        key={'Log-out'}
                                        isOpen={propsData?.isOpen}
                                        title='Log-out'
                                        route='/logout'
                                        icon={Door}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
