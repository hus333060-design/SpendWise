import React from "react";

export default function ShowStocksList({ firestockData }) {
  
  return (
    <div className="flex space-x-2 flex-wrap">
    
        <div className=" w-full flex justify-between items-center">
      <div className="flex p-3 font-extrabold text-black text-lg md:text-2xl">
        <span>&#8377;</span>
        <h2>Stocks</h2>
      </div>
      <div className="flex p-3 font-extrabold text-black text-lg md:text-2xl">
        ₹
        {firestockData?.reduce((acc, currentItem) => {
          return acc + currentItem.Price * currentItem.Quantity;
        }, 0)}
      </div>
      </div>
      <div className="w-full bg-green-600 ">

        {firestockData?.map((item, index) => (
          <div
            key={item.id || index}
            className="flex justify-between p-2 border-b"
          >
            <span>{item.Name}</span>

            <span>
              ₹ {Number(item.Price) * Number(item.Quantity)}
            </span>
          </div>
        ))}

      </div>

    </div>
  );
}
