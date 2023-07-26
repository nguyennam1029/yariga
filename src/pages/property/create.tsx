import React, { useState } from "react";
import { LayoutMain } from "@/components/layout";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewProperty } from "@/store/property.service";
import Heading from "@/components/heading/Heading";
import Button from "@/components/button/Button";

const create = () => {
  const [test, setTest] = useState(false);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: addNewProperty,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["property"] });
    },
  });
  const handleCreateNewProperty = () => {
    // mutation.mutate();
    setTimeout(() => {
      setTest(!test);
    }, 2000);
  };
  return (
    <LayoutMain>
      <Heading text="Add a new product" className="mb-5" />
      <section className="bg-white dark:bg-gray-900">
        <div className="px-4 py-8 mx-auto lg:py-16">
          <form action="#">
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-primaryText dark:text-white after:content-['*'] after:ml-0.5 after:text-red-500"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-primaryText text-sm rounded-lg focus:outline-none focus:border-primary focus:ring-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type product name"
                  required
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="brand"
                  className="block mb-2 text-sm font-medium text-primaryText dark:text-white"
                >
                  Brand
                </label>
                <input
                  type="text"
                  name="brand"
                  id="brand"
                  className="bg-gray-50 border border-gray-300 text-primaryText text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Product brand"
                  required
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="price"
                  className="block mb-2 text-sm font-medium text-primaryText dark:text-white"
                >
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  className="bg-gray-50 border border-gray-300 text-primaryText text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="$2999"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-primaryText dark:text-white"
                >
                  Category
                </label>
                <select
                  id="category"
                  className="bg-gray-50 border border-gray-300 text-primaryText text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option selected>Select category</option>
                  <option value="TV">TV/Monitors</option>
                  <option value="PC">PC</option>
                  <option value="GA">Gaming/Console</option>
                  <option value="PH">Phones</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="item-weight"
                  className="block mb-2 text-sm font-medium text-primaryText dark:text-white"
                >
                  Item Weight (kg)
                </label>
                <input
                  type="number"
                  name="item-weight"
                  id="item-weight"
                  className="bg-gray-50 border border-gray-300 text-primaryText text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="12"
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-primaryText dark:text-white"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  rows={8}
                  className="block p-2.5 w-full text-sm text-primaryText bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Your description here"
                  defaultValue={""}
                />
              </div>
            </div>
            <button
              type="submit"
              className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
            >
              Add product
            </button>
          </form>
          <Button
            text=" + Add property"
            onClick={handleCreateNewProperty}
            isLoading={test}
            className="w-[126px] h-[46px]"
          />
          {/* <button
            onClick={handleCreateNewProperty}
            className="m-auto flex items-center justify-center px-5 py-3 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl text-sm font-medium rounded-[10px] leading-normal"
          >
            + Add Property
          </button> */}
        </div>
      </section>
    </LayoutMain>
  );
};

export default create;
