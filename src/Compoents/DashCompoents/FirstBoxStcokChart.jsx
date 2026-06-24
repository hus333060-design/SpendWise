import React, { useEffect } from "react";
import { useState } from "react";
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
  Legend,
} from "recharts";

export const FirstBoxStcokChart = ({ firestockData }) => {
  const [currprice, setCurrPrice] = useState([]);
  const [sym, setSym] = useState([]);
  useEffect(() => {
    if (!firestockData?.length) return;
    const UpadateFireStock = firestockData.map((item) => {
      return item?.Name.charAt(0) + item?.Name?.slice(1).toLowerCase();
    });

    async function getData() {
      try {
        const merged = {};
         const symbols = [];
        for (const company of UpadateFireStock) {
          const res = await fetch(
            `https://api.polygon.io/v3/reference/tickers?search=${company}&apiKey=${"	3eqWAoEunLamNlgKRs2Jt4eZG1J0_Lro"}`,
          );

          const data = await res.json();
          const symbol = data.results[0]?.ticker;
             if (!symbol) continue;

            symbols.push(symbol);
         
          // Current date
          const current = new Date();

          const year = current.getFullYear();
          const month = String(current.getMonth() + 1).padStart(2, "0");
          const day = String(current.getDate()).padStart(2, "0");

          const CurrntDate = `${year}-${month}-${day}`;
          // week before
          // Copy create karo
          const weekBefore = new Date(current);

          weekBefore.setDate(weekBefore.getDate() - 7);

          const WeekBeforeDate = `${weekBefore.getFullYear()}-${String(
            weekBefore.getMonth() + 1,
          ).padStart(2, "0")}-${String(weekBefore.getDate()).padStart(2, "0")}`;

          // Week later data
          const res2 = await fetch(
            `https://api.polygon.io/v2/aggs/ticker/${symbol}/range/1/day/${WeekBeforeDate}/${CurrntDate}?apiKey=${"3eqWAoEunLamNlgKRs2Jt4eZG1J0_Lro"}`,
          );

          const histroyData = await res2.json();

          histroyData.results.forEach((item) => {
            const day = String(new Date(item.t).getDate()).padStart(2, "0");

            merged[day] = {
              ...(merged[day] || {}),
              day,
              [symbol]: item.c,
            };
          });

          
        }
         setSym((prev) => [...prev, ...symbols]);
        setCurrPrice(
      Object.values(merged)
        .sort((a,b)=>a.day-b.day)
    );
      } catch (err) {
        console.log(err);
      }


    }

    getData();
  }, [firestockData]);

  if (!currprice || currprice.length === 0) {
    return (
       <div className="relative min-h-60 flex justify-center items-center">
    {/* text */}
    <p className="relative z-10 text-stone-400 text-2xl">
      Please Reload Page
    </p>

  </div>
    )
  }


  

  return (
    <div className="flex flex-col space-y-2 p-2 border rounded-xl">
      <h1  className="text-2xl font-bold  text-stone-900 dark:text-stone-300">Live Price</h1>
      {currprice.length > 0 && (
          <ResponsiveContainer width="100%" height={290}>
        <LineChart  data={currprice} margin={{top: 15, bottom: 5,left:-15 ,right:10}}>
          <CartesianGrid vertical={false} horizontal={false} />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          {  sym.length>0 && sym.map((symbol,i) => (
            <Line key={i} type="monotone" dataKey={symbol} />
          ))}
        </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};
