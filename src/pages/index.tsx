import Heading from "@/components/heading/Heading";
import { LayoutMain } from "@/components/layout";
import DasboardList from "@/modules/dashboard/DashboardList";
import Link from "next/link";

export default function Home() {
  return (
    <LayoutMain>
      <div className="flex items-center justify-between mb-5">
        <Heading text="Dashboard" />
        <Link
          href="/property/create"
          className="flex items-center justify-center px-5 py-3 text-white bg-primary text-sm font-medium rounded-[10px] leading-normal"
        >
          + Add Property
        </Link>
      </div>
      <DasboardList />
    </LayoutMain>
  );
}
