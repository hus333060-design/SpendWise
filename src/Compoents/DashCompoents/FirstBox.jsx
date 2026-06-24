import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaArrowUp } from "react-icons/fa";
import { FiArrowUpRight, FiRefreshCw } from "react-icons/fi";
import { IoTrendingUp } from "react-icons/io5";
import { TbChartCandle } from "react-icons/tb";
import { FaToiletPaper } from "react-icons/fa6";
import { FaDollarSign } from "react-icons/fa";
import { FaMoneyBillWave } from "react-icons/fa";
import { FaPaperPlane } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa";
import { FaCalendarDays } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiMenu, FiX } from "react-icons/fi";

import { auth, db } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import StockPortal from "../profile/StockPortal";
import ShowStockslist from "./Stocks/ShowStocksList";
import { FirstBoxStcokChart } from "./FirstBoxStcokChart";
import { CashFlow } from "./CashFlow";
import { OverView } from "./OverView";
import { TransactionHis } from "./TransactionHis";

export const FirstBox = ({ income, payout }) => {
  const [isBtn, setisBtn] = useState(false);
  const [openham, setOpenham] = useState(false);
  const [UsastockData, setUsaStockData] = useState([]);
  const [user, setUser] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [openstockportal, setOpenStockPortal] = useState(false);
  const [stockformdata, setStockFormData] = useState({
    Name: "",
    Quantity: "",
    Price: "",
  });
  const [firestockData, setFireStocksData] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;
    const unsubscribe = onSnapshot(
      collection(db, "users", user.uid, "stocks"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          firestokId: doc.id,
          ...doc.data(),
        }));
        setFireStocksData(data);
      },
    );
    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    if (!user) return;
    async function getExpenses() {
      const snapShot = await getDocs(
        collection(db, "users", user.uid, "expenses"),
      );

      const expes = [];
      snapShot.forEach((doc) => {
        expes.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      const chartData = expes.map((item) => ({
        category: item.category,
        amount: item.amount,
      }));

      setChartData(chartData);
    }

    getExpenses();
  }, [user]);

  return (
    <div className=" w-full  p-2 border-amber-700 " onClick={(e)=>{
    setOpenStockPortal(false)
    setOpenham(false)
    }}>
      <header className="flex justify-between text-stone-900 dark:text-stone-200 items-center md:p-1 p-2 lg:items-start">
        <section className="flex items-center space-x-3">
          <div>
            <h1 className=" text-xl lg:text-3xl font-semibold">DashBoard</h1>
            <p className="text-xs lg:text-sm">
              {new Date().toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </section>

        <ul className="  hidden lg:flex space-x-7 whitespace-nowrap ml-0  ">
          <li className="flex items-center">
            <span className="mr-2 p-2  rounded-full bg-linear-to-br from-[#89f94d] to-[#5c3c7c]">
              <FaArrowUp className="text-sm lg:text-xl" />
            </span>
            <NavLink className="text-lg font-bold" to="/expence">
              Add Expence
            </NavLink>
          </li>

          <li className="flex items-center  shrink-0">
            <span className="mr-2 p-2  rounded-full bg-[#28282B]">
              <FiRefreshCw className="text-xl text-white" />
            </span>
            <NavLink
              className="text-lg font-bold"
              to="/"
              onClick={() => {
                document.getElementById("live-stock")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
            >
              Live Stocks
            </NavLink>
          </li>

          <li className="flex items-center  shrink-0">
            <span className="mr-2 p-2  rounded-full bg-[#28282B]">
              <IoTrendingUp className="text-xl text-white" />
            </span>
            <NavLink className="text-lg font-bold">Dividned Stock</NavLink>
          </li>
        </ul>

        <div className="relative lg:hidden">
          <button
            className="ml-auto mx-9.5 text-2xl cursor-pointer transition duration-200 hover:scale-110 lg:hidden"
            onClick={(e) => {
              e.stopPropagation();
              setOpenham((prev) => !prev);
            }}
          >
            {openham ? <FiX /> : <FiMenu />}
          </button>
          {openham && (
            <ul className="flex flex-col gap-2 mt-8 p-2 bg-white/90 dark:bg-stone-950 shadow-md z-50 absolute right-[10%] top-[1%] lg:hidden">
              <li className=" flex space-x-2 items-center px-2 py-2  duration-100 hover:scale-105">
                <span className="mr-2 lg:mr-1 p-2 lg:p-2 rounded-full bg-linear-to-br from-[#89f94d] to-[#5c3c7c]">
                  <FaArrowUp className="text-sm lg:text-xl" />
                </span>
                <NavLink className="text-lg">Add Expences</NavLink>
              </li>

              <li className=" flex space-x-2 items-center px-2 py-2  duration-100 hover:scale-105">
                <span className="mr-2 lg:mr-1 p-2 lg:p-2  rounded-full bg-[#28282B]">
                  <FiRefreshCw className="text-xl text-white" />
                </span>
                <NavLink className="text-lg">Live Stocks</NavLink>
              </li>

              <li className=" flex space-x-2 items-center px-2 py-2  duration-100 hover:scale-105">
                <span className="mr-2 lg:mr-1 p-2 lg:p-2  rounded-full bg-[#28282B]">
                  <IoTrendingUp className="text-xl text-white" />
                </span>
                <NavLink className="text-lg">Dividned Stock</NavLink>
              </li>
            </ul>
          )}
        </div>
      </header>

      {/* Cards */}
      <div className=" flex flex-col gap-2 lg:flex-row  p-2 ">
        {/* Card-1 */}
        <div className=" bg-zinc-800 text-white dark:bg-zinc-700 p-2 flex-1">
          {/* Title */}
          <h1 className="text-2xl p-3">Your Protfolie</h1>

          {/* main content of card-1 */}
          <section className=" flex flex-col justify-between gap-5 p-2  ">
            {/* Balance */}
            <div className="mt-7 p-4 rounded-[10px] bg-[#28282B]">
              <div className="flex mb-4 justify-between">
                <span>Balnace</span>
                <span>
                  <FaCalendarDays className="text-[#E2DFD2] text-xl hover:scale-115 transaction-transfrom duration-200 cursor-pointer" />
                </span>
              </div>

              <div className="flex mb-4 flex-wrap  gap-4 justify-between">
                <div className="text-lg flex flex-wrap gap-1 items-center  text-white/70">
                  <span>spend:</span>
                  <span className="text-white text-lg md:xl">{payout}</span>
                </div>
                <div className="text-lg flex flex-wrap gap-1 items-center text-white/70">
                  pending:{" "}
                  <span className="text-white text-lg md:xl">
                    {income - payout}
                  </span>
                </div>
              </div>

              <div className="w-full max-w-lg ">
                <div className="relative h-8  rounded-full overflow-hidden border border-[#333]">
                  {/* Filled Part */}
                  <div className="absolute left-0 top-0 h-full w-[55%] bg-lime-400"></div>

                  {/* Remaining Part */}
                  <div
                    className="absolute right-0 top-0 h-full w-[45%]"
                    style={{
                      background:
                        "repeating-linear-gradient(-45deg,#222,#222 4px,#111 4px,#111 8px)",
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="  bg-linear-to-br from-[#833AB4] to-[90deg,rgba(131, 58, 180, 1) 0%, rgba(253, 29, 29, 1) 50%, rgba(252, 176, 69, 1) 100%] overflow-hidden py-3 px-2 " onClick={(e) =>{ 
              e.stopPropagation()
            }
            }>
              <div>
                <button
                  className="text-black text-xl flex items-center font-bold bg-linear-to-br
            from-[#FD1D1D] to=[inear-gradient(90deg,rgba(131, 58, 180, 1) 0%, rgba(253, 29, 29, 1) 50%, rgba(252, 176, 69, 1) 100%)] px-4 py-3 border rounded-3xl flex justify-center items-center  mx-auto hover:scale-105 transition-all duration-100 cursor-pointer md:text-2xl"
                  onClick={() =>{ 
                    setOpenStockPortal(true)
                  }
                  }
                >
                  + Add Stock
                </button>
                {openstockportal && (
                  <StockPortal
                    openstockportal={openstockportal}
                    setOpenStockPortal={setOpenStockPortal}
                    stockformdata={stockformdata}
                    setStockFormData={setStockFormData}
                    user={user}
                  />
                )}

                <ShowStockslist firestockData={firestockData} />
              </div>
            </div>
          </section>
        </div>
        <section className="flex-2">
          {/* Card=2 */}
          <CashFlow income={income} payout={payout} chartData={chartData} />
          <div id="live-stock">
            <FirstBoxStcokChart firestockData={firestockData} />
          </div>
        </section>
        {/* Card-3 */}
         <div className=' flex-1 px-3 py-4 flex flex-col gap-6  text-white bg-zinc-800 dark:bg-zinc-700 rounded-xl'>
        <OverView income={income} payout={payout} firestockData={firestockData}/>
        <TransactionHis firestockData={firestockData}/>
        </div>
      </div>
    </div>
  );
};
