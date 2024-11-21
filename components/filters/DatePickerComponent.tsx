import { useGlobalContext } from "@/context/ContextApi";
import { parseDate } from "@/utils/getDate";
import { handleFilterChange } from "@/utils/saveFilterData";
import { format, max, min, parse } from "date-fns";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

export const DatePickerComponent = () => {
  const {
    dateObject: { startDate, setEndDate, endDate, setStartDate },
    formattedDataObject: { formattedData },
    storeAllFiltersObject: { storeAllFilters, setStoreAllFilters },
  } = useGlobalContext();

  const handleStartDateChange = (date: any) => {
    handleFilterChange("startDate", date, storeAllFilters, setStoreAllFilters);
    setStartDate(date);
  };
  const handleEndDateChange = (date: any) => {
    handleFilterChange("endDate", date, storeAllFilters, setStoreAllFilters);
    setEndDate(date);
  };

  // console.log("start and end date: ", startDate, endDate);

  // set date
  const parseDate = (dateString: string) =>
    parse(dateString, "dd/MM/yyyy", new Date());

  useEffect(() => {
    // const dates = formattedData?.map((item) => item?.Day);
    const dates = formattedData?.map((item) => parseDate(item?.Day)); // long

    if (dates.length > 0) {
      if (startDate === null && endDate == null) {
        // setStartDate(new Date(formattedData[0].Day));
        // setStartDate(new Date(formattedData[formattedData.length - 1].Day));
        setStartDate(min(dates));
        setEndDate(max(dates));
      }
    }
  }, [formattedData]);

  // console.log("start and end date:======== ", startDate, endDate);

  return (
    <div>
      <div className="mb-4 flex flex-col gap-4">
        <span>Start Date: </span>
        <DatePicker
          selected={startDate}
          onChange={handleStartDateChange}
          // selectsStart
          // startDate={startDate}
          // endDate={endDate}
          dateFormat="dd/MM/yyyy"
          placeholderText="Select start date"
        />
        <span>End Date: </span>
        <DatePicker
          selected={endDate}
          onChange={handleEndDateChange}
          selectsEnd
          // startDate={startDate}
          // endDate={endDate}
          // minDate={startDate}
          dateFormat="dd/MM/yyyy"
          placeholderText="Select end date"
        />
      </div>
    </div>
  );
};
