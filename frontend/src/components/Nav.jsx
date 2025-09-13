import React from "react";

export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 shadow-lg z-50">
      <div className="flex justify-center items-center h-16">
        <h1 className="text-white font-extrabold text-xl tracking-wider">
          FutBolinhas
        </h1>
      </div>
    </nav>
  );
}
