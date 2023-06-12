import React from "react";
import Link from "next/link";
import { sidebarLinks } from "../constants/general.const";
import { TSidebarLink } from "../types/general.types";
import { useRouter } from "next/router";

const Sidebar = () => {
  const router = useRouter();
  const { pathname } = router;
  return (
    <div className="min-h-screen mx-4 mt-6 bg-grayfc">
      {sidebarLinks.length > 0 &&
        sidebarLinks.map((link) => (
          <SidebarLink
            link={link}
            isActive={pathname === link.url}
          ></SidebarLink>
        ))}
    </div>
  );
};

interface ISidebarLink {
  link: TSidebarLink;
  isActive: boolean;
}
const SidebarLink = ({ link, isActive }: ISidebarLink) => {
  return (
    <Link
      href={link.url}
      key={link.id}
      className={`flex items-center px-6 py-4 text-base font-bold gap-c10 text-gray80 rounded-xl ${
        isActive
          ? "bg-primary text-grayfc"
          : "hover:text-primary transition hover:translate-x-1 hover:duration-300 ease-in"
      }`}
    >
      <span className="hover:text-primary">{link.icon}</span>
      <span>{link.title}</span>
    </Link>
  );
};
export default Sidebar;
