import { useState } from "react";
import { RadioGroup } from "@headlessui/react";

const plans = [
  {
    name: "Startup",
    ram: "12GB",
    cpus: "6 CPUs",
    disk: "160 GB SSD disk",
  },
  {
    name: "Business",
    ram: "16GB",
    cpus: "8 CPUs",
    disk: "512 GB SSD disk",
  },
  {
    name: "Enterprise",
    ram: "32GB",
    cpus: "12 CPUs",
    disk: "1024 GB SSD disk",
  },
];

export default function Example() {
  const [selected, setSelected] = useState(plans[0]);

  return (
    <div className="w-full px-4 py-16">
      <div className="w-full max-w-md mx-auto">
        <RadioGroup value={selected} onChange={setSelected}>
          <RadioGroup.Label className="sr-only">Status</RadioGroup.Label>
          <div className="space-y-2">
            {plans.map((plan) => (
              <RadioGroup.Option
                key={plan.name}
                value={plan}
                className={({ active, checked }) =>
                  `${active ? "text-#f1f" : ""}
                  ${checked ? " text-primary" : "text-gray80"}
                    relative flex cursor-pointer focus:outline-none`
                }
              >
                {({ active, checked }) => (
                  <>
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="p"
                            className={`font-medium  ${
                              checked ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {plan.name}
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as="span"
                            className={`inline ${
                              checked ? "text-sky-100" : "text-gray-500"
                            }`}
                          >
                            <span>
                              {plan.ram}/{plan.cpus}
                            </span>{" "}
                            <span aria-hidden="true">&middot;</span>{" "}
                            <span>{plan.disk}</span>
                          </RadioGroup.Description>
                        </div>
                      </div>
                      {checked && (
                        <div className="text-white shrink-0">
                          <CheckIcon className="w-6 h-6" />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}

function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
