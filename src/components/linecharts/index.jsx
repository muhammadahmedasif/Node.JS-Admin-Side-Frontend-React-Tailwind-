import React, { useState } from "react";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

function LineCharts() {
  const [chart1data] = useState([
    { name: "JAN", Total_Users: 590, Total_Sales: 100, amt: 1400 },
    { name: "FEB", Total_Users: 868, Total_Sales: 967, amt: 1506 },
    { name: "MARCH", Total_Users: 1397, Total_Sales: 1098, amt: 989 },
    { name: "APRIL", Total_Users: 1480, Total_Sales: 100, amt: 1228 },
    { name: "MAY", Total_Users: 150, Total_Sales: 1108, amt: 1100 },
    { name: "JUNE", Total_Users: 1400, Total_Sales: 787, amt: 1770 },
    { name: "JULY", Total_Users: 1100, Total_Sales: 702, amt: 1702 },
    { name: "AUG", Total_Users: 1300, Total_Sales: 670, amt: 7700 },
    { name: "SEP", Total_Users: 140, Total_Sales: 680, amt: 170 },
    { name: "OCT", Total_Users: 230, Total_Sales: 702, amt: 1700 },
    { name: "NOV", Total_Users: 1500, Total_Sales: 672, amt: 7700 },
    { name: "DEC", Total_Users: 1100, Total_Sales: 720, amt: 707 },
  ]);

  // Custom tooltip with text size + weight
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white shadow-lg rounded-md p-3">
          <p className="text-[13px] font-[700] mb-1">{label}</p>
          {payload.map((entry, index) => (
            <p
              key={index}
              className="text-[12px] font-[600]"
              style={{ color: entry.color }}
            >
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ width: "100%", height: 400 }}>
      <ResponsiveContainer>
        <ComposedChart
          data={chart1data}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <CartesianGrid strokeDasharray="5 5" stroke="#e0e0e0" />

          {/* X Axis */}
          <XAxis
            dataKey="name"
            scale="band"
            stroke="#000"
            axisLine={{ stroke: "#000", strokeWidth: 2 }}
            tickLine={false}
            tick={({ x, y, payload }) => (
              <text
                x={x}
                y={y + 15}
                textAnchor="middle"
                className="text-[12px] font-[600]"
              >
                {payload.value}
              </text>
            )}
          />

          {/* Y Axis */}
          <YAxis
            stroke="#000"
            axisLine={{ stroke: "#000", strokeWidth: 2 }}
            tickLine={false}
            tick={({ x, y, payload }) => (
              <text
                x={x - 10}
                y={y + 4}
                textAnchor="end"
                className="text-[12px] font-[600]"
              >
                {payload.value}
              </text>
            )}
          />

          {/* Tooltip */}
          <Tooltip content={<CustomTooltip />} />
          <Legend />

          {/* Bars for Total Users */}
          <Bar
            dataKey="Total_Users"
            barSize={45}
            radius={[8, 8, 0, 0]}
            animationDuration={1200}
            animationBegin={200}
          >
            {chart1data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.Total_Users < 500 ? "#FFD580" : "#93C572"}
              />
            ))}
          </Bar>

          {/* Line for Total Sales */}
          <Line
            type="monotone"
            dataKey="Total_Sales"
            strokeWidth={3}
            stroke="#006eff"
            dot={{ r: 5 }}
            activeDot={{ r: 7 }}
            animationDuration={1500}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

export default LineCharts;
