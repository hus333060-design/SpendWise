import React, { useEffect, useState } from "react";
import { FirstBox } from "../DashCompoents/FirstBox";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { data } from "react-router-dom";
import { Footer } from "../DashCompoents/Footer";
import { DasBoardSim } from "../Simmer/DasBoardSim";


export default function Dashboards() {
   const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [income,setincome]=useState(0);
    const [payout,setPayout]=useState(0);
    
  
    
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
    setLoading(false);
  });

  return () => unsubscribe();
}, []);

useEffect(() => {
  if (!user) return;
  async function   getExpenses() {
    try{
          const incomeDoc = await getDoc(
      doc(db, "users", user.uid)
    );

    const userdata=incomeDoc.data();
    setincome(userdata.budget);


     const snapshot = await getDocs(
      collection(db, "users", user.uid, "expenses")
    );

    const expen=[];
   snapshot.forEach((doc)=>{
    expen.push({
      id:doc.id,
      ...doc.data(),
    })
   })
   const spend=expen.reduce((acc,current)=>{
     return acc+Number(current.amount);
   },0)
   
   setPayout(spend);   
  }catch(err){
    console.log(err);
    
  }
}

   getExpenses();

 
}, [user]);
    
      if (loading){
   return <DasBoardSim/>
      
      };
  
  if (!user) {
    return (
      <div className="text-center p-10  text-black dark:text-stone-100">
        
        <h2 className="text-xl font-bold ">Please login to add expenses</h2>
        <p>You need an account to access this form.</p>
      </div>
    );
  }

   
  return (
    <>
        <FirstBox income={income} payout={payout}/>
      <Footer/>
   </>
  );
}
