import classNames from "classnames";
import IconNext from "@/components/icons/IconNext";
import IconPrev from "@/components/icons/IconPrev";
import Link from "next/link";
import PropertyItem from "@/modules/PropertyItem";
import React, { useState } from "react";
import Spinner from "../components/loadings/Spinner";
import { getProperties } from "@/store/property.service";
import { LayoutMain } from "@/components/layout";
import { PropertyItemData } from "@/types/property.types";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import Heading from "@/components/heading/Heading";
import Dropdown from "@/components/dropdown/Dropdown";
import { statusData } from "@/components/constants/general.const";
import { TFilter, TPropertyStatus } from "@/types/general.types";
import { IconSearch } from "@/components/icons";
import { debounce } from "lodash";

const _limit: number | string | undefined = 10;

const property = () => {
  const [selected, setSelected] = useState({
    status: "Any Status",
  });
  const [filter, setFilter] = useState<TFilter>({
    text: "",
    status: "",
    type: "",
    country: "",
    state: "",
  });

  const router = useRouter();
  // Query param
  const searchParams = useSearchParams();
  const _page: number | string = Number(searchParams.get("_page")) || 1;

  // Queries
  const { data, isLoading, error } = useQuery({
    queryKey: ["property", _page, filter.text],
    queryFn: () => getProperties({ text: filter.text, page: _page, limit: 10 }),
    keepPreviousData: true,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 15 * 100 * 1000,
    cacheTime: 30 * 100 * 1000,
  });

  const handleButtonNavigation = (pageNumber: number) => {
    router.push(`/property?_page=${pageNumber}`);
  };
  const properties = data?.data;

  const totalProperties = Number(data?.headers["x-total-count"]) || 0;

  const totalPage = Math.ceil(totalProperties / _limit);

  // Handle Filter
  const handleSearchProperty = debounce(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log(e.target.value);

      setFilter({
        ...filter,
        text: e.target.value,
      });
    },
    500
  );
  const handleFilterByStatus = (value: TPropertyStatus) => {
    setFilter({
      ...filter,
      status: value,
    });
    const foundStatus = statusData.find((item) => item.value === value);

    setSelected({
      ...selected,
      status: value ? foundStatus?.label || "" : "Any Status",
    });
  };
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
          <div aria-label="filter" className="flex items-center gap-5 mb-6 ">
            <div className="rounded-lg p-2.5 gap-2.5 bg-grayF7 flex items-center basis-[229px] h-fit">
              <IconSearch></IconSearch>
              <input
                type="text"
                className="w-full text-xs font-medium bg-transparent outline-none"
                placeholder="Enter an address, city or Zip code"
                onChange={handleSearchProperty}
              />
            </div>
            <Dropdown
              selected={selected.status}
              data={statusData}
              onClick={handleFilterByStatus}
            />
            <Dropdown selected="Any Type" />
            <Dropdown selected="All Countries" />
            <Dropdown selected="All States" />
            <button className="flex items-center gap-2.5 rounded-lg bg-grayF7 p-2 text-xs font-medium text-gray80">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M4.59451 13.5H3C2.58579 13.5 2.25 13.1642 2.25 12.75C2.25 12.3358 2.58579 12 3 12H4.59451C4.92755 10.7061 6.10212 9.75 7.5 9.75C8.89788 9.75 10.0725 10.7061 10.4055 12H15C15.4142 12 15.75 12.3358 15.75 12.75C15.75 13.1642 15.4142 13.5 15 13.5H10.4055C10.0725 14.7939 8.89788 15.75 7.5 15.75C6.10212 15.75 4.92755 14.7939 4.59451 13.5ZM6 12.75C6 11.9216 6.67157 11.25 7.5 11.25C8.32843 11.25 9 11.9216 9 12.75C9 13.5784 8.32843 14.25 7.5 14.25C6.67157 14.25 6 13.5784 6 12.75Z"
                  fill="#808191"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M7.59451 6H3C2.58579 6 2.25 5.66421 2.25 5.25C2.25 4.83579 2.58579 4.5 3 4.5H7.59451C7.92755 3.20608 9.10212 2.25 10.5 2.25C11.8979 2.25 13.0725 3.20608 13.4055 4.5H15C15.4142 4.5 15.75 4.83579 15.75 5.25C15.75 5.66421 15.4142 6 15 6H13.4055C13.0725 7.29392 11.8979 8.25 10.5 8.25C9.10212 8.25 7.92755 7.29392 7.59451 6ZM9 5.25C9 4.42157 9.67157 3.75 10.5 3.75C11.3284 3.75 12 4.42157 12 5.25C12 6.07843 11.3284 6.75 10.5 6.75C9.67157 6.75 9 6.07843 9 5.25Z"
                  fill="#808191"
                />
              </svg>
              <span>More</span>
            </button>
          </div>
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
