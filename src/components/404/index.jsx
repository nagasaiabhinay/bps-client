import React from 'react'
import {Text,Title,List,useMantineTheme} from '@mantine/core'
import { useGlobalStore } from '@store/index';
import Link from 'next/link'
const NotFoundPage=()=> {

    const theme = useMantineTheme()
    const user = useGlobalStore(s=> s.user);

  return (
    <div className='bps-p-5'>
    <Title>Congratulations!</Title>
    <Text>You've found a completely secret place on Bus Pass System website. Unfortunately, this is only a 404 page. If you have landed on this page by mistake hear are the few links that will help you to navigate to the Right Page  </Text>
    <List>
        {user?.Role?.includes('customer') ? (

           <>
            <List.Item>
                 <Link
                href={`/`}
                className={` ${
                    theme.colorScheme === 'dark' ? 'bps-text-white' : 'bps-text-black'
                } bps-no-underline `}
            >
                <text
                        className={`  bps-text-xl bps-whitespace-nowrap bps-font-bold`}
                    >
                        Home
                    </text>
            </Link>
            </List.Item>
            <List.Item>
                 <Link
                href={`/create-pass`}
                className={` ${
                    theme.colorScheme === 'dark' ? 'bps-text-white' : 'bps-text-black'
                } bps-no-underline `}
            >
                <text
                        className={`  bps-text-xl bps-whitespace-nowrap bps-font-bold`}
                    >
                        CreatePass
                    </text>
            </Link>
            </List.Item>
            <List.Item>
                 <Link
                href={`/rides`}
                className={` ${
                    theme.colorScheme === 'dark' ? 'bps-text-white' : 'bps-text-black'
                } bps-no-underline `}
            >
                <text
                        className={`  bps-text-xl bps-whitespace-nowrap bps-font-bold`}
                    >
                        My Passes
                    </text>
            </Link>
            </List.Item>
           </>
            ) :  <>
            <List.Item>
                 <Link
                href={`/admin`}
                className={` ${
                    theme.colorScheme === 'dark' ? 'bps-text-white' : 'bps-text-black'
                } bps-no-underline `}
            >
                <text
                        className={`  bps-text-xl bps-whitespace-nowrap bps-font-bold`}
                    >
                        Admin
                    </text>
            </Link>
            </List.Item>
            
           </>}
           {user ? (

               <List.Item>
                 <Link
                href={`/logout`}
                className={` ${
                    theme.colorScheme === 'dark' ? 'bps-text-white' : 'bps-text-black'
                } bps-no-underline `}
                >
                <text
                        className={`  bps-text-xl bps-whitespace-nowrap bps-font-bold`}
                        >
                        Logout
                    </text>
            </Link>
            </List.Item>
                        ):(
                            <List.Item>
                            <Link
                           href={`/auth`}
                           className={` ${
                               theme.colorScheme === 'dark' ? 'bps-text-white' : 'bps-text-black'
                           } bps-no-underline `}
                           >
                           <text
                                   className={`  bps-text-xl bps-whitespace-nowrap bps-font-bold`}
                                   >
                                   Login
                               </text>
                       </Link>
                       </List.Item>
                        )}
</List>
</div>
  )
}


export default NotFoundPage;