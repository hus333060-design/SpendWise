import React from 'react';
import { FiArrowLeft } from "react-icons/fi";
import { MdArrowDropDown } from "react-icons/md";
import { FaUtensils } from "react-icons/fa";
import { FaGraduationCap } from "react-icons/fa";
import { FaShoppingBasket } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FaLaptopCode } from "react-icons/fa";
import { MdArrowDropUp } from "react-icons/md";
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { deleteDoc } from "firebase/firestore";

export const SetExpe = ({ category, setCategory,dropdown, setDropdwon,amount, setAmount,paymentType, setPaymentType , user, setUser,edituser,setEditUser,deleteId, setDeleteId}) => {

async function deleting(params) {
  if(!deleteId) return;

  await deleteDoc(doc(db,"users",user.uid,"expenses",deleteId));
}
deleting();
async function handleSubmit(e) {
  e.preventDefault();

  if (!user) {
    alert("Login required");
    return;
  }

  try {
    if (edituser) {

      await updateDoc(
        doc(
          db,
          "users",
          user.uid,
          "expenses",
          edituser.firestoreId
        ),
        {
          amount,
          category: category?.val,
          paymentType,
        }
      );

    } else {

      await addDoc(
        collection(
          db,
          "users",
          user.uid,
          "expenses"
        ),
        {
          amount,
          category: category?.val || "Tech",
          paymentType,
          createdAt: new Date(),
        }
      );
    }

    setAmount("");
    setCategory(null);
    setPaymentType("");
    setEditUser(null);

  } catch (error) {
    console.log(error);
  }
}

    function addCatogory(val, icon) {
    setCategory({ val, icon });
  }

  const Icon = category?.icon;

  return (
    <section className="w-full max-w-lg mx-auto bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 border  dark:border-slate-500 rounded-3xl shadow-xl p-6 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <span className="px-7 py-4 rounded-2xl bg-green-500 hover:scale-105 transition cursor-pointer" onClick={()=> history.back()}>
              <FiArrowLeft size={30} />
            </span>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-300">Add Expences</h1>
          </div>

          <form className="flex flex-col gap-2 " onSubmit={handleSubmit}>
            <div className=" rounded-2xl p-4 border">
              <label className="font-semibold ">Amount</label>
              <div className="flex items-center mt-2  rounded-xl border px-1 sm:px-4 overflow-hidden">
                <span className=" text-lg font-bold text-green-600">₹</span>
                <input
                  className=" border-none outline-none p-3"
                  type="text"
                  placeholder="Enter the amount"
                  name="price"
                  id="price"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col gap-3 p-4">
              <span className="text-xl font-bold">Category</span>
              <div className="flex items-center gap-3 rounded-xl px-4 py-3 border">
                <div className="flex flex-wrap space-x-3 items-center">
                  {category ? (
                    <>
                      <Icon size={30} />
                      <span className="text-xl">{category.val}</span>
                    </>
                  ) : (
                    <>
                      <span>
                        <FaLaptopCode size={30} />
                      </span>
                      <span className="text-xl">Tech</span>
                    </>
                  )}
                </div>

                <div className="relative" onClick={(e) => e.stopPropagation()}>
                  <div
                    onClick={() => {
                      setDropdwon((prev) => !prev);
                    }}
                  >
                    {!dropdown ? (
                      <MdArrowDropDown
                        size={38}
                        className="border border-slate-300 dark:border-slate-600 rounded-2xl"
                      />
                    ) : (
                      <MdArrowDropUp
                        size={38}
                        className="border border-slate-300 dark:border-slate-600  rounded-2xl"
                      />
                    )}
                  </div>

                  {dropdown && (
                    <div className="absolute bg-stone-800 dark:bg-stone-600 right-[-1] mt-2 w-52  rounded-2xl shadow-xl  p-2 text-stone-200 overflow-hidden ">
                      <span
                        className="flex space-x-2 p-2 rounded-b-md cursor-pointer hover:bg-stone-900 hover:scale-110 transition-transform duration-150"
                        onClick={() => addCatogory("Food", FaUtensils)}
                      >
                        <FaUtensils color="#f97316" size={24} />
                        <span>Food</span>
                      </span>

                      <span
                        className="flex space-x-2 p-2 rounded-b-md cursor-pointer hover:bg-stone-900 hover:scale-110 transition-transform duration-150"
                        onClick={() =>
                          addCatogory("Education", FaGraduationCap)
                        }
                      >
                        <FaGraduationCap color="#3b82f6" size={24} />
                        <span>Education</span>
                      </span>

                      <span
                        className="flex space-x-2 p-2 rounded-b-md cursor-pointer hover:bg-stone-900 hover:scale-110 transition-transform duration-150"
                        onClick={() => addCatogory("Grocery", FaShoppingBasket)}
                      >
                        <FaShoppingBasket color="#22c55e" size={24} />
                        <span>Grocery</span>
                      </span>

                      <span
                        className="flex space-x-2 p-2 rounded-b-md cursor-pointer hover:bg-stone-900 hover:scale-110 transition-transform duration-150"
                        onClick={() => addCatogory("Rent", FaHome)}
                      >
                        <FaHome color="#ef4444" size={24} />
                        <span>Rent</span>
                      </span>
                      <span
                        className="flex space-x-2 p-2 rounded-b-md cursor-pointer hover:bg-stone-900 hover:scale-110 transition-transform duration-150"
                        onClick={() => addCatogory("Tech", FaLaptopCode)}
                      >
                        <FaLaptopCode color="#8b5cf6" size={24} />
                        <span>Tech</span>
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 p-4">
              <h1 className="font-bold">Payment Type</h1>
              
                <div
                  onClick={() => setPaymentType("cash")}
                  className={`p-4 rounded-xl border cursor-pointer ${
                    paymentType === "cash"
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200"
                  }`}
                >
                  Cash
                </div>
      

           
                <div
                  onClick={() => setPaymentType("ATM Card")}
                  className={`p-4 rounded-xl border cursor-pointer ${
                    paymentType === "ATM Card"
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200"
                  }`}
                >
                  ATM Card
                </div>


             <div
                  onClick={() => setPaymentType("Check")}
                  className={`p-4 rounded-xl border cursor-pointer ${
                    paymentType === "Check"
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200"
                  }`}
                >
                  Check
                </div>
                
            </div>
            <div className="flex items-center justify-center bg-[#AFE1AF] py-2">
              <button
                className="w-full py-4 rounded-2xl bg-linear-to-r from-green-500 to-emerald-600 text-white font-semibold text-lg hover:scale-[1.02]  transition shadow-lg"
                type="submit"> {edituser ? "Edit" : "Add"}</button>
            </div>
          </form>
        </section>
  )
}
