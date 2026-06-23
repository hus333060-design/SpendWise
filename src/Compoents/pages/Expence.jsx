import React, { useEffect, useState } from "react";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";

import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { SetExpe } from "../ExpeComps/SetExpe";
import { ShowExpes } from "../ExpeComps/ShowExpes";
import { FaGraduationCap, FaHome, FaLaptopCode, FaShoppingBasket, FaUtensils } from "react-icons/fa";

export default function Expence() {
  const [category, setCategory] = useState(null);
  const [dropdown, setDropdwon] = useState(false);
  const [amount, setAmount] = useState("");
  const [paymentType, setPaymentType] = useState("");

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [edituser,setEditUser]=useState(null);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
  if (edituser) {
    setAmount(edituser.amount);
      const iconMap = {
      Food: FaUtensils,
      Education: FaGraduationCap,
      Grocery: FaShoppingBasket,
      Rent: FaHome,
      Tech: FaLaptopCode,
    };
     setCategory({
      val: edituser.category,
      icon: iconMap[edituser.category],
    });

    setPaymentType(edituser.paymentType);
  }
}, [edituser]);



  if (loading) return <div>Loading...</div>;

  if (!user) {
    return (
      <div className="text-center p-10">
        <h2 className="text-xl font-bold">Please login to add expenses</h2>
        <p>You need an account to access this form.</p>
      </div>
    );
  }

  return (
      <div
        className="flex flex-wrap  p-6"
        onClick={() => setDropdwon(false)}
      >
        
        {/* form to set expence */}
        {/* isme user ki id chal rhi hai  */}
        <SetExpe category={category} setCategory={setCategory} dropdown={dropdown} setDropdwon={setDropdwon} amount={amount} setAmount={setAmount} paymentType={paymentType} setPaymentType={setPaymentType} user={user} setUser={setUser}  edituser= {edituser} setEditUser={setEditUser} deleteId={deleteId} setDeleteId={setDeleteId}/>
       {/* isme user.uid undefined kya? */}
    <ShowExpes user={user} setUser={setUser}  edituser= {edituser} setEditUser={setEditUser} deleteId={deleteId} setDeleteId={setDeleteId} />
      
      </div>
  );
}
