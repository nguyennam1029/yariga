import { IconBeds, IconCross } from "@/components/icons";
import IconLocation from "@/components/icons/IconLocation";
import Image from "next/image";
import React from "react";
// import trophim from "trophim-lapteff.jpg";
interface PropertyItemProps {
  children?: React.ReactNode;
}
const PropertyItem = ({ children }: PropertyItemProps) => {
  return (
    <div className="flex gap-2">
      <div className="relative">
        <Image
          src="/trophim-lapteff.jpg"
          alt="setup"
          width={200}
          height={150}
          className="object-cover rounded-xl"
        ></Image>
      </div>
      <div className="flex-1">
        <span className="inline-block text-xs font-semibold text-primary py-2 px-[10px] rounded-[5px] bg-secondary mb-2">
          $7400
        </span>
        <h3 className="mb-1 text-base font-semibold text-primaryText">
          Metro Jayakarta Hotel & Spa
        </h3>
        <div className="flex items-center gap-1 mb-2 text-gray80">
          <IconLocation></IconLocation>
          <span>North Carolina, USA</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <IconBeds></IconBeds>
            <span className="text-xs font-medium">4 Beds</span>
          </div>
          <div className="flex items-center gap-1">
            <IconCross></IconCross>
            <span className="text-xs font-medium">28M</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyItem;
