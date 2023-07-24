import React from "react";
import { LayoutMain } from "@/components/layout";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewProperty, getProperty } from "@/store/property.service";

const create = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: addNewProperty,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["property"] });
    },
  });
  const handleCreateNewProperty = () => {
    mutation.mutate();
  };
  return (
    <LayoutMain>
      <button
        onClick={handleCreateNewProperty}
        className="m-auto flex items-center justify-center px-5 py-3 text-white bg-primary text-sm font-medium rounded-[10px] leading-normal"
      >
        + Add Property
      </button>
    </LayoutMain>
  );
};

export default create;
