import React from 'react'
import { NavLink } from 'react-router-dom'

export const BeforeSetBudget = () => {
  return (
    <div className="border rounded-lg md:rounded-2xl p-1 text-sm md:p-2 md:text-xl shadow-amber-50   bg-green-600 cursor-pointer hover:scale-105 transition-transform duration-100">
          <NavLink to="/Budget" >Add Budget</NavLink>
    </div>
  )
}
