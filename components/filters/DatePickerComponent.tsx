import { useGlobalContext } from "@/context/ContextApi";
import { format, max, min, parse } from "date-fns";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { start } from "repl";

export const DatePickerComponent = () => {
  const {
    dateObject: { startDate, setEndDate, endDate, setStartDate },
    formattedDataObject: { formattedData },
  } = useGlobalContext();

  const handleStartDateChange = (date: any) => {
    setStartDate(date);
  };
  const handleEndDateChange = (date: any) => {
    setEndDate(date);
  };

  // console.log("start and end date: ", startDate, endDate);

  // set date
  const parseDate = (dateString: string) =>
    parse(dateString, "dd/MM/yyyy", new Date());
  useEffect(() => {
    const dates = formattedData.map((item) => parseDate(item.Day));
    if (dates.length > 0) {
      if (startDate === null && endDate == null) {
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
