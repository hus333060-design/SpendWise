import React from "react";

export const Footer = () => {
  function getToday() {
    const date = new Date();
    const obj = {
      tarik: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
    };

    const arr = Object.values(obj);

    return arr;
  }
  return (
    <footer className=" bg-zinc-800 text-gray-300 -xl px-8 py-6 border border-gray-800">
      <h2 className="font-bold text-white text-lg md:text-2xl">
        EXPENCE TRACKER //
        <span className="text-green-400">COMMAND CENTER</span>
      </h2>

      <p className=" text-sm md:text-xl mt-1">Track • Invest • Grow</p>

      <div className="grid md:grid-cols-2 gap-8 mt-6 text-sm md:text-xl">
        <div className="flex flex-col justify-center">
          <h3 className="text-green-400 mb-3 text-lg md:text-2xl font-bold">
            SYSTEM STATUS
          </h3>

          <p>● Portfolio Engine Online</p>
          <p>● Firebase Sync Connected</p>
          <p>● Stock Feed Live</p>
        </div>

        <div className=" text-lg md:text-xl">
          <h3 className="text-green-400 mb-3 font-bold">CONTACT</h3>

          <p>✉ anshub693@gmail.com</p>
          <a href="https://github.com/" className="block">◎ GitHub</a>
          <a href="https://linkedin.com/">◉ LinkedIn</a>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-800 text-lg flex flex-wrap gap-3.5">
        <span>Version 1.0.0 </span>
        <span>• Last Updated {getToday().join(' ')}</span>
      </div>
    </footer>
  );
};
