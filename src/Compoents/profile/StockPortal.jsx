import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { createPortal } from "react-dom";
import { db } from "../../firebase";

export default function StockPortal({
  openstockportal,
  setOpenStockPortal,
  stockformdata,
  setStockFormData,
  user,
}) {

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await addDoc(collection(db, "users", user.uid, "stocks"), {
        Name: stockformdata.Name.toUpperCase().trim(),
        Quantity: Number(stockformdata.Quantity),
        Price: Number(stockformdata.Price),
        created_At: new Date(),
      });

      setStockFormData({
        Name: "",
        Quantity: "",
        Price: "",
      });
    } catch (err) {
      console.log(err);
    }

    setOpenStockPortal(false);
  }

  return createPortal(
    <div className="fixed inset-0  bg-black/50 flex justify-center items-center z-50 " onClick={()=>{
          setOpenStockPortal(false);
    }}>
      <form
        className="bg-white p-6 rounded-xl w-[90%] max-w-md"
        onSubmit={handleSubmit}
         onClick={(e)=>{
      e.stopPropagation();
    }}
      >
        <h2 className="text-2xl font-bold mb-4">Stocks</h2>
        <input
          placeholder="Stock Name"
          className="w-full border p-2 mb-3 rounded-xl"
          value={stockformdata.Name}
          onChange={(e) => {
            setStockFormData((prev) => ({
              ...prev,
              Name: e.target.value,
            }));
          }}
        />

        <input
          type="number"
          placeholder="Quantity"
          className="w-full border p-2 mb-3 rounded-xl"
          value={stockformdata.Quantity}
          onChange={(e) => {
            setStockFormData((prev) => ({
              ...prev,
              Quantity: e.target.value,
            }));
          }}
        />

        <input
          type="number"
          placeholder="Buy Price"
          className="w-full border p-2 mb-3 rounded-xl"
          value={stockformdata.Price}
          onChange={(e) => {
            setStockFormData((prev) => ({
              ...prev,
              Price: e.target.value,
            }));
          }}
        />

        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded cursor-pointer transition duration-200 hover:scale-110"
        >
          Add
        </button>
      </form>
    </div>,
    document.getElementById("portal"),
  );
}
