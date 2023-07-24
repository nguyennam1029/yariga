import { LayoutMain } from "@/components/layout";
import PropertyItem from "@/modules/PropertyItem";
import React from "react";
// import { usePropertyStore } from "@/store/property.service";
import { PropertyItemData } from "@/types/property.types";
import Spinner from "../components/loadings/Spinner";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { getProperties } from "@/store/property.service";

const _limit: number | string = 1;
const property = () => {
  // Query param
  const searchParams = useSearchParams();
  const _page: number | string = Number(searchParams.get("_page")) || 1;
  // Queries
  const { data, isLoading, error } = useQuery({
    queryKey: ["property", _page],
    queryFn: () => getProperties(_page, _limit),
    refetchOnWindowFocus: false,
    staleTime: 15 * 100 * 1000,
  });

  const properties = data?.data;
  const totalPage = Number(data?.headers["x-total-count"] / _limit);

  return (
    <LayoutMain>
      <div className="flex items-center justify-between mb-5">
        <h1 className="font-bold text-[25px] text-primaryText">
          Property List
        </h1>
        <Link
          href="/property/create"
          className="flex items-center justify-center px-5 py-3 text-white bg-primary text-sm font-medium rounded-[10px] leading-normal"
        >
          + Add Property
        </Link>
      </div>
      {isLoading || error ? (
        <Spinner />
      ) : (
        <div className="p-5 bg-white rounded-2xl">
          <div aria-label="filter"></div>
          <div
            aria-label="list"
            className="grid grid-cols-2 gap-x-16 gap-y-6 mb-9"
          >
            {properties &&
              properties.length > 0 &&
              properties.map((item: PropertyItemData) => (
                <PropertyItem key={item.id} item={item}></PropertyItem>
              ))}
          </div>
          <div
            aria-label="pagination"
            className="flex items-center justify-between"
          >
            <p className="text-gray80">Showing 1 to 10 Property</p>
            <div className="flex items-center gap-[10px]">
              {Array(totalPage)
                .fill(0)
                .map((_, index) => {
                  const numberPage = index + 1;
                  return (
                    <Link
                      href={`/property?_page=${numberPage}`}
                      key={index}
                      className="flex items-center justify-center text-white rounded-lg w-9 h-9 bg-primary"
                    >
                      {numberPage}
                    </Link>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </LayoutMain>
  );
};

export default property;
