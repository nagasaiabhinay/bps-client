import Axios from "@axios/index";
import { passCategories, passTypes } from "@components/common/staticData";
import { Card, Divider, Select, Text, Title } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useId } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { useGlobalStore } from "@store/index";
import dayjs from "dayjs";
import React from "react";
import StripeCheckout from "react-stripe-checkout";
import useSWR from "swr";
const CreatePass = () => {
  const RegionData = useSWR("/auth/regions/get-all-regions");
  const RoutesData = useSWR("/auth/routes/get-all-routes");
  const user = useGlobalStore((state) => state.user);

  const [eD, setED] = React.useState();

  const uuid = useId();
  const [selectedRoute, setSelectedRoute] = React.useState([]);

  const createPassForm = useForm({
    initialValues: {
      passCategory: passCategories[0].value,
      passFrom: "",
      passTo: "",
      passRegion: "",
      passStartDate: new Date(),
      passType: passTypes[0].value,
      expiryDate: "",
    },

    transformValues: (values) => {
      let data = {
        category: values.passCategory,
        startDate: values.passStartDate,
        endDate: new Date(
          values.passStartDate.getTime() +
            1000 *
              60 *
              60 *
              24 *
              passTypes.find((item) => item.value === values.passType).days
        ),
        passType: values.passType,
      };

      if (values.passCategory === "a2b") {
        data = {
          ...data,
          details: {
            passFrom: values.passFrom,
            passTo: values.passTo,
          },
        };
      }

      if (values.passCategory === "region") {
        data = {
          ...data,
          details: {
            passRegion: values.passRegion,
          },
        };
      }

      return data;
    },
  });
  const handleToken = async (token) => {
    const res = {
      data: {
        status: true,
        paymentId: uuid,
      },
    };
    const { status, paymentID } = res.data;
    if (status) {
      showNotification({
        title: "Success",
        message: "We are Creating your pass",
      });

      let tempData = {
        category: createPassForm.values.passCategory,
        startDate: createPassForm.values.passStartDate,
        endDate: new Date(
          createPassForm.values.passStartDate.getTime() +
            1000 *
              60 *
              60 *
              24 *
              passTypes.find(
                (item) => item.value === createPassForm.values.passType
              ).days
        ),
        passType: createPassForm.values.passType,
      };

      if (createPassForm.values.passCategory === "a2b") {
        tempData = {
          ...tempData,
          details: {
            passFrom: createPassForm.values.passFrom,
            passTo: createPassForm.values.passTo,
          },
        };
      }

      if (createPassForm.values.passCategory === "region") {
        tempData = {
          ...tempData,
          details: {
            passRegion: createPassForm.values.passRegion,
          },
        };
      }
      const ee = {
        paymentID: uuid,
        ...tempData,
      };
      const api = Axios.init();
      const { data } = await api.auth.createNewPass(ee);
      createPassForm.reset();
      showNotification({
        message: data?.message,
      });
    } else {
      showNotification({
        title: "Error",
        message: "Something went wrong",
      });
    }
  };

  console.log({
    1: createPassForm.values.passStartDate,
    2: new Date(
      createPassForm.getInputProps("passStartDate").value.getTime() +
        1000 *
          60 *
          60 *
          24 *
          passTypes.find(
            (item) =>
              item.value === createPassForm.getInputProps("passType").value
          ).days
    ),
  });

  React.useEffect(() => {
    let unSub = false;
    if (!unSub) {
      setSelectedRoute([]);
      createPassForm.setFieldValue("passFrom", "");
      createPassForm.setFieldValue("passTo", "");
      createPassForm.setFieldValue("passRegion", "");
    }
    return () => {
      unSub = true;
    };
  }, [createPassForm.values.passCategory]);

  React.useEffect(() => {
    let unSub = false;
    if (!unSub) {
      createPassForm.setFieldValue(
        "expiryDate",
        new Date(
          new Date(createPassForm.values.passStartDate).getTime() +
            1000 *
              60 *
              60 *
              24 *
              passTypes.find(
                (item) => item.value === createPassForm.values.passType
              ).days
        )
      );
    }
    return () => {
      unSub = true;
    };
  }, [createPassForm.values.passType]);

  const getDaysBetweenDates = (startDate, endDate) => {
    const Start = new Date(startDate).getTime();
    const End = new Date(endDate).getTime();
    const Difference = End - Start;
    return Difference / (1000 * 3600 * 24);
  };

  return (
    <div className=" bps-h-full bps-flex bps-flex-col bps-items-center bps-gap-3">
      <Title>Buy Pass</Title>
      <Divider className=" bps-w-full" />
      <div className=" bps-h-full bps-w-full bps-flex bps-flex-col lg:bps-flex-row bps-gap-3">
        <div className="bps-p-5 bps-rounded-lg bps-w-full lg:bps-w-full bps-h-full">
          <form
            onSubmit={createPassForm.onSubmit(async (values) => {
              showNotification({
                message: "Please wait...",
              });
            })}
            className=" bps-p-5 bps-flex bps-flex-col bps-gap-3"
          >
            <Select
              label="Select Categories"
              placeholder="Select Categories"
              required
              className=" bps-w-full"
              data={passCategories}
              {...createPassForm.getInputProps("passCategory")}
            />
            {createPassForm.getInputProps("passCategory").value === "a2b" ? (
              <>
                <Select
                  data={
                    RoutesData?.data
                      ? RoutesData?.data?.Routes?.map((_, i) => {
                          return {
                            label: _.Bus.Name,
                            value: _.Bus.Name,
                          };
                        })
                      : ["Something went Wrong"]
                  }
                  required
                  searchable
                  clearable
                  onChange={(e) => {
                    const data = RoutesData?.data?.Routes?.filter(
                      (_) => _.Bus.Name === e
                    );
                    setSelectedRoute(data);
                    createPassForm.setFieldValue("passFrom", e?.split("-")[0]);
                    createPassForm.setFieldValue("passTo", e?.split("-")[1]);
                  }}
                  label="Search Route"
                  placeholder="Enter your location"
                  className=" bps-w-full"
                />
              </>
            ) : (
              <Select
                data={
                  RegionData?.data
                    ? RegionData?.data?.regions?.map((_, i) => ({
                        label: _.Name,
                        value: _.Name,
                      }))
                    : ["Something went Wrong"]
                }
                required
                searchable
                clearable
                label="Region"
                placeholder="Enter your region"
                className=" bps-w-full"
                onChange={(e) => {
                  const data = RegionData?.data?.regions?.filter(
                    (_) => _.Name === e
                  );
                  setSelectedRoute(data);
                  createPassForm.setFieldValue("passRegion", e);
                }}
                error={createPassForm.errors.passRegion}
              />
            )}
            <Select
              label="Select Type"
              placeholder="Select Type"
              required
              className=" bps-w-full"
              data={passTypes}
              {...createPassForm.getInputProps("passType")}
            />
            <div className=" bps-flex bps-flex-row bps-gap-3 bps-items-center">
              <DatePicker
                className=" bps-flex-1"
                required
                minDate={dayjs(new Date()).toDate()}
                label="Start Date"
                placeholder="Enter your start date"
                type="date"
                {...createPassForm.getInputProps("passStartDate")}
              />
              <DatePicker
                className=" bps-flex-1"
                label="Valid UpTo"
                required
                disabled
                placeholder="Enter your valid upto"
                type="date"
                value={
                  new Date(
                    createPassForm
                      .getInputProps("passStartDate")
                      .value.getTime() +
                      1000 *
                        60 *
                        60 *
                        24 *
                        passTypes.find(
                          (item) =>
                            item.value ===
                            createPassForm.getInputProps("passType").value
                        ).days
                  )
                }
              />
            </div>
            <div className=" bps-w-full bps-flex bps-flex-row bps-items-center bps-justify-end">
              <div className=" bps-text-end">
                {selectedRoute?.length > 0 && (
                  <>
                    <Text>
                      Number of Days {`(A)`} ={" "}
                      {getDaysBetweenDates(
                        createPassForm.values.passStartDate,
                        new Date(
                          createPassForm
                            .getInputProps("passStartDate")
                            .value.getTime() +
                            1000 *
                              60 *
                              60 *
                              24 *
                              passTypes.find(
                                (item) =>
                                  item.value ===
                                  createPassForm.getInputProps("passType").value
                              ).days
                        )
                      )}
                    </Text>
                    <Text>
                      Per Mile {`(B)`} ={" "}
                      {createPassForm.values.passCategory === "a2b" &&
                        selectedRoute[0]?.Bus?.Fare}
                      {createPassForm.values.passCategory === "region" &&
                        selectedRoute[0]?.PerMile}
                    </Text>
                    <Text>
                      {createPassForm.values.passCategory === "a2b" &&
                        `Total Distance (C) = ${selectedRoute[0]?.Bus?.Distance}`}

                      {createPassForm.values.passCategory === "region" &&
                        `Total Sq Miles (C) = ${selectedRoute[0]?.SqMiles}`}
                    </Text>
                    <Text>
                      Total Amount {`(AxBxC)`} ={" "}
                      {createPassForm.values.passCategory === "a2b" &&
                        selectedRoute[0]?.Bus?.Fare *
                          selectedRoute[0]?.Bus?.Distance *
                          getDaysBetweenDates(
                            createPassForm.values.passStartDate,
                            new Date(
                              createPassForm
                                .getInputProps("passStartDate")
                                .value.getTime() +
                                1000 *
                                  60 *
                                  60 *
                                  24 *
                                  passTypes.find(
                                    (item) =>
                                      item.value ===
                                      createPassForm.getInputProps("passType")
                                        .value
                                  ).days
                            )
                          )}
                      {createPassForm.values.passCategory === "region" &&
                        selectedRoute[0]?.PerMile *
                          getDaysBetweenDates(
                            createPassForm.values.passStartDate,
                            new Date(
                              createPassForm
                                .getInputProps("passStartDate")
                                .value.getTime() +
                                1000 *
                                  60 *
                                  60 *
                                  24 *
                                  passTypes.find(
                                    (item) =>
                                      item.value ===
                                      createPassForm.getInputProps("passType")
                                        .value
                                  ).days
                            )
                          ) *
                          selectedRoute[0]?.SqMiles}
                    </Text>
                  </>
                )}
              </div>
            </div>

            {selectedRoute?.length > 0 && (
              <StripeCheckout
                stripeKey="pk_test_51JGNLWBVnEa8wQ1y8ZGMn9tw57qHCROwaNVr5eplb1UvQsN410gJpXPyNW8yFgNQZeM7twAoAjZ7LosccszLnDMz00pIIh0lL0"
                token={handleToken}
                label={` Pay 
                                 ${
                                   createPassForm.values.passCategory === "a2b"
                                     ? selectedRoute[0]?.Bus?.Fare *
                                         getDaysBetweenDates(
                                           createPassForm.values.passStartDate,
                                           new Date(
                                             createPassForm
                                               .getInputProps("passStartDate")
                                               .value.getTime() +
                                               1000 *
                                                 60 *
                                                 60 *
                                                 24 *
                                                 passTypes.find(
                                                   (item) =>
                                                     item.value ===
                                                     createPassForm.getInputProps(
                                                       "passType"
                                                     ).value
                                                 ).days
                                           )
                                         ) *
                                         selectedRoute[0]?.Bus?.Distance >
                                       0
                                       ? selectedRoute[0]?.Bus?.Fare *
                                         getDaysBetweenDates(
                                           createPassForm.values.passStartDate,
                                           new Date(
                                             createPassForm
                                               .getInputProps("passStartDate")
                                               .value.getTime() +
                                               1000 *
                                                 60 *
                                                 60 *
                                                 24 *
                                                 passTypes.find(
                                                   (item) =>
                                                     item.value ===
                                                     createPassForm.getInputProps(
                                                       "passType"
                                                     ).value
                                                 ).days
                                           )
                                         ) *
                                         selectedRoute[0]?.Bus?.Distance
                                       : ""
                                     : selectedRoute[0]?.PerMile *
                                       getDaysBetweenDates(
                                         createPassForm.values.passStartDate,
                                         new Date(
                                           createPassForm
                                             .getInputProps("passStartDate")
                                             .value.getTime() +
                                             1000 *
                                               60 *
                                               60 *
                                               24 *
                                               passTypes.find(
                                                 (item) =>
                                                   item.value ===
                                                   createPassForm.getInputProps(
                                                     "passType"
                                                   ).value
                                               ).days
                                         )
                                       ) *
                                       selectedRoute[0]?.SqMiles
                                     ? selectedRoute[0]?.PerMile *
                                       getDaysBetweenDates(
                                         createPassForm.values.passStartDate,
                                         new Date(
                                           createPassForm
                                             .getInputProps("passStartDate")
                                             .value.getTime() +
                                             1000 *
                                               60 *
                                               60 *
                                               24 *
                                               passTypes.find(
                                                 (item) =>
                                                   item.value ===
                                                   createPassForm.getInputProps(
                                                     "passType"
                                                   ).value
                                               ).days
                                         )
                                       ) *
                                       selectedRoute[0]?.SqMiles
                                     : ""
                                 }
                            `}
                billingAddress={false}
                shippingAddress={false}
                email={user?.Email}
                amount={
                  Number(
                    (createPassForm.values.passCategory === "a2b" &&
                      selectedRoute[0]?.Bus?.Fare *
                        selectedRoute[0]?.Bus?.Distance *
                        getDaysBetweenDates(
                          createPassForm.values.passStartDate,
                          new Date(
                            createPassForm
                              .getInputProps("passStartDate")
                              .value.getTime() +
                              1000 *
                                60 *
                                60 *
                                24 *
                                passTypes.find(
                                  (item) =>
                                    item.value ===
                                    createPassForm.getInputProps("passType")
                                      .value
                                ).days
                          )
                        )) ??
                      (createPassForm.values.passCategory === "region" &&
                        selectedRoute[0]?.PerMile *
                          getDaysBetweenDates(
                            createPassForm.values.passStartDate,
                            new Date(
                              createPassForm
                                .getInputProps("passStartDate")
                                .value.getTime() +
                                1000 *
                                  60 *
                                  60 *
                                  24 *
                                  passTypes.find(
                                    (item) =>
                                      item.value ===
                                      createPassForm.getInputProps("passType")
                                        .value
                                  ).days
                            )
                          ) *
                          selectedRoute[0]?.SqMiles)
                  ) * 100
                }
                name={user?.Name}
              />
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePass;
