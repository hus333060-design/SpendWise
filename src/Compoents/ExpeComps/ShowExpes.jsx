import React, { useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { MdArrowDropDown } from "react-icons/md";
import { FaUtensils } from "react-icons/fa";
import { FaGraduationCap } from "react-icons/fa";
import { FaShoppingBasket } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FaLaptopCode } from "react-icons/fa";
import { MdArrowDropUp } from "react-icons/md";
import { db } from "../../firebase";

import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

export const ShowExpes = ({ user, setUser, edituser, setEditUser ,deleteId, setDeleteId }) => {
  const [userData, setData] = useState(null);
  const [menu, setMenu] = useState({
    show: false,
    x: 0,
    y: 0,
  });
  const [editId, setEditId] = useState(null);
  
  useEffect(() => {
    if (!user?.uid) return;

    const q = query(
      collection(db, "users", user.uid, "expenses"),
      orderBy("createdAt", "asc"),
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
        firestoreId: doc.id,
      }));

      setData(data);
    });

    return () => unsubscribe();
  }, [user?.uid]);

  return (
    <section className="w-full max-w-lg mx-auto  bg-white dark:bg-slate-800 border  dark:border-slate-500  text-slate-900 dark:text-slate-50 rounded-3xl shadow-xl p-6 flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800  dark:text-slate-50">Expence</h1>
      </div>

      {userData &&
        userData.map((items) => {
          return (
            <div className="flex flex-col gap-2" key={items.id}>
              <div
                className="flex border rounded-2xl p-3 gap-3 items-center relative"
                onContextMenu={(e) => {
                  e.preventDefault();
                  const obj = {
                    show: true,
                    x: e.pageX,
                    y: e.pageY,
                  };
                  setMenu(obj);
                  setEditId(items.firestoreId);
                }}
                onClick={(e) => {
                  e.type === "click" && setMenu({ show: false, x: 0, y: 0 });
                }}
              >
                <span className="border rounded-full p-3 flex items-center justify-center">
                  {/* <FaHome size={24} /> */}
                  {items.category === "Food" && (
                    <FaUtensils size={24} color="#f97316" />
                  )}
                  {items.category === "Education" && (
                    <FaGraduationCap size={24} color="#3b82f6" />
                  )}
                  {items.category === "Grocery" && (
                    <FaShoppingBasket size={24} color="#22c55e" />
                  )}
                  {items.category === "Rent" && (
                    <FaHome size={24} color="#ef4444" />
                  )}
                  {items.category === "Tech" && (
                    <FaLaptopCode size={24} color="#8b5cf6" />
                  )}
                </span>

                <div className="flex justify-between  flex-1 items-center">
                  <div className="flex flex-col">
                    <span>{items.category}</span>
                    <span>
                      {items.createdAt.toDate().toLocaleTimeString("en-IN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>

                  <span className="font-bold">{items.amount}</span>
                </div>
              </div>
            </div>
          );
        })}
      {menu.show && (
        <div
          className="absolute bg-white dark:bg-slate-700 shadow-lg rounded-lg flex flex-col"
          style={{
            left: menu.x,
            top: menu.y,
          }}
        >
          <span
            className="p-2 hover:bg-gray-100 hover:dark:bg-stone-800 cursor-pointer"
            onClick={() => {
              const selected = userData.find((item) => {
                return editId === item.firestoreId;
              });

              setEditUser(selected);
  
              setMenu({
                show: false,
                x: 0,
                y: 0,
              });
            }}
          >
            Edit
          </span>
          <span className="p-2  hover:bg-gray-100 hover:dark:bg-stone-800 cursor-pointer"
          
          onClick={()=>{
          setDeleteId(editId);

          setMenu({
                show: false,
                x: 0,
                y: 0,
              });
          }}
          > Delete </span>
        </div>
      )}
    </section>
  );
};
