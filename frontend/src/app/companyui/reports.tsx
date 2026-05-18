"use client";

import { CompanyTabs } from "./tabs/CompanyTab";
import { useRouter } from "next/navigation";
import { useUserStore } from "../component/zustand";
const Report = () => {
  const router = useRouter();
  const setActiveCompanyPage = useUserStore(
    (state) => state.setActiveCompanyPage,
  );
  const active = useUserStore((state) => state.active_company_page);
       const tabs = CompanyTabs(active);

  const handleActivity = (key: string, route: string) => {
    setActiveCompanyPage(key);
    if (route) {
      router.push(route);
    }
  };
  return (
    <div className="flex flex-row w-full">
      <div className="p-4 w-full max-w-[300px] hidden md:inline-block lg:max-w-[400px] border-r border-gray-300 bg-white shadow-sm">
        <h1
          className="text-3xl font-handwriting font-extrabold text-blue-700 cursor-pointer"
          onClick={() => handleActivity("drivers", "/")}
        >
          FleetOps
        </h1>

        <div className="mt-6">
          <div className="flex flex-col gap-3">
            {tabs.map((tab, index) => (
              <div
                key={index}
                onClick={() => handleActivity(tab.key, `/company/${tab.key}`)}
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 cursor-pointer ${ tab.key == "report" ? "bg-blue-100" : "hover:bg-gray-100"}`}
              >
                {tab.icon}
                <p
                  className={`font-semibold ${tab.key == "report" ? "text-blue-600" : "text-gray-600"}`}
                >
                  {tab.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
