import React from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../../firebase';

export const LoginForm = ({setSignup ,formData, setFormData,setModalType}) => {

     
 async function handleSubmit(e) {
  e.preventDefault();
  try {
    await signInWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    );

   setModalType(null); // ONLY after success
  } catch (err) {
    console.log(err.message);
  }
   return null; // your UI already exists
}
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50" onClick={()=>setModalType(null)}>
      <form className="bg-white p-6 rounded-xl w-[90%] max-w-md"
        onSubmit={handleSubmit}
        onClick={(e)=>e.stopPropagation()}
        >

         <h2 className="text-2xl font-bold mb-4">Login </h2>
         <input 
         type="email"
         placeholder='Email'  
          className="w-full border p-2 mb-3" 
          value={formData.email}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              email: e.target.value,
            }))
          }
          />

          <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-4"
          name="password"
          value={formData.password}
          onChange={(e)=>
             setFormData((prev)=>({
              ...prev,
              password:e.target.value,
             }))
          }
        />

         <div className="flex justify-end gap-2">
          <button
          type='button'
            className="px-4 py-2 border rounded cursor-pointer transition duration-200 hover:scale-110"
          onClick={() =>{
               setModalType(null)
             } }
          >
            Close
          </button>

          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded cursor-pointer transition duration-200 hover:scale-110"
          >
            Log In
          </button>
        </div>
      </form>
    </div>
  )
}
