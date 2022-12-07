import { BackgroundImage, useMantineTheme } from "@mantine/core";
import Image1 from "./";
import Loading from "@components/common/loading";
import React from 'react'
import { useRouter } from "next/router";

import { useSession, signIn, signOut } from "next-auth/react";

export default function AuthLayout({ children }) {
  const { data: session } = useSession();
  const router = useRouter()
  // signOut()

  // React.useEffect(() => {
  //     if (session) {
  //       router.replace("/");
  //     }
  // }, [session]);

  const theme = useMantineTheme();
  return (
    <div className=" bps-flex bps-flex-row bps-w-screen bps-h-screen">
      <BackgroundImage
        className=" bps-h-full bps-flex bps-flex-row"
        src="https://i.ibb.co/sVRhBGh/Frame-1-2.png"
      >
        <div className="bps-w-full lg:bps-w-[50%] xl:bps-w-[30%] center bps-transition-all bps-duration-500 bps-p-0">
          <div className="bps-flex bps-flex-col lg:bps-rounded-tr-xl lg:bps-rounded-br-xl bps-items-center bps-justify-between bps-w-full bps-h-full center bps-transition-all bps-duration-500">
            <div className=" bps-w-full bps-flex bps-items-center bps-justify-center">
              <h1
                className={`${
                  !theme.colorScheme === "dark"
                    ? "bps-text-white"
                    : "bps-text-black"
                }`}
              >
                Bus Pass System
              </h1>
            </div>
            <div className="bps-flex bps-items-center bps-justify-center bps-w-full bps-h-full">
              {children}
            </div>
          </div>
        </div>
        <div className=" bps-w-0  lg:bps-w-[50%]  xl:bps-w-[70%] bps-hidden lg:bps-flex bps-duration-500 center bps-transition-all">
          {/* <BackgroundImage
                        className=' bps-h-full'
                        src='https://images.hdqwalls.com/wallpapers/red-black-vector-5k-d1.jpg'
                    ></BackgroundImage> */}
        </div>
      </BackgroundImage>
    </div>
  );
}
