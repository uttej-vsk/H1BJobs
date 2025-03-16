"use client";
import React from "react";
import { ComboBoxCategory } from "./ui/ComboBoxCategory";
import { ComboBoxJobType } from "./ui/ComboBoxJobType";
import ClearFilter from "./ClearFilter";

const category = [
  {
    value: "Engineering",
    label: "Engineering",
  },
  {
    value: "Design",
    label: "Design",
  },
  {
    value: "Product",
    label: "Product",
  },
];

const job_type = [
  {
    value: "full_time",
    label: "Full time",
  },
  {
    value: "contract",
    label: "Contract",
  },
];

function Filters() {
  return (
    <div className="flex mt-10 justify-center mb-18 items-center">
      <span className="text-sm font-semibold mr-4">Filters</span>

      <div className="inline-flex">
        <ClearFilter>
          <ComboBoxCategory category={category} />
          <ComboBoxJobType job_type={job_type} />
        </ClearFilter>
      </div>
    </div>
  );
}

export default Filters;
