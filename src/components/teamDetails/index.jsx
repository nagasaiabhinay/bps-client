import {
  Card,
  Text,
  Title,
  Avatar,
  Tooltip,
  Divider,
  List,
  ThemeIcon,
  ActionIcon,
  Image,
} from "@mantine/core";
import { IconContext } from "phosphor-react";
import React from "react";

const TeamDetails = () => {
  return (
    <Card className="bps-w-full bps-flex bps-flex-col bps-gap-3 bps-text-xl">
      <div className="bps-flex bps-w-full bps-justify-between bps-flex-col bps-items-start bps-gap-3">
        <div className="bps-flex bps-w-full bps-justify-between bps-flex-row bps-items-start bps-gap-3">
          <Title>Bus Pass System</Title>
          <Text>Project Name</Text>
        </div>
        <Divider className=" bps-w-full" />
      </div>
      <div className="bps-flex bps-w-full bps-justify-between bps-flex-col bps-items-start bps-gap-3">
        <div className="bps-flex bps-w-full bps-justify-between bps-flex-row bps-items-start bps-gap-3">
          <div className="bps-flex bps-flex-row bps-gap-3">
            <Tooltip label="Abhinay Chittajallu">
              <Avatar
                size="xl"
                src="https://firebasestorage.googleapis.com/v0/b/my-bps-project.appspot.com/o/WhatsApp%20Image%202022-12-05%20at%202.26.01%20AM.jpeg?alt=media&token=e3a39e55-4bed-4fe3-8192-d50b37045b27"
                className=" bps-rounded-full bps-cursor-pointer"
              />
            </Tooltip>
            <Tooltip label="Sindhu Vinnakota">
              <Avatar
                size="xl"
                src="https://firebasestorage.googleapis.com/v0/b/my-bps-project.appspot.com/o/WhatsApp%20Image%202022-12-05%20at%202.29.22%20AM%20(1).jpeg?alt=media&token=7f60a487-7328-41ef-b915-04cafcb41640"
                className=" bps-rounded-full bps-cursor-pointer"
              />
            </Tooltip>
            <Tooltip label="Sneha Cherukuri">
              <Avatar
                size="xl"
                src="https://firebasestorage.googleapis.com/v0/b/my-bps-project.appspot.com/o/WhatsApp%20Image%202022-12-05%20at%202.29.28%20AM%20(1).jpeg?alt=media&token=21c84307-0a89-49e9-9058-ff38ca3c9cd5"
                className=" bps-rounded-full bps-cursor-pointer"
              />
            </Tooltip>
          </div>
          <Text>Collaborators</Text>
        </div>
        <Divider className=" bps-w-full" />
      </div>
      <div className="bps-flex bps-w-full bps-justify-between bps-flex-col bps-items-start bps-gap-3">
        <div className="bps-flex bps-w-full bps-justify-between bps-flex-row bps-items-start bps-gap-3">
          <div className="bps-flex bps-flex-col bps-gap-3">
            <div className="bps-flex bps-flex-row bps-gap-3 bps-items-center">
              <Tooltip label="Next.js">
                <div className="bps-rounded-full bps-overflow-hidden">
                  <Image
                    width={40}
                    height={40}
                    src="https://i.ibb.co/Hd8Bc0W/Group-2-1.png"
                    withPlaceholder
                  />
                </div>
              </Tooltip>
              <Text>
                <span>Next.js</span> --- frontend Framework
              </Text>
            </div>
            <div className="bps-flex bps-flex-row bps-gap-3 bps-items-center">
              <Tooltip label="Mantine">
                <div className="bps-rounded-full bps-overflow-hidden">
                  <Image
                    width={40}
                    height={40}
                    src="https://i.ibb.co/xs3Zcr7/Group-3.png"
                    withPlaceholder
                  />
                </div>
              </Tooltip>
              <Text>
                <span>Mantine</span> --- CSS Framework
              </Text>
            </div>
            <div className="bps-flex bps-flex-row bps-gap-3 bps-items-center">
              <Tooltip label="Tailwind CSS">
                <div className="bps-rounded-full bps-overflow-hidden">
                  <Image
                    width={40}
                    height={40}
                    src="https://i.ibb.co/1qCj3rb/Group-2-2.png"
                    withPlaceholder
                  />
                </div>
              </Tooltip>
              <Text>
                <span>Tailwind CSS</span> --- CSS/Utility Framework
              </Text>
            </div>
            <div className="bps-flex bps-flex-row bps-gap-3 bps-items-center">
              <Tooltip label="Axios">
                <div className="bps-rounded-full bps-overflow-hidden">
                  <Image
                    width={40}
                    height={40}
                    src="https://i.ibb.co/6nnbq8N/Group-2-3.png"
                    withPlaceholder
                  />
                </div>
              </Tooltip>
              <Text>
                <span>Axios</span> --- API Calling
              </Text>
            </div>
            <div className="bps-flex bps-flex-row bps-gap-3 bps-items-center">
              <Tooltip label="Zustand">
                <div className="bps-rounded-full bps-overflow-hidden">
                  <Image
                    width={40}
                    height={40}
                    src="https://i.ibb.co/vkNLcbw/Intersect.png"
                    withPlaceholder
                  />
                </div>
              </Tooltip>
              <Text>
                <span>Zustand</span> --- State Management
              </Text>
            </div>
            <div className="bps-flex bps-flex-row bps-gap-3 bps-items-center">
              <Tooltip label="Firebase">
                <div className="bps-rounded-full bps-overflow-hidden">
                  <Image
                    width={40}
                    height={40}
                    src="https://i.ibb.co/CbNFsWP/Group-2-4.png"
                    withPlaceholder
                  />
                </div>
              </Tooltip>
              <Text>
                <span>Firebase</span> --- Authentication, Storage Bucket
              </Text>
            </div>
            <div className="bps-flex bps-flex-row bps-gap-3 bps-items-center">
              <Tooltip label="Node.js">
                <div className="bps-rounded-full bps-overflow-hidden">
                  <Image
                    width={40}
                    height={40}
                    src="https://i.ibb.co/5cSHMs0/Group-2-5.png"
                    withPlaceholder
                  />
                </div>
              </Tooltip>
              <Text>
                <span>Node.js</span> --- Server-side Programming,
              </Text>
            </div>
            <div className="bps-flex bps-flex-row bps-gap-3 bps-items-center">
              <Tooltip label="Express.js">
                <div className="bps-rounded-full bps-overflow-hidden">
                  <Image
                    width={40}
                    height={40}
                    src="https://i.ibb.co/DMYNqKQ/Group-2-6.png"
                    withPlaceholder
                  />
                </div>
              </Tooltip>
              <Text>
                <span>Express.js</span> --- Web application server framework,
              </Text>
            </div>
            <div className="bps-flex bps-flex-row bps-gap-3 bps-items-center">
              <Tooltip label="Mongo DB">
                <div className="bps-rounded-full bps-overflow-hidden">
                  <Image
                    width={40}
                    height={40}
                    src="https://i.ibb.co/H4vp0sJ/Group-2-7.png"
                    withPlaceholder
                  />
                </div>
              </Tooltip>
              <Text>
                <span>Mongo DB</span> --- Backend Database,
              </Text>
            </div>
            <div className="bps-flex bps-flex-row bps-gap-3 bps-items-center">
              <Tooltip label="App Engine">
                <div className="bps-rounded-full bps-overflow-hidden">
                  <Image
                    width={40}
                    height={40}
                    src="https://i.ibb.co/GVvLP7f/Group-2-8.png"
                    withPlaceholder
                  />
                </div>
              </Tooltip>
              <Text>
                <span>App Engine</span> --- Deployed Backend and Frontend,
              </Text>
            </div>
          </div>
          <Text>Tech Stack</Text>
        </div>
        <Divider className=" bps-w-full" />
        <div className="bps-flex bps-w-full bps-justify-between bps-flex-col bps-items-start bps-gap-3">
          <div className="bps-flex bps-w-full bps-justify-between bps-flex-row bps-items-start bps-gap-3">
            <List>
              <List.Item>1 Week --- Designing</List.Item>
              <List.Item>3 Week --- Frontend</List.Item>
              <List.Item>3 Week --- Backend</List.Item>
              <List.Item>1 Week --- Deployment</List.Item>
            </List>
            <Text>Time Line</Text>
          </div>
          <Divider className=" bps-w-full" />
        </div>
      </div>
    </Card>
  );
};

export default TeamDetails;
