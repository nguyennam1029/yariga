import Image from "next/image";
import Link from "next/link";
import React from "react";
import { deleteProperty } from "@/store/property.service";
import { IconEdit, IconTrash } from "@/components/icons";
import { PropertyItemData } from "@/types/property.types";
import { toast } from "react-toastify";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
interface PropertyItemProps {
  item: PropertyItemData;
}
const DasboardItem = ({ item }: PropertyItemProps) => {
  // Queries
  // const deletePropertyMutation = useMutation({
  // mutationFn: (id: number) => deleteProperty(id),
  // onSuccess: (_, id) => {
  //   toast.success("Delete success");
  // },
  // });
  // const handelDelete = (id: number) => {
  //   // deletePropertyMutation.mutate(id);
  // };
  return (
    <tr className=" border-gray80">
      <td
        scope="row"
        className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        <Image
          src={item.image && item.image.length > 0 ? item.image[0] : ""}
          // src=""
          alt="setup"
          width={120}
          height={120}
          className="object-cover rounded-lg"
        ></Image>
      </td>
      <td className="px-4 py-3"> {item?.title}</td>
      <td className="px-4 py-3">{item?.price}</td>
      <td className="px-4 py-3">{item?.address}</td>
      <td className="px-4 py-3">{item?.status}</td>
      <td className="px-4 py-3">{item?.type}</td>
      <td className="px-4 py-3">
        <div className="flex items-center justify-center gap-2 ">
          <button
            type="button"
            // onClick={() => handelDelete(item?.id)}
            className="text-red-600"
          >
            <IconTrash />
          </button>
          <Link href={`/dashboard/${item?.id}`} className=" text-primary">
            <IconEdit />
          </Link>
        </div>
      </td>
    </tr>
  );
};

export default DasboardItem;
