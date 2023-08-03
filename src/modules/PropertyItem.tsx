import { IconBeds, IconCross } from "@/components/icons";
import IconLocation from "@/components/icons/IconLocation";
import Image from "next/image";
import React from "react";
import { PropertyItemData } from "@/types/property.types";
import Link from "next/link";

// import trophim from "trophim-lapteff.jpg";
interface PropertyItemProps {
  item: PropertyItemData;
}
const PropertyItem = ({ item }: PropertyItemProps) => {
  return (
    <Link
      href={{
        pathname: "/property/[id]",
        query: { id: item.id },
      }}
      className="flex gap-2 overflow-hidden "
    >
      <div className="relative h-[126px] w-[202px] overflow-hidden rounded-xl">
        <Image
          src={item.image && item.image.length > 0 ? item.image[0] : ""}
          // src=""
          alt="setup"
          fill
          className="object-cover w-full h-full"
        ></Image>
      </div>
      <div className="flex-1">
        <span className="inline-block text-xs font-semibold text-primary py-2 px-[10px] rounded-[5px] bg-secondary mb-2">
          ${item.price}
        </span>
        <h3 className="mb-1 text-base font-semibold text-primaryText">
          {item.title}
        </h3>
        <h4>{item.status}</h4>
        <div className="flex items-center gap-1 mb-2 text-gray80">
          <IconLocation></IconLocation>
          <span className="line-clamp-1">{item.address}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <IconBeds></IconBeds>
            <span className="text-xs font-medium">{item.facility?.beds}</span>
          </div>
          <div className="flex items-center gap-1">
            <IconCross></IconCross>
            <span className="text-xs font-medium">{item.facility?.area}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyItem;
