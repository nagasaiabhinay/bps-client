import Axios from "@axios/index";

import {
  Button,
  createStyles,
  Group,
  Modal,
  NumberInput,
  Switch,
  TextInput,
  Popover,
  Text
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import React from "react";
import { useSWRConfig } from 'swr'

const useStyles = createStyles((theme) => ({
  body: {
    display: "flex",
    alignItems: "center",
  },

  track: {
    width: 40,
    height: 6,
    overflow: "visible",
  },

  thumb: {
    width: 20,
    height: 20,
    left: -2,
    transition: "background-color 100ms ease, left 100ms ease",

    "input:checked + * > &": {
      backgroundColor: theme.fn.primaryColor(),
    },
  },
}));

const TableRow = (p) => {
  const { classes } = useStyles();
  const { mutate } = useSWRConfig()
  const [opened, setOpened] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);
  const [deleteOpened, setDeleteOpened] = React.useState(false);

  const props = {
    key: p.key,
    item: p.item,
  };

  const CreateNewRegionForm = useForm({
    initialValues: {
      Name: props?.item?.Name || "",
      PerMile: Number(props?.item?.PerMile) || 0,
      SqMiles: Number(props?.item?.SqMiles) || 0,
    },
    validate: {
      Name: (value) => {
        if (!value) {
          return "Region Name is required";
        }
      },
      PerMile: (value) => {
        if (!value) {
          return "Per Mile is required";
        }
      },
      SqMiles: (value) => {
        if (!value) {
          return "Sq Miles is required";
        }
      },
    },
  });

  const HandleEditRegion = async (e) => {
    if (CreateNewRegionForm.validate()) {
      const api = Axios.init();
      const { data } = await api.auth.updateRegionById(props?.item?._id, e);
      CreateNewRegionForm.reset();
      showNotification({
        message: data?.message,
      });
      mutate('/auth/regions/get-all-regions')
      setDeleteOpened(false);
      setOpened(false);
    }
  };

  const DeleteRegion = async () => {
    const api = Axios.init();
    const { data } = await api.auth.deleteRegionById(props?.item?._id);
    showNotification({
      message: data?.message,
    });
    mutate('/auth/regions/get-all-regions')
    setOpened(false);
  };

  return (
    <>
      <tr key={props.key}>
        <th
          className="bps-text-start hover:bps-underline bps-cursor-pointer"
          onClick={() => {
            setOpened(true);
            setEditMode(false);
          }}
        >
          {props?.item?._id}
        </th>
        <th className="bps-text-start">{props?.item?.Name}</th>
      </tr>
      <Modal
        overflow="inside"
        size="lg"
        opened={opened}
        onClose={() => {
          setOpened(false);
          setEditMode(false);
        }}
        title={`${props?.item?.Name}`}
      >
        <div>
          <Group position="center" p="md">
            <Switch
              checked={editMode}
              onChange={(e) => {
                setEditMode(e.target.checked);
              }}
              value={true}
              label="Edit Mode"
              classNames={classes}
            />
          </Group>
        </div>
        <form
          onSubmit={CreateNewRegionForm.onSubmit((values) =>
            HandleEditRegion(values)
          )}
          className=" bps-flex bps-flex-col bps-gap-3"
        >
          <TextInput
            variant={!editMode ? "unstyled" : "default"}
            readOnly={!editMode}
            label="Region Name"
            withAsterisk={editMode}
            placeholder="Name"
            className="bps-w-full"
            {...CreateNewRegionForm.getInputProps("Name")}
          />
          <NumberInput
            variant={!editMode ? "unstyled" : "default"}
            readOnly={!editMode}
            withAsterisk={editMode}
            label="Per Mile"
            required
            precision={2}
            placeholder="Per Mile"
            className="bps-w-full"
            hideControls
            min={0}
            {...CreateNewRegionForm.getInputProps("PerMile")}
          />
          <NumberInput
            variant={!editMode ? "unstyled" : "default"}
            readOnly={!editMode}
            withAsterisk={editMode}
            label="Region Size (Sq Miles)"
            required
            precision={2}
            placeholder="Sq Miles"
            className="bps-w-full"
            hideControls
            min={0}
            {...CreateNewRegionForm.getInputProps("SqMiles")}
          />
          {editMode && (
            <Button type="submit" variant="outline" color="blue">
              Update Region
            </Button>
          ) }
        </form>
        {!editMode && (
            <Popover opened={deleteOpened} width={300} trapFocus position="bottom" withArrow shadow="md">
            <Popover.Target>
            <Button className="bps-w-full" onClick={()=>{
                setDeleteOpened(true)
            }}  variant="outline" color="red">
              Delete Region
            </Button>
            </Popover.Target>
            <Popover.Dropdown sx={(theme) => ({ background: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white })}>
              <div className="bps-w-full bps-flex bps-flex-col bps-gap-3">

              <Text>Do you wish to Delete this Region</Text>
              <div className="bps-w-full bps-flex bps-flex-row bps-gap-3">
              <Button onClick={()=>{
                setDeleteOpened(false)
              }}  className="bps-w-full" variant="outline" color="red">
              No
            </Button>
            <Button onClick={DeleteRegion} className="bps-w-full" variant="filled" color="red">
              Yes
            </Button>
              </div>
              </div>
            </Popover.Dropdown>
          </Popover>
        )}
      </Modal>
    </>
  );
};

export default TableRow;
