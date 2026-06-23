import { Outlet } from 'react-router-dom'
import './App.css'
import { Header } from './Compoents/Header'
import { useEffect, useState } from 'react'

function App() {

  const [isdark,setdark]=useState(false);
 
    useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("Dark"));

      if(saved){
      setdark(saved);
      }
  }, []);

useEffect(()=>{
 
     localStorage.setItem(
      "Dark",
      JSON.stringify(isdark)
    );
     document.documentElement.classList.toggle(
      "dark",
      isdark
    );
},[isdark])
  

  return (
   <main className="min-h-screen bg-white dark:bg-stone-900 dark:text-white">
      <Header isdark={isdark} setdark={setdark} />
      <Outlet />
    </main>
  )
}

export default App
