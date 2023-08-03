import React from "react";
import { Switch } from "@headlessui/react";
import { Control, useController } from "react-hook-form";

type ToggleSwitchProps = {
  name: string;
  label: string;
  control: Control<Record<string, any>>; // Sử dụng Control với kiểu dữ liệu là Record<string, any>
};

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  name,
  label,
  control,
}) => {
  const { field, fieldState } = useController({
    control,
    defaultValue: false, // Giá trị mặc định khi chưa có giá trị
    name,
  });

  return (
    <Switch.Group>
      <div className="flex flex-col items-start gap-2">
        <Switch.Label className="block mb-2 text-sm font-medium text-primaryText dark:text-white ">
          {label}
        </Switch.Label>
        <Switch
          checked={field.value}
          onChange={field.onChange}
          className={`${field.value ? "bg-blue-600" : "bg-gray-200"}
            relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-50`}
        >
          {({ checked }) => (
            <span
              className={`${checked ? "translate-x-5" : "translate-x-0"}
                pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
            />
          )}
        </Switch>
      </div>
    </Switch.Group>
  );
};

export default ToggleSwitch;
