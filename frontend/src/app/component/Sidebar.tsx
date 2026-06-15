"use client";
import Link from "next/link";
import React from "react";

export const Sidebar = () => {
  const navItems = [
    { id: 1, name: "Solutions", route: "testing" },
    { id: 2, name: "Products", route: "testing" },
    { id: 3, name: "About", route: "testing" },
    { id: 4, name: "Dashboard", route: "company/dashboard" },
  ];

  return (
    <div className="bg-gray-800 min-w-52 h-screen text-white p-6">
      <h2 className="text-2xl font-bold mb-8">Menu</h2>

      <nav>
        <ul className="space-y-3">
          {navItems.map((item) => (
            <Link href={item.route} key={item.id}>
              <li className="cursor-pointer rounded-lg px-4 py-3 hover:bg-gray-700 transition-colors duration-200 font-bold">
                {item.name}
              </li>
            </Link>
          ))}
        </ul>
      </nav>
    </div>
  );
};
