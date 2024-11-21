"use client";
import { MyBarChart } from "@/components/charts/MyBarChart";
import { MyLineChart } from "@/components/charts/MyLineChart";
import { Filters } from "@/components/filters/Filters";
import { useGlobalContext } from "@/context/ContextApi";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import React, { Suspense, useEffect, useState } from "react";
import { parseDate } from "@/utils/getDate";

const MainHome: React.FC = () => {
  const {
    formattedDataObject: { formattedData },
    selectedBarValueObject: { selectedBarValue, setSelectedBarValue },
    userObject: { isAuthUser, setIsAuthUser, setUser },
    shareableUrlObject: { shareableUrl },
    ageFilterObject: { setAgeFilter },
    genderFilterObject: { setGenderFilter },
    dateObject: { setStartDate, setEndDate },
  } = useGlobalContext();

  const router = useRouter();
  const searchParams = useSearchParams();

  const [shareToast, setShareToast] = useState(false);

  const handleLogOut = () => {
    setIsAuthUser(false);
    setUser(undefined);
    Cookies.remove("token");
    localStorage.clear();
    router.push("/login");
  };

  // ===========================================================
  const handleShareUrl = () => {
    setShareToast(true);
    const currentDomain = window.location.origin;

    window.navigator.clipboard.writeText(`${currentDomain}/?` + shareableUrl);

    setTimeout(() => {
      setShareToast(false);
    }, 4000);
  };

  // useEffect(() => {
  //   if (isAuthUser === undefined) router.push("/login");
  // }, []);

  useEffect(() => {
    if (searchParams.entries().toArray().length > 0) {
      console.log("searchparams", Array.from(searchParams.entries()));
      const barValue = searchParams.get("selectedBarValue") || null;
      const ageFilter = searchParams.get("ageFilter") || null;
      const genderFilter = searchParams.get("genderFilter") || null;
      const startDateString = searchParams?.get("startDate") || null;
      const endDateString = searchParams?.get("endDate") || null;

      const newStartDate = startDateString ? new Date(startDateString) : null;
      const newEndDate = endDateString ? new Date(endDateString) : null;

      setSelectedBarValue(barValue);
      setAgeFilter(ageFilter);
      setGenderFilter(genderFilter);
      setStartDate(newStartDate);
      setEndDate(newEndDate);
    }
    if (isAuthUser === undefined) router.push("/login");
  }, [searchParams]);
  // =========================================================
  return (
    <div className="mx-[20px]">
      <div className="flex w-full py-4 gap-4 justify-between">
        <div className="flex items-center gap-4">
          <button
            className="flex items-center gap-2 border border-gray-400 px-3 py-1 rounded-full bg-slate-200"
            onClick={handleShareUrl}
          >
            Share URL
          </button>
          {shareToast && <span>URL copied</span>}
        </div>
        {/* <div className="flex-1 flex items-center gap-2 border border-gray-200 px-3 py-1 rounded-full bg-slate-200">
          <button className="border-r border-black px-2">Share URL</button>
          <label htmlFor="" className="text-gray-400">
            {shareableUrl}
          </label>
        </div> */}
        <button className="text-2xl" onClick={handleLogOut}>
          Logout
        </button>
      </div>
      {/* <div className="">
        {formattedData?.map((item, index) => (
          <div key={index}>{JSON.stringify(item)}</div>
        ))}
      </div> */}
      <div className="flex justify-between w-full max-md:flex-col">
        <MyBarChart />
        <Filters />
        {/* {selectedBarValue && <Filters />} */}
      </div>
      {selectedBarValue && (
        <div className="">
          <div className="text-center text-3xl font-bold">
            Line chart for: {selectedBarValue}
          </div>
          <MyLineChart />
        </div>
      )}
    </div>
  );
};

export default function Home() {
  return (
    <Suspense>
      <MainHome />
    </Suspense>
  );
}
