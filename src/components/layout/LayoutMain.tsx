import React from "react";

import Topbar from "./Topbar";
import Sidebar from "./Sidebar";

interface ILayoutMainProps {
  children: React.ReactNode;
}

const LayoutMain = ({ children }: ILayoutMainProps) => {
  return (
    <div className=" max-w-[1440px] w-full m-auto">
      <Topbar></Topbar>
      <div className="grid grid-cols-[250px_minmax(0,1fr)] mt-24">
        <Sidebar></Sidebar>
        <div className="p-6 rounded-md bg-grayf4">{children}</div>
      </div>
    </div>
  );
};

export default LayoutMain;
