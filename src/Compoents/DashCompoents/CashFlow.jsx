import React from 'react'
import { FiArrowUpRight, FiRefreshCw } from "react-icons/fi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
  Cell,
} from "recharts";

export const CashFlow = ({income,payout,chartData}) => {

  return (
    <div className="flex flex-col  bg-zinc-800 dark:bg-zinc-700 text-white p-2  mb-1 rounded-2xl">

        
            <div className="flex flex-col gap-3 ">
              <span className="text-2xl">Your CashFlow</span>
              <span> <span className='opacity-80 text-xl'>Total Balance :</span> {income - payout}</span>
            </div>

            <div className="flex">
              <ResponsiveContainer  height={210}>
                <BarChart
                  layout="vertical"
                  data={chartData}
                  margin={{ top: 5, right: 12,   left: 20, bottom: 5 }}
                >
                  <CartesianGrid vertical={false} horizontal={false} />
                  <XAxis
                    type="number"
                    tick={{ fontSize: 20, fontWeight: 500, fill: "white" }}
                  />
                  <YAxis
                    type="category"
                    dataKey="category"
                    tick={{ fontSize: 16, fontWeight: 500, fill: "white" }}
                  />
                  <Tooltip
                    cursor={false}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div
                            style={{
                              background: "black",
                              padding: "6px 10px",
                              borderRadius: "8px",
                              color: "white",
                              cursor: "progress",
                            }}
                          >
                            ₹{payload[0].value}
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="amount">
                    {chartData.map((entry, index) => {
                      return <Cell key={index} radius={[8, 8, 8, 8]} />;
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
  )
}
