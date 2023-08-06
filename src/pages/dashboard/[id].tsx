import Button from "@/components/button/Button";
import FormField from "@/components/input/FormField";
import Heading from "@/components/heading/Heading";
import React, { useEffect, useState } from "react";
import ToggleSwitch from "@/components/toggle/ToggleSwitch";
import validationSchema from "@/utils/validationSchema";
import { Flip, toast } from "react-toastify";
import { LayoutMain } from "@/components/layout";
import { PropertyItemData, TDropdownData } from "@/types/property.types";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  addNewProperty,
  getProperty,
  updateProperty,
} from "@/store/property.service";

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
  const router = useRouter();
  const id = parseInt(router.query.id as string);

  const [property, setProperty] = useState<PropertyItemData>({});
  const [formData, setFormData] = useState<PropertyItemData>({});

  useQuery({
    queryKey: ["property", id],
    queryFn: () => getProperty(id),
    onSuccess: (data: PropertyItemData) => {
      setProperty(data);
    },
    refetchOnWindowFocus: false,
    staleTime: 15 * 100 * 1000,
  });

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
  useEffect(() => {
    // Khi giá trị trong property thay đổi, cập nhật giá trị ban đầu của form
    setValue("title", property.title);
    setValue("address", property.address);
    setValue("rating", property.rating);
    setValue("facility", property.facility);
    setValue("status", property.status);
    setValue("type", property.type);
    setValue("price", property.price);
    setValue("image", property.image);
    setValue("country", property.country);
    setValue("description", property.description);
    setValue("state", property.state);
    setValue("facilityBeds", property?.facility?.beds);
    setValue("facility.baths", property?.facility?.baths);
    setValue("facility.area", property?.facility?.area);
    setValue("facility-Smoking-Area", property?.facility?.smookingArea);
    setValue("facility.kitchen", property?.facility?.kitchen);
    setValue("facility.balcony", property?.facility?.balcony);
    setValue("facility.wifi", property?.facility?.wifi);
    setValue("agentName", property?.agent?.name);
    setValue("agentPhone", property?.agent?.phone);
    setValue("agentAddress", property?.agent?.address);
    setValue("agentProperties", property?.agent?.properties);
  }, [property, setValue]);
  // ======================================
  //  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (_) =>
      updateProperty(id as number, formData as PropertyItemData),
  });
  const handleUpdateForm = async (data: PropertyItemData): Promise<void> => {
    console.log("🚀 ~ file: [id].tsx:74 ~ onSubmit ~ data:", data);
    if (typeof data.image === "string") {
      data.image = data.image.split(",");
    }

    setFormData(data);
    try {
      await mutation.mutateAsync(formData);
      toast.success("Update success");
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

  return (
    <LayoutMain>
      <Heading text="Update product" className="mb-5" />
      <section className="bg-white dark:bg-gray-900">
        <div className="px-4 py-8 mx-auto lg:py-16">
          <form onSubmit={handleSubmit(handleUpdateForm)}>
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
                name="facility.baths"
                control={control}
                type="number"
                placeholder="1,2,3..."
              />
              <FormField
                label="Area"
                name="facility.area"
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
                name="facility-Smoking-Area"
                label="Smoking Area"
                control={control}
              />

              <ToggleSwitch
                name="facility.kitchen"
                label="Kitchen"
                control={control}
              />

              <ToggleSwitch
                name="facility.balcony"
                label="Balcony"
                control={control}
              />

              <ToggleSwitch
                name="facility.wifi"
                label="Wifi"
                control={control}
              />

              <ToggleSwitch
                name="facility.parking-area"
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
              text=" + Update"
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
