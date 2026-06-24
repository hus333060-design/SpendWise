import React, { useState } from 'react'
import { FaWallet } from "react-icons/fa";
import {auth,db} from "../../firebase"
import { doc, setDoc } from "firebase/firestore";
import { FiArrowLeft } from 'react-icons/fi';

export const BugetForm = () => {

    const [budget,setBudget]=useState("");
async function handleSumit(e){
   e.preventDefault();
   const user = auth.currentUser;

   if(!budget){
     alert("Please enter a budget");
      return;
   }
   
   try{

 await setDoc(
  doc(db,"users",user.uid),
  {
      budget: Number(budget),
    updatedAt: new Date(),
  },
   { merge: true }
 );


 
   setBudget("")
}catch(err){
  console.log(err);
  
}

   
 }

  return (
   <div className="min-h-screen  flex items-center justify-center p-4">
   
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 ">


        <div className="flex items-center gap-4 mb-4">
           <span className="px-4 py-3 rounded-2xl bg-green-500 hover:scale-105 transition cursor-pointer" onClick={()=> history.back()}>
              <FiArrowLeft size={24} />
            </span>
          <div className="bg-green-100 p-4 rounded-full">
            <FaWallet className="text-4xl text-green-600" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center text-gray-800">
          Set Monthly Budget
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-6">
          Enter the amount you want to spend this month.
        </p>

        <form  className="space-y-5" onSubmit={handleSumit}>
          
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Budget Amount
            </label>

            <input
              type="number"
              placeholder="₹ 10000"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-green-500 text-stone-950 "
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition"
          >
            Save Budget
          </button>
        </form>

        <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-4">
          <p className="text-sm text-green-700">
            Budget can be updated only once per month.
          </p>
        </div>
      </div>
    </div>
  )
}
