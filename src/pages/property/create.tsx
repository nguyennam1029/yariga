import React, { useEffect, useState } from "react";
import { LayoutMain } from "@/components/layout";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewProperty } from "@/store/property.service";
import Heading from "@/components/heading/Heading";
import Button from "@/components/button/Button";
import Dropdown from "@/components/dropdown/Dropdown";
import { useForm } from "react-hook-form";
import { PropertyItemData, TDropdownData } from "@/types/property.types";
import FormField from "@/components/input/FormField";
import ToggleSwitch from "@/components/toggle/ToggleSwitch";
import { toast, Flip } from "react-toastify";
import validationSchema from "@/utils/validationSchema";
import { yupResolver } from "@hookform/resolvers/yup";

const dataOptionsType: TDropdownData[] = [
  { value: "", label: "Any Type" },
  { value: "apartment", label: "Apartment" },
  { value: "houses", label: "Houses" },
  { value: "commercial", label: "Commercial" },
  { value: "garages", label: "Garages" },
  { value: "lots", label: "Lots" },
];
const dataOptionsStatus: TDropdownData[] = [
  { value: "", label: "Any Type" },
  { value: "sale", label: "For Sale" },
  { value: "rent", label: "For Rent" },
];

const create = () => {
  const [addProperty, setAddProperty] = useState([]);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitSuccessful, isSubmitting },
    getValues,
    setValue,
  } = useForm<PropertyItemData>({
    mode: "onSubmit",
    resolver: yupResolver(validationSchema),
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: addNewProperty,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["property"] });
    },
  });
  const onSubmit = async (data: PropertyItemData) => {
    if (typeof data.image === "string") {
      data.image = data.image.split(",");
    }

    try {
      const res = await mutation.mutateAsync(data);
    } catch (error) {
      if (error) {
        toast.error("Please try again.", {
          position: "bottom-left",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Flip,
        });
      }
    }
  };

  // ======================================= UPLOAD IMAGE====================
  // const handleUploadImage = async (e: any) => {
  //   const file = e.target.files[0];
  //   console.log(
  //     "🚀 ~ file: create.tsx:74 ~ handleUploadImage ~ file:",
  //     e.target.file
  //   );
  //   // const bodyFormData = new FormData();
  //   // bodyFormData.append("image", file);
  //   // const response = await axios({
  //   //   method: "post",
  //   //   url: imgbbAPI,
  //   //   data: bodyFormData,
  //   //   headers: {
  //   //     "Content-Type": "multipart/form-data",
  //   //   },
  //   // });
  // };

  useEffect(() => {
    const arrErroes = Object.values(errors);
    if (arrErroes.length > 0) {
      toast.error(arrErroes[0]?.message, {
        pauseOnHover: false,
        delay: 0,
      });
    }
  }, [errors]);
  useEffect(() => {
    if (isSubmitSuccessful) {
      toast.success("🦄 Wow so easy!", {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Flip,
      });
      reset();
    }
  }, [isSubmitSuccessful, reset]);
  return (
    <LayoutMain>
      <Heading text="Add a new product" className="mb-5" />
      <section className="bg-white dark:bg-gray-900">
        <div className="px-4 py-8 mx-auto lg:py-16">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-3 gap-4 ">
              <FormField
                label="Title"
                name="title"
                control={control}
                placeholder="Metro Jayakarta Hotel & Spa"
              />
              <FormField
                label="Address"
                name="address"
                control={control}
                placeholder="North NewYork, USA"
              />
              <FormField
                label="Beds"
                name="facilityBeds"
                control={control}
                type="number"
                placeholder="9"
              />
              <FormField
                label="Baths"
                name="facilityBaths"
                control={control}
                type="number"
                placeholder="1,2,3..."
              />
              <FormField
                label="Area"
                name="facilityArea"
                control={control}
                placeholder="69M"
              />
              <FormField
                label="Rating"
                name="rating"
                control={control}
                type="number"
                placeholder="4,5"
              />
              <FormField
                label="Status"
                name="status"
                control={control}
                type="radio"
                data={dataOptionsStatus}
                defaultValue=""
              />
              <div className="col-span-2">
                <FormField
                  label="Type"
                  name="type"
                  control={control}
                  type="radio"
                  data={dataOptionsType}
                  defaultValue=""
                />
              </div>

              <ToggleSwitch
                name="facilitySmoking-area"
                label="Smoking Area"
                control={control}
              />

              <ToggleSwitch
                name="facilityKitchen"
                label="Kitchen"
                control={control}
              />

              <ToggleSwitch
                name="facilityBalcony"
                label="Balcony"
                control={control}
              />

              <ToggleSwitch
                name="facilityWifi"
                label="Wifi"
                control={control}
              />

              <ToggleSwitch
                name="facilityParking-area"
                label="Parking area"
                control={control}
              />

              <FormField
                label="Country"
                name="country"
                control={control}
                placeholder="USA..."
              />

              <FormField
                label="State"
                name="state"
                control={control}
                placeholder="North Carolina"
              />
              <FormField
                label="Agent Name"
                name="agentName"
                control={control}
                placeholder="Hussain Ahmed"
              />
              <FormField
                label="Agent Phone"
                name="agentPhone"
                control={control}
                placeholder="0966...."
              />
              <FormField
                label="Agent Address"
                name="agentAddress"
                control={control}
                placeholder="North Carolina, USA"
              />
              <FormField
                label="Agent Properties"
                name="agentProperties"
                control={control}
                type="number"
                placeholder="10"
              />

              <FormField
                label="Image URLs"
                name="image"
                control={control}
                placeholder="image1.png,image2.jpg..."
              />
              <div className="grid col-span-3">
                <FormField
                  label="Description"
                  name="description"
                  control={control}
                  textarea
                />
              </div>
            </div>

            <Button
              text=" + Add property"
              className="w-[126px] h-[46px] mt-8"
              type="submit"
              isLoading={isSubmitting}
            />
          </form>
        </div>
      </section>
    </LayoutMain>
  );
};

export default create;
