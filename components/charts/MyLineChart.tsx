import { useGlobalContext } from "@/context/ContextApi";
import { SheetDataObject } from "@/types/types";
import { getDate } from "@/utils/getDate";
import { isAfter, isBefore, parse } from "date-fns";
import React from "react";
import {
  Brush,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const MyLineChart = () => {
  const {
    selectedBarValueObject: { selectedBarValue },
    formattedDataObject: { formattedData },
    ageFilterObject: { ageFilter },
    genderFilterObject: { genderFilter },
    dateObject: { startDate, endDate },
  } = useGlobalContext();

  const parseDate = (dateString: string) =>
    parse(dateString, "dd/MM/yyyy", new Date());

  const getLineChartData = (category: string) => {
    const filteredData = formattedData.filter((entry) => {
      const entryDate = parseDate(entry.Day);
      const isAfterStartDate = startDate
        ? isAfter(entryDate, startDate) ||
          entryDate.getTime() === startDate.getTime()
        : true;
      const isBeforeEndDate = endDate
        ? isBefore(entryDate, endDate) ||
          entryDate.getTime() === endDate.getTime()
        : true;

      return (
        (!ageFilter || entry.Age === ageFilter) &&
        (!genderFilter || entry.Gender === genderFilter) &&
        isAfterStartDate &&
        isBeforeEndDate
      );
    });
    // ====================
    // return formattedData.map((entry) => ({
    return filteredData.map((entry) => ({
      // Day: entry.Day,
      Day: getDate(entry.Day),
      Value: parseInt(entry[category as keyof SheetDataObject] as string, 10),
    }));
  };

  const lineChartData = selectedBarValue
    ? getLineChartData(selectedBarValue)
    : [];
  // console.log("line chart data: ", lineChartData);

  // const getDate= getDate()
  // ==============================
  return (
    <div className="md:px-3 bg-gray-50 mt-5 max-md:h-[300px] h-[350px]">
      <ResponsiveContainer width="100%">
        {/* <ResponsiveContainer width="100%" height={300}> */}
        <LineChart data={lineChartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Day" />
          <YAxis />
          <Tooltip /> <Legend />
          <Line type="monotone" dataKey="Value" stroke="#8884d8" />
          <Brush />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
