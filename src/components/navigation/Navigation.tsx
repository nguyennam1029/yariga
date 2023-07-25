import { useRouter } from "next/router";
import React from "react";
import IconPrev from "../icons/IconPrev";
import IconNext from "../icons/IconNext";
import classNames from "classnames";
const Navigation = (totalPage: any, _page: any) => {
  console.log("🚀 ~ file: Navigation.tsx:7 ~ Navigation ~ page:", _page);
  const router = useRouter();
  const totalPages = totalPage?.totalPage;
  const handleButtonClick = (pageNumber: any) => {
    // Điều hướng đến trang mong muốn với tham số truy vấn
    router.push(`/property?_page=${pageNumber}`);
  };

  return (
    <div className="flex items-center gap-2">
      <button className="flex items-center justify-center text-white rounded-lg w-9 h-9">
        <IconPrev />
      </button>
      <div className="flex items-center gap-[10px]">
        {Array(totalPages)
          .fill(0)
          .map((_, index) => {
            const pageNumber = index + 1;
            return (
              <button
                onClick={() => handleButtonClick(pageNumber)}
                key={index}
                className={
                  (classNames(
                    "flex items-center justify-center transition duration-500 ease-in-out rounded-lg text-gray80 w-9 h-9 hover:bg-primary hover:text-white"
                  ),
                  "bg-primary text-white")
                }
              >
                {pageNumber}
              </button>
            );
          })}
      </div>
      <button className="flex items-center justify-center text-white rounded-lg w-9 h-9">
        <IconNext />
      </button>
    </div>
  );
};
export default Navigation;
