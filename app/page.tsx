"use client";
import { MyBarChart } from "@/components/charts/MyBarChart";
import { MyLineChart } from "@/components/charts/MyLineChart";
import { Filters } from "@/components/filters/Filters";
import { useGlobalContext } from "@/context/ContextApi";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function Home() {
  const {
    formattedDataObject: { formattedData },
    selectedBarValueObject: { selectedBarValue },
    userObject: { isAuthUser, setIsAuthUser, setUser },
    shareableUrlObject: { shareableUrl },
  } = useGlobalContext();

  const router = useRouter();
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

  useEffect(() => {
    if (isAuthUser === undefined) router.push("/login");
  }, []);

  // =========================================================================

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
}
