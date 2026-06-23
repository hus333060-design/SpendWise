import React, { useEffect, useState } from "react";

export const TransactionHis = ({ firestockData }) => {
  const [transaction, setTransaction] = useState([]);
  useEffect(() => {
    if (!firestockData?.length) return;

    firestockData.map((item) => {
      const seconds = item?.created_At?.seconds;

      if (!seconds) {
        return <div>Loading...</div>;
      }

      const date = new Date(seconds * 1000);

      const month = date.toLocaleString("en-US", {
        month: "short",
      });
      const day = date.getDate();

      const obj = {
        currDay: `${day}  ${month} `,
        stockName: item.Name,
        type: "Buy",
        Amount: item.Price * item.Quantity,
      };

      setTransaction((prev) => [...prev, obj]);
    });
  }, [firestockData]);

  return (
    <>
      <h1 className="text-white text-2xl font-bold">Transaction Histroy</h1>
      <div className="bg-zinc-900 rounded-xl overflow-hidden">
        <div className="flex justify-between px-2 py-4 border-b border-zinc-700 text-gray-400 font-semibold">
          <p className="w-1/4">Date</p>
          <p className="w-1/4">Stock</p>
          <p className="md:w-1/4 mx-2">Type</p>
          <p className="w-1/4 ">Amount</p>
        </div>
        {transaction?.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center px-2 py-4  border-b border-zinc-800 hover:bg-zinc-800 transition"
          >
            <p  className="w-1/4 text-white text-sm sm:text-lg">{item.currDay}</p>

            <p className="w-1/4 text-white  text-sm sm:text-lg ">{item.stockName}</p>

            <p className=" md:w-1/4 mx-2 text-green-400 font-medium  text-sm sm:text-lg">{item.type}</p>

            <p className="w-1/4  text-white text-sm sm:text-lg">₹{item.Amount}</p>
          </div>
        ))}
      </div>
    </>
  );
};
