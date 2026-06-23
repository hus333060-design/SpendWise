import React from 'react'

export const OverView = ({income,payout,firestockData}) => {
    
    
    function formatNumber(num){
      if(num>=1000000){
        return `${num/1000000}M`;
      }
      else if(num>=1000){
        return `${num/1000}k`
      }
      return num;
    }
  return (
 <>
  <h1 className="text-white text-2xl font-bold ">
    Overview
  </h1>

  <div className="flex flex-wrap gap-5 justify-between">

    <div className="bg-zinc-900 rounded-2xl px-3 py-4 flex-1 border border-zinc-800">
      <p className="text-zinc-400 text-sm uppercase tracking-wide">
        Balance
      </p>

      <h2 className="text-2xl font-bold text-white mt-3">
        ₹{formatNumber(income - payout)}
      </h2>
    </div>


    <div className="bg-zinc-900 rounded-2xl px-3 py-4 flex-1 border border-zinc-800">
      <p className="text-zinc-400 text-sm uppercase tracking-wide">
        Expense
      </p>

      <h2 className="text-2xl font-bold text-red-400 mt-3">
        ₹{formatNumber(payout)}
      </h2>
    </div>


    <div className="bg-zinc-900 rounded-2xl px-3 py-4 flex-1 border border-zinc-800">
      <p className="text-zinc-400 text-sm uppercase tracking-wide">
        Stocks
      </p>

      <h2 className="text-2xl font-bold text-cyan-400 mt-3">
        ₹{
          formatNumber(
            firestockData.reduce(
              (acc, item) =>
                acc + item.Price * item.Quantity,
              0
            )
          )
        }
      </h2>
    </div>


    <div className="bg-zinc-900 rounded-2xl px-3 py-4 flex-1 border border-zinc-800">
      <p className="text-zinc-400 text-sm uppercase tracking-wide">
        Growth
      </p>

      <h2 className="text-2xl font-bold text-lime-400 mt-3">
        +4.2%
      </h2>
    </div>

  </div>
</>
  )
}
