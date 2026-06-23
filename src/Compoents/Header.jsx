import React, { useContext, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { MdAnalytics } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import { IoMdChatboxes } from "react-icons/io";
import { BeforeVerfication } from "./profile/BeforeVerfication";
import { FiMenu, FiX } from "react-icons/fi";
import { AfterVerification } from "./profile/AfterVerification";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../firebase";
import { BeforeSetBudget } from "./Budget/BeforeSetBudget";



export const Header = ({isdark ,setdark}) => {
  const [ openham, setOpenham ] = useState(false);
  const [issignup,setSignup]=useState(false);
   const menuRef = useRef(null);
   const [formData, setFormData] = useState({
      username: "",
      email: "",
      password: "",
    });
    

     useEffect(() => {
    const handleOutsideClick = (e) => {
      
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenham(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

    
    useEffect(() => {
  const unsub = onAuthStateChanged(auth, (user) => {
    if (user) {
      setSignup(true);
    } else {
      setSignup(false);
    }
  });

  return () => unsub();
}, []);
    
    
 
  return (
    
    <header ref={menuRef} className="h-16 text-stone-900 dark:text-stone-200 flex items-center space-x-1 sm:justify-between  relative px-4  py-9 border rounded-lg shadow-[0px_5px_15px_rgba(0,0,0,0.35)] ">
      <BeforeSetBudget/>  
      <ul className="hidden md:flex  gap-2">
        <li className="inline-flex items-center px-2 py-2 space-x-2 transition duration-200 hover:scale-105 hover:text-green-300">
           <MdDashboard className="text-xl" />
          <NavLink to="/">Dashboard</NavLink>
        </li>

        <li className="inline-flex items-center  px-2 py-2 space-x-2 transition duration-200 hover:scale-105 hover:text-green-300">
         <MdAnalytics className="text-xl"/>
          <NavLink to="/expence">Expences</NavLink>
        </li>


      </ul>



      <button
        className="ml-auto md:hidden text-lg  md:mx-9.5 cursor-pointer transition duration-200 hover:scale-110"
        onClick={() => setOpenham((prev) => !prev)}
      >
        {openham ? <FiX /> : <FiMenu />}
      </button>

      {openham && (
        <ul
          className="flex flex-col gap-2 p-4 md:p-9 bg-white/90 dark:bg-stone-900 shadow-md absolute left-[40%] z-50 top-[85%] md:hidden"
        >
          <li className=" flex space-x-2 items-center px-2 py-2  duration-100 hover:scale-105">
              <MdDashboard className="text-xl" />
            <NavLink to="/">Dashboard</NavLink>
          </li>
          <li className=" flex space-x-2 items-center px-2 py-2  duration-100 hover:scale-105">
             <MdAnalytics className="text-xl"/>
            <NavLink to="/expence">Analysis</NavLink>
          </li>
  
        </ul>
      )}
      <div>
        {!issignup ?  <BeforeVerfication setSignup={setSignup} formData={formData} setFormData={setFormData}   /> : <AfterVerification  formData={formData } setSignup={setSignup} isdark={isdark} setdark={setdark} />}
        
      </div>
    </header>

  );
};
