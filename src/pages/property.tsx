import classNames from "classnames";
import IconNext from "@/components/icons/IconNext";
import IconPrev from "@/components/icons/IconPrev";
import Link from "next/link";
import PropertyItem from "@/modules/PropertyItem";
import React from "react";
import Spinner from "../components/loadings/Spinner";
import { getProperties } from "@/store/property.service";
import { LayoutMain } from "@/components/layout";
import { PropertyItemData } from "@/types/property.types";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import Heading from "@/components/heading/Heading";

const _limit: number | string = 10;
const property = () => {
  const router = useRouter();
  // Query param
  const searchParams = useSearchParams();
  const _page: number | string = Number(searchParams.get("_page")) || 1;

  // Queries
  const { data, isLoading, error } = useQuery({
    queryKey: ["property", _page],
    queryFn: () => getProperties(_page, _limit),
    keepPreviousData: true,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 15 * 100 * 1000,
    // cacheTime: 30 * 100 * 1000,
  });

  const handleButtonNavigation = (pageNumber: number) => {
    router.push(`/property?_page=${pageNumber}`);
  };
  const properties = data?.data;

  const totalProperties = Number(data?.headers["x-total-count"]) || 0;
  const totalPage = Math.ceil(totalProperties / _limit);

  return (
    <LayoutMain>
      <div className="flex items-center justify-between mb-5">
        <Heading text="Property List" />
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

            <div className="flex items-center gap-2">
              {_page === 1 ? (
                <span className="flex items-center justify-center text-white rounded-lg cursor-not-allowed w-9 h-9">
                  <IconPrev />
                </span>
              ) : (
                <button
                  onClick={() => router.push(`/property?_page=${_page - 1}`)}
                  className="flex items-center justify-center text-white rounded-lg w-9 h-9"
                >
                  <IconPrev />
                </button>
              )}

              <div className="flex items-center gap-[10px]">
                {Array(totalPage)
                  .fill(0)
                  .map((_, index) => {
                    const pageNumber = index + 1;
                    const isActive = pageNumber === _page;
                    return (
                      <button
                        onClick={() => handleButtonNavigation(pageNumber)}
                        key={index}
                        className={classNames(
                          "flex items-center justify-center transition duration-500 ease-in-out rounded-lg text-gray80 w-9 h-9 hover:bg-primary hover:text-white",
                          { "bg-primary text-white": isActive }
                        )}
                      >
                        {pageNumber}
                      </button>
                    );
                  })}
              </div>
              {_page === totalPage ? (
                <span className="flex items-center justify-center text-white rounded-lg cursor-not-allowed w-9 h-9">
                  <IconNext />
                </span>
              ) : (
                <button
                  onClick={() => router.push(`/property?_page=${_page + 1}`)}
                  className="flex items-center justify-center text-white rounded-lg w-9 h-9"
                >
                  <IconNext />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </LayoutMain>
  );
};

export default property;
