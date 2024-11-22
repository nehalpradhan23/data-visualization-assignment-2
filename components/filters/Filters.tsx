import { useGlobalContext } from "@/context/ContextApi";
import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import { DatePickerComponent } from "./DatePickerComponent";
import { handleFilterChange } from "@/utils/saveFilterData";
import { parseDate } from "@/utils/getDate";

export const Filters = () => {
  const {
    ageFilterObject: { ageFilter, setAgeFilter },
    genderFilterObject: { genderFilter, setGenderFilter },
    dateObject: { setStartDate, setEndDate },
    formattedDataObject: { formattedData },
    storeAllFiltersObject: { storeAllFilters, setStoreAllFilters },
    selectedBarValueObject: { setSelectedBarValue },
    shareableUrlObject: { setShareableUrl },
  } = useGlobalContext();

  const handleAgeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    handleFilterChange(
      "ageFilter",
      event.target.value,
      storeAllFilters,
      setStoreAllFilters
    );
    setAgeFilter(event.target.value || null);
  };
  const handleGenderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    handleFilterChange(
      "genderFilter",
      event.target.value,
      storeAllFilters,
      setStoreAllFilters
    );
    setGenderFilter(event.target.value || null);
  };

  // reset filters ---------------------------------------------
  const resetFilters = () => {
    setAgeFilter(null);
    setSelectedBarValue(null);
    setGenderFilter(null);
    // const parseDate = (dateString: string) =>
    //   parse(dateString, "dd/MM/yyyy", new Date());
    setStartDate(parseDate(formattedData[0].Day));
    setEndDate(parseDate(formattedData[formattedData.length - 1].Day));
    setStoreAllFilters({});
    setShareableUrl("");
  };

  // ================================================================
  return (
    <div className="flex flex-col h-fit gap-3 max-md:gap-6 mt-5 lg:mr-10 max-md:w-full w-[350px] rounded-3xl border bg-gray-100 border-black p-4 mb-5 max-md:flex-col shadow-xl">
      <div className="flex justify-between items-baseline mb-4">
        <span className="text-2xl font-bold">Filters: </span>
        <span
          className="text-right cursor-pointer hover:underline font-bold p-1 border border-black"
          onClick={resetFilters}
        >
          Reset filters
        </span>
      </div>
      <div className="flex flex-col gap-4">
        {/* age ----------------- */}
        <div className="flex justify-between max-md:flex-col">
          <label className="">Age:</label>
          <select
            className="border border-black"
            value={ageFilter || ""}
            onChange={handleAgeChange}
          >
            <option value="">All</option>
            <option value="15-25">15-25</option>
            <option value=">25">{">"}25</option>
          </select>
        </div>
        {/* gender --------------------------------- */}
        <div className="flex justify-between max-md:flex-col">
          <label className="">Gender:</label>
          <select
            className="border border-black"
            value={genderFilter || ""}
            onChange={handleGenderChange}
          >
            <option value="">All</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
      </div>
      <div className="h-[1px] border border-black"></div>
      {/* date picker */}
      <DatePickerComponent />
    </div>
  );
};
