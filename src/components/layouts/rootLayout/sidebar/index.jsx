import Logo from "@components/common/logo";
import {
  useMantineTheme,
  useMantineColorScheme,
  Button,
  Accordion,
} from "@mantine/core";
import { useGlobalStore } from "@store/index";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Bus,
  CircleWavyCheck,
  Door,
  HouseLine,
  Ticket,
  User,
} from "phosphor-react";
import { useSession, signIn, signOut } from "next-auth/react";
import { showNotification } from "@mantine/notifications";

const SideBarIcon = (props) => {
  const router = useRouter();
  const { pathname } = router;
  const menu = pathname.split("/");
  const theme = useMantineTheme();

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
        href={`${propsData?.route === "" ? "/" : propsData?.route}`}
        key={propsData?.key}
        className={` ${
          theme.colorScheme === "dark" ? "bps-text-white" : "bps-text-black"
        } bps-no-underline `}
      >
        <div
          className={` bps-flex bps-w-min bps-flex-row bps-gap-4 ${
            propsData?.isOpen && "bps-justify-center"
          } bps-items-center bps-relative bps-cursor-pointer bps-group ${
            active && "bps-active-button"
          } `}
        >
          <text
            className={` ${
              propsData?.isOpen &&
              "bps-hidden group-hover:bps-block group-hover:bps-absolute bps-left-12 bps-shadow-lg bps-text-black bps-bg-white bps-p-2 bps-rounded-md"
            }   bps-text-xl bps-whitespace-nowrap bps-font-bold`}
          >
            {propsData?.title}
          </text>
        </div>
      </Link>
    </div>
  );
};

export default function RootLayoutSidebar(props) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const user = useGlobalStore((e) => e.user);
  const router = useRouter()
  const reset = useGlobalStore((e) => e.reset);
  const theme = useMantineTheme();
  const dark = colorScheme === "dark";
  const propsData = {
    isOpen: props?.data?.isOpen,
    setIsOpen: props?.data?.setIsOpen,
  };

  const SidebarMenu = [
    {
      roleAccess: "customer",
      title: "Home",
      route: "",
    },
    {
      roleAccess: "customer",
      title: "Buy Pass",
      route: "create-pass",
    },
    {
      roleAccess: "customer",
      title: "My Passes",
      route: "rides",
    },
  ];

  return (
    <div className={`bps-h-full   bps-flex bps-items-center bps-justify-start`}>
      <div className={`bps-h-full bps-w-full  `}>
        <div
          className={`bps-flex bps-p-2 bps-h-full bps-flex-col bps-items-center  lg:bps-pt-16 bps-gap-2 `}
        >
          <div className="bps-flex bps-items-center bps-justify-center bps-w-full ">
            <Logo
              onClicks={{
                text: () => propsData?.setIsOpen(!propsData?.isOpen),
              }}
              classNames={{
                root: !propsData?.isOpen && "bps-flex-col",
              }}
              isOpen={propsData?.isOpen}
            />
          </div>
          <div
            className={` bps-w-full bps-h-full bps-gap-3 bps-flex bps-flex-col  bps-my-10  ${
              propsData?.isOpen ? "bps-hidden lg:bps-block" : "bps-block "
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
                  propsData?.isOpen && "bps-items-center"
                } bps-justify-center`}
              >
                {user?.Role?.includes("admin") ? (
                  <Accordion variant="filled" defaultValue="Routes">
                    <Accordion.Item value={"admin"}>
                      <Accordion.Control
                        chevron={() => {
                          null;
                        }}
                        className=" bps-text-xl"
                      >
                        <Link
                          href={`/admin`}
                          className={` ${
                            theme.colorScheme === "dark"
                              ? "bps-text-white"
                              : "bps-text-black"
                          } bps-no-underline `}
                        >
                          <div
                            className={` bps-flex bps-w-min bps-flex-row bps-gap-4 ${
                              propsData?.isOpen && "bps-justify-center"
                            } bps-items-center bps-relative bps-cursor-pointer bps-group  `}
                          >
                            <text
                              className={` ${
                                propsData?.isOpen &&
                                "bps-hidden group-hover:bps-block group-hover:bps-absolute bps-left-12 bps-shadow-lg bps-text-black bps-bg-white bps-p-2 bps-rounded-md"
                              }   bps-text-xl bps-whitespace-nowrap bps-font-bold`}
                            >
                              Admin
                            </text>
                          </div>
                        </Link>
                      </Accordion.Control>
                    </Accordion.Item>
                    <Accordion.Item value={"Routes"}>
                      <Accordion.Control className=" bps-text-xl">
                        Routes
                      </Accordion.Control>
                      <Accordion.Panel>
                        <div className=" bps-flex bps-flex-col bps-gap-5">
                          <Link
                            href={`/admin/routes/all-routes`}
                            className={` ${
                              theme.colorScheme === "dark"
                                ? "bps-text-white"
                                : "bps-text-black"
                            } bps-no-underline `}
                          >
                            <div
                              className={` bps-flex bps-w-min bps-flex-row bps-gap-4 ${
                                propsData?.isOpen && "bps-justify-center"
                              } bps-items-center bps-relative bps-cursor-pointer bps-group  `}
                            >
                              <text
                                className={` ${
                                  propsData?.isOpen &&
                                  "bps-hidden group-hover:bps-block group-hover:bps-absolute bps-left-12 bps-shadow-lg bps-text-black bps-bg-white bps-p-2 bps-rounded-md"
                                }   bps-text-xl bps-whitespace-nowrap bps-font-bold`}
                              >
                                All Routes
                              </text>
                            </div>
                          </Link>
                          <Link
                            href={`/admin/routes/create-new-route`}
                            className={` ${
                              theme.colorScheme === "dark"
                                ? "bps-text-white"
                                : "bps-text-black"
                            } bps-no-underline `}
                          >
                            <div
                              className={` bps-flex bps-w-min bps-flex-row bps-gap-4 ${
                                propsData?.isOpen && "bps-justify-center"
                              } bps-items-center bps-relative bps-cursor-pointer bps-group  `}
                            >
                              <text
                                className={` ${
                                  propsData?.isOpen &&
                                  "bps-hidden group-hover:bps-block group-hover:bps-absolute bps-left-12 bps-shadow-lg bps-text-black bps-bg-white bps-p-2 bps-rounded-md"
                                }   bps-text-xl bps-whitespace-nowrap bps-font-bold`}
                              >
                                Create new route
                              </text>
                            </div>
                          </Link>
                        </div>
                      </Accordion.Panel>
                    </Accordion.Item>
                    <Accordion.Item value={"Regions"}>
                      <Accordion.Control className=" bps-text-xl">
                        Regions
                      </Accordion.Control>
                      <Accordion.Panel>
                        <div className=" bps-flex bps-flex-col bps-gap-5">
                          <Link
                            href={`/admin/regions/all-regions`}
                            className={` ${
                              theme.colorScheme === "dark"
                                ? "bps-text-white"
                                : "bps-text-black"
                            } bps-no-underline `}
                          >
                            <div
                              className={` bps-flex bps-w-min bps-flex-row bps-gap-4 ${
                                propsData?.isOpen && "bps-justify-center"
                              } bps-items-center bps-relative bps-cursor-pointer bps-group  `}
                            >
                              <text
                                className={` ${
                                  propsData?.isOpen &&
                                  "bps-hidden group-hover:bps-block group-hover:bps-absolute bps-left-12 bps-shadow-lg bps-text-black bps-bg-white bps-p-2 bps-rounded-md"
                                }   bps-text-xl bps-whitespace-nowrap bps-font-bold`}
                              >
                                All Regions
                              </text>
                            </div>
                          </Link>
                          <Link
                            href={`/admin/regions/create-new-region`}
                            className={` ${
                              theme.colorScheme === "dark"
                                ? "bps-text-white"
                                : "bps-text-black"
                            } bps-no-underline `}
                          >
                            <div
                              className={` bps-flex bps-w-min bps-flex-row bps-gap-4 ${
                                propsData?.isOpen && "bps-justify-center"
                              } bps-items-center bps-relative bps-cursor-pointer bps-group  `}
                            >
                              <text
                                className={` ${
                                  propsData?.isOpen &&
                                  "bps-hidden group-hover:bps-block group-hover:bps-absolute bps-left-12 bps-shadow-lg bps-text-black bps-bg-white bps-p-2 bps-rounded-md"
                                }   bps-text-xl bps-whitespace-nowrap bps-font-bold`}
                              >
                                Create new region
                              </text>
                            </div>
                          </Link>
                        </div>
                      </Accordion.Panel>
                    </Accordion.Item>
                  </Accordion>
                ) : (
                  SidebarMenu?.map((_, i) => (
                    <SideBarIcon
                      key={_?.title}
                      isOpen={propsData?.isOpen}
                      {..._}
                    />
                  ))
                )}
              </div>

              <div className="bps-flex bps-flex-col bps-gap-3">
                <Button
                  variant="default"
                  className="bps-w-full"
                  onClick={() => toggleColorScheme()}
                >
                  Toggle Theme
                </Button>

                <div
                  className={` bps-w-full ${
                    propsData?.isOpen &&
                    " bps-shadow-none !bps-bg-transparent bps-p-0"
                  } bps-shadow-lg bps-flex-col bps-flex bps-gap-3 bps-items-center bps-justify-center bps-p-2 bps-rounded-md bps-cursor-pointer`}
                >
                  <div
                    className={` ${
                      theme.colorScheme === "dark"
                        ? "bps-text-white"
                        : "bps-text-black"
                    } bps-no-underline `}
                    onClick={() => {
                      signOut();
                      reset();
                      showNotification({
                        title: "Logged out",
                        message: "You have been logged out",
                      });
                      signOut();
                      router.replace("/auth");
                    }}
                  >
                    <div
                      className={` bps-flex bps-w-min bps-flex-row bps-gap-4 ${
                        propsData?.isOpen && "bps-justify-center"
                      } bps-items-center bps-relative bps-cursor-pointer bps-group  `}
                    >
                      <text
                        className={` ${
                          propsData?.isOpen &&
                          "bps-hidden group-hover:bps-block group-hover:bps-absolute bps-left-12 bps-shadow-lg bps-text-black bps-bg-white bps-p-2 bps-rounded-md"
                        }   bps-text-xl bps-whitespace-nowrap bps-font-bold`}
                      >
                        Logout
                      </text>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
