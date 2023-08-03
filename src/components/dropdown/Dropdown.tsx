import { TPropertyStatus } from "@/types/general.types";
import { TDropdownData } from "@/types/property.types";
import { Menu } from "@headlessui/react";

interface DropdownProps {
  selected?: string;
  data?: TDropdownData[];
  onClick?: (value: TPropertyStatus) => void;
}
function Dropdown({ selected = "Any Status", data, onClick }: DropdownProps) {
  return (
    <Menu as="div" className="relative basis-40">
      {({ open }) => (
        <>
          <Menu.Button className="w-full">
            <div className="flex items-center w-full justify-between p-2.5 rounded-lg bg-grayF7 gap-2.5 text-xs font-medium">
              {selected}
              <span
                style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
              >
                <svg
                  width="9"
                  height="6"
                  viewBox="0 0 9 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M0.175736 0.681116C0.41005 0.439628 0.789949 0.439628 1.02426 0.681116L4.5 4.26326L7.97574 0.681115C8.21005 0.439627 8.58995 0.439626 8.82426 0.681115C9.05858 0.922603 9.05858 1.31413 8.82426 1.55562L5.34853 5.13777C4.8799 5.62074 4.1201 5.62074 3.65147 5.13777L0.175736 1.55562C-0.0585785 1.31413 -0.0585786 0.922604 0.175736 0.681116Z"
                    fill="#808191"
                  />
                </svg>
              </span>
            </div>
          </Menu.Button>
          <Menu.Items className="absolute left-0 right-0 z-10 rounded-lg shadow-slate-500 top-full bg-garyFc bg-grayfc">
            {data &&
              data?.length > 0 &&
              data?.map((item) => (
                <Menu.Item
                  key={item.value}
                  as="div"
                  onClick={() => onClick?.(item.value as any)}
                  className="p-2 text-sm font-medium rounded-lg cursor-pointer hover:bg-primary hover:text-grayfc text-gray80"
                >
                  <span>{item.label}</span>
                </Menu.Item>
              ))}
          </Menu.Items>
        </>
      )}
    </Menu>
  );
}
export default Dropdown;
