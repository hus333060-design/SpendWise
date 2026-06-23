import React, { useEffect, useState } from 'react'
import { FaHandsClapping } from "react-icons/fa6";
import { FaUser } from "react-icons/fa6";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { getDoc } from 'firebase/firestore';
import { doc } from 'firebase/firestore';
import { db } from '../../firebase';
import { FiSun, FiMoon } from "react-icons/fi";


export const AfterVerification = ({formData,setSignup ,isdark ,setdark}) => {
  
const [showData, setShowData] = useState({
  username: "",
  email: ""
});


  useEffect( ()=>{
     const user=auth.currentUser?.uid; 
   if (!user) return;
     async function getUserData() {
    const userDoc = await getDoc(doc(db, "users", user));
  setShowData((prev) => ({
  ...prev,
  username: userDoc.data().username,
  email: userDoc.data().email
}));

  }

  getUserData();
  },[]);
  
async function handleLogout() {
  try {
    await signOut(auth);
    console.log("Logged out");
  } catch (error) {
    console.log(error);
  }
  setSignup(false);
}
   




function changeIthem(){
  setdark((prev)=>!prev);
  
}

  
  return (
    <div className='flex items-center space-x-1 lg:space-x-2'>
      <div className='flex items-center space-x-1'>
        <span className='font-bold text-sm sm:text-xl'>{showData.username},</span>
     <span onClick={changeIthem} >
     {
      isdark ? <FiSun  className="text-yellow-400 text-2xl hover:cursor-pointer"/> :<FiMoon  className="text-gray-700 text-2xl hover:cursor-pointer"/>
     }
     </span>
     </div>

     <button className='hover:scale-105 text-xl transition-transform duration-205 hover:cursor-pointer' onClick={handleLogout}> LogOut
     </button>
    </div>
  )
}
