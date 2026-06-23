import React from "react";

export const DasBoardSim = () => {
  return (
    <div className="flex flex-col animate-pulse">
      {/* Cards + Header */}
      <div className="w-full p-2">
        {/* Header */}
        <div className="h-16 rounded-xl bg-gray-300 mb-4"></div>

        {/* Cards */}
        <div className="flex flex-col gap-4 lg:flex-row">
          {/* Card 1 */}
          <div className="flex-1  gap-3 h-130 rounded-xl bg-gray-300 p-4">
           
            <div className="p-4">
            <div className="h-6 w-40 bg-gray-400  rounded mb-6"></div>
            <div className="flex flex-col gap-5">
              <div className="h-6 w-5/6 bg-gray-400  rounded"></div>
              <div className="h-6 w-5/6 bg-gray-400  rounded"></div>
              <div className="h-6 w-3/4 bg-gray-400  rounded"></div>
              </div>
            </div>
                
                <div className="p-4 rounded">
            <div className="h-6 w-40 bg-gray-400  rounded mb-6"></div>
            <div className="flex flex-col gap-5">
              <div className="h-6 w-5/6 bg-gray-400  rounded"></div>
              <div className="h-6 w-5/6 bg-gray-400  rounded"></div>
              <div className="h-6 w-3/4 bg-gray-400  rounded"></div>
              </div>
            </div>
          
          </div>


          {/* Card 2 */}
          <div className="flex-2 rounded-xl bg-gray-300 p-4">
            <div className="h-6 w-52 bg-gray-400  rounded mb-6"></div>

            <div className="space-y-4">
              <div className="h-20 bg-gray-400  rounded"></div>
              <div className="h-40 bg-gray-400  rounded"></div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="flex-1 gap-6 rounded-xl bg-gray-300 p-4">
           
           <div className="p-5">
                 <div className="h-7 w-32 bg-gray-400  rounded mb-6"></div>
                  <div className="flex gap-3">
              <div className="w-22 h-16 bg-gray-400 rounded"></div>
              <div className="w-22 h-16 bg-gray-400 rounded"></div>
              <div className="w-22 h-16 bg-gray-400 rounded"></div>
              <div className="w-22 h-16 bg-gray-400 rounded"></div>
            </div>
            </div>

            <div className="p-5">
                 <div className="h-7 w-32 bg-gray-400  rounded mb-6"></div>
                  <div className="flex gap-3">
              <div className="w-22 h-16 bg-gray-400 rounded"></div>
              <div className="w-22 h-16 bg-gray-400 rounded"></div>
              <div className="w-22 h-16 bg-gray-400 rounded"></div>
              <div className="w-22 h-16 bg-gray-400 rounded"></div>
            </div>
            </div>
             

          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 p-4 border-t">
        <div className="h-5 w-64 rounded bg-gray-300"></div>
      </div>
    </div>
  );
};
