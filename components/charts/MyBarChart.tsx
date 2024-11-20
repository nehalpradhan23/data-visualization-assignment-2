import { useGlobalContext } from "@/context/ContextApi";
import { SheetDataObject } from "@/types/types";
import { isAfter, isBefore, parse } from "date-fns";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
  Brush,
  ReferenceLine,
} from "recharts";

export const MyBarChart = () => {
  const {
    formattedDataObject: { formattedData },
    selectedBarValueObject: { selectedBarValue, setSelectedBarValue },
    ageFilterObject: { ageFilter },
    genderFilterObject: { genderFilter },
    dateObject: { startDate, endDate },
  } = useGlobalContext();

  // aggregate data for bar chart ============================
  const aggregateData = (
    data: SheetDataObject[],
    ageFilter: string | null,
    genderFilter: string | null,
    startDate: Date | null,
    endDate: Date | null
  ) => {
    const result: { [key: string]: number } = {
      A: 0,
      B: 0,
      C: 0,
      D: 0,
      E: 0,
      F: 0,
    };
    const parseDate = (dateString: string) =>
      parse(dateString, "dd/MM/yyyy", new Date());
    data
      .filter((entry) => {
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
      })
      .forEach((entry) => {
        result.A += parseInt(entry.A, 10);
        result.B += parseInt(entry.B, 10);
        result.C += parseInt(entry.C, 10);
        result.D += parseInt(entry.D, 10);
        result.E += parseInt(entry.E, 10);
        result.F += parseInt(entry.F, 10);
      });
    return [
      { name: "A", total: result.A },
      { name: "B", total: result.B },
      { name: "C", total: result.C },
      { name: "D", total: result.D },
      { name: "E", total: result.E },
      { name: "F", total: result.F },
    ];
  };

  // ------------------------------------------
  const transformedData = aggregateData(
    formattedData,
    ageFilter,
    genderFilter,
    startDate,
    endDate
  );
  // console.log("transformed data: ", transformedData);

  const handleBarClick = (data: any) => {
    setSelectedBarValue(data.name);
  };

  // ===================================================
  return (
    <div className="w-[40%] max-md:w-full max-lg:w-[60%]">
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          layout="vertical"
          data={transformedData}
          margin={{
            top: 20,
            right: 60,
            left: 5,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis type="category" dataKey="name" />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="total"
            fill="blue"
            barSize={20}
            onClick={handleBarClick}
          >
            <LabelList dataKey="total" position="right" />
          </Bar>
          {/* <Brush dataKey="name" height={30} stroke="#8884d8" />{" "}
          <ReferenceLine x="someValue" stroke="red" label="Min" />{" "}
          <ReferenceLine x="someValue" stroke="red" label="Max" /> */}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
