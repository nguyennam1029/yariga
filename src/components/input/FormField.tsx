import React, { useState } from "react";
import { Control, FieldErrors, Controller } from "react-hook-form";
import { RadioGroup } from "@headlessui/react";

type RadioOption = {
  value: string;
  label: string;
};

type FormFieldProps = {
  label: string;
  name: string;
  control: Control;
  errors?: FieldErrors;
  type?: string;
  textarea?: boolean;
  placeholder?: string;
  data?: RadioOption[];
  defaultValue?: string;
};

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  control,
  errors,
  type = "text",
  textarea = false,
  placeholder = `Add your ${label} here`,
  data = [],
  defaultValue,
}) => {
  return (
    <div className="flex flex-col items-start gap-2">
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-primaryText dark:text-white after:content-['*'] after:ml-0.5 after:text-red-500"
      >
        {label}:
      </label>
      {textarea ? (
        <textarea
          {...control.register(name)}
          rows={8}
          className="block p-2.5 w-full text-sm text-primaryText bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500   placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          placeholder={placeholder}
        />
      ) : type === "radio" ? (
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          render={({ field }) => (
            <RadioGroup value={field.value} onChange={field.onChange}>
              <RadioGroup.Label className="sr-only">{label}</RadioGroup.Label>
              <div className="flex flex-wrap gap-10">
                {data.map((option) => (
                  <RadioGroup.Option key={option.value} value={option.value}>
                    {({ checked }) => (
                      <div className="flex items-center gap-[6px] cursor-pointer focus:outline-none">
                        <span className="block text-sm font-medium text-primaryText dark:text-white">
                          {option.label}
                        </span>
                        <div
                          className={`${
                            checked
                              ? "bg-primary-600 border-grayF7"
                              : "bg- border-gray80"
                          } border rounded-full h-6 w-6 flex items-center justify-center `}
                        >
                          <span
                            className={`${
                              checked ? "bg-primary rounded-full" : "bg-#f1f"
                            } block w-6 h-6`}
                          />
                        </div>
                      </div>
                    )}
                  </RadioGroup.Option>
                ))}
              </div>
            </RadioGroup>
          )}
        />
      ) : (
        <input
          type={type}
          {...control.register(name)}
          placeholder={placeholder}
          className="bg-gray-50 border border-gray-300 text-primaryText text-sm rounded-lg focus:outline-none focus:border-primary focus:ring-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        />
      )}
      {errors && <span>error</span>}
    </div>
  );
};

export default FormField;
