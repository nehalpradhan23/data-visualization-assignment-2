import { format, parse } from "date-fns";

export function getDate(date: string) {
  const parsedDate = parse(date, "dd/MM/yyyy", new Date());
  return format(parsedDate, "dd MMM");
}

export function convertDate(date: string) {
  const parsedDate = parse(date, "dd/MM/yyyy", new Date());
  return format(parsedDate, "MM/dd/yyyy");
}

// {

// import React, { useState } from 'react';
// import {
//   BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList, Brush, LineChart, Line
// } from 'recharts';
// import * as d3 from 'd3';

// interface DataObject {
//   Day: string;
//   Age: string;
//   Gender: string;
//   A: string;
//   B: string;
//   C: string;
//   D: string;
//   E: string;
//   F: string;
// }

// const data: DataObject[] = [
//   {"Day":"4/10/2022","Age":"15-25","Gender":"Male","A":"880","B":"815","C":"825","D":"444","E":"154","F":"859"},
//   {"Day":"4/10/2022","Age":">25","Gender":"Male","A":"955","B":"674","C":"427","D":"401","E":"820","F":"311"},
//   {"Day":"4/10/2022","Age":"15-25","Gender":"Female","A":"777","B":"711","C":"817","D":"167","E":"85","F":"704"},
//   {"Day":"4/10/2022","Age":">25","Gender":"Female","A":"895","B":"236","C":"276","D":"373","E":"840","F":"891"},
//   {"Day":"5/10/2022","Age":"15-25","Gender":"Male","A":"504","B":"95","C":"597","D":"812","E":"408","F":"102"}
// ];

// const aggregateData = (data: DataObject[]) => {
//   const result: { [key: string]: number } = { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0 };

//   data.forEach(entry => {
//     result.A += parseInt(entry.A, 10);
//     result.B += parseInt(entry.B, 10);
//     result.C += parseInt(entry.C, 10);
//     result.D += parseInt(entry.D, 10);
//     result.E += parseInt(entry.E, 10);
//     result.F += parseInt(entry.F, 10);
//   });

//   return [
//     { name: 'A', total: result.A },
//     { name: 'B', total: result.B },
//     { name: 'C', total: result.C },
//     { name: 'D', total: result.D },
//     { name: 'E', total: result.E },
//     { name: 'F', total: result.F },
//   ];
// };

// const transformedData = aggregateData(data);

// const MyHorizontalBarChart = () => {
//   const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

//   const handleClick = (data: any) => {
//     setSelectedCategory(data.name);
//   };

//   const formatDate = (dateStr: string) => {
//     const date = new Date(dateStr);
//     const options = { day: '2-digit', month: 'short' }; // Use short month format
//     return date.toLocaleDateString('en-US', options);
//   };

//   const getLineChartData = (category: string) => {
//     return data.map(entry => ({
//       Day: formatDate(entry.Day), // Format the day and month
//       Value: parseInt(entry[category as keyof DataObject] as string, 10)
//     }));
//   };

//   const lineChartData = selectedCategory ? getLineChartData(selectedCategory) : [];

//   return (
//     <div className="w-full h-full md:w-3/4 lg:w-1/2 xl:w-1/3 mx-auto">
//       <ResponsiveContainer width="100%" height={400}>
//         <BarChart
//           layout="vertical"
//           data={transformedData}
//           margin={{
//             top: 5, right: 30, left: 20, bottom: 5,
//           }}
//         >
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="Day" tickFormatter={formatDate} type="number" />
//           <YAxis type="category" dataKey="name" />
//           <Tooltip />
//           <Legend />
//           <Bar dataKey="total" fill="#8884d8" barSize={20} onClick={handleClick}>
//             <LabelList dataKey="total" position="right" />
//           </Bar>
//           <Brush dataKey="name" height={30} stroke="#8884d8" />
//         </BarChart>
//       </ResponsiveContainer>
//       {selectedCategory && (
//         <ResponsiveContainer width="100%" height={400}>
//           <LineChart data={lineChartData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="Day" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line type="monotone" dataKey="Value" stroke="#8884d8" />
//           </LineChart>
//         </ResponsiveContainer>
//       )}
//     </div>
//   );
// };

// export default MyHorizontalBarChart;
// }
