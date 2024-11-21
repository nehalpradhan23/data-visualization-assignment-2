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

// context ===============================================
("use client");
import { GlobalContextType, SheetDataObject } from "@/types/types";
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { parseDate } from "@/utils/getDate";

const ContextProvider = createContext<GlobalContextType>({
  formattedDataObject: { formattedData: [], setFormattedData: () => {} },
  selectedBarValueObject: {
    selectedBarValue: null,
    setSelectedBarValue: () => {},
  },
  ageFilterObject: {
    ageFilter: null,
    setAgeFilter: () => {},
  },
  genderFilterObject: {
    genderFilter: null,
    setGenderFilter: () => {},
  },
  dateObject: {
    startDate: null,
    endDate: null,
    setEndDate: () => {},
    setStartDate: () => {},
  },
  userObject: {
    user: undefined,
    setUser: () => {},
    isAuthUser: undefined,
    setIsAuthUser: () => {},
  },
  storeAllFiltersObject: {
    storeAllFilters: {},
    setStoreAllFilters: () => {},
  },
  shareableUrlObject: {
    shareableUrl: "",
    setShareableUrl: () => {},
  },
});

export default function GlobalContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [rawData, setRawData] = useState<[][]>([]);
  const [formattedData, setFormattedData] = useState<SheetDataObject[]>([]);
  const [selectedBarValue, setSelectedBarValue] = useState<string | null>(null);

  const [ageFilter, setAgeFilter] = useState<string | null>(
    Cookies.get("ageFilter") || null
  );
  const [genderFilter, setGenderFilter] = useState<string | null>(
    Cookies.get("genderFilter") || null
  );

  const [startDate, setStartDate] = useState<Date | null>(
    Cookies.get("startDate") ? new Date(Cookies.get("startDate")!) : null
  );
  const [endDate, setEndDate] = useState<Date | null>(
    Cookies.get("endDate") ? new Date(Cookies.get("endDate")!) : null
  );

  const [user, setUser] = useState<undefined>(undefined);
  const [isAuthUser, setIsAuthUser] = useState<boolean | undefined>(undefined);

  const [storeAllFilters, setStoreAllFilters] = useState({});

  const [shareableUrl, setShareableUrl] = useState<string>("");

  const searchParams = useSearchParams();
  // get query==============================================================================
  useEffect(() => {
    if (searchParams.entries().toArray().length > 0) {
      console.log("searchparams", Array.from(searchParams.entries()));
      const barValue = searchParams.get("selectedBarValue") || null;
      const ageFilter = searchParams.get("ageFilter") || null;
      const genderFilter = searchParams.get("genderFilter") || null;
      const startDate = searchParams.get("startDate") || null;
      const endDate = searchParams.get("endDate") || null;

      setSelectedBarValue(barValue);
      setAgeFilter(ageFilter);
      setGenderFilter(genderFilter);
      // setStartDate(startDate)
      // setEndDate(endDate)
    }
  }, [searchParams]);

  // store sharable url query =========================================
  useEffect(() => {
    const query = new URLSearchParams(storeAllFilters).toString();
    setShareableUrl(query);
    // console.log("query: ", query);
  }, [storeAllFilters]);

  // authenticate ---------------------------
  useEffect(() => {
    // console.log(Cookies);
    if (Cookies.get("token") !== undefined) {
      setIsAuthUser(true);
      const userData: any = JSON.parse(localStorage.getItem("user")!) || {};
      setUser(userData);
    } else {
      setIsAuthUser(false);
      // router.push("/login");
    }
  }, [Cookies]);

  // fetch data ============================================
  useEffect(() => {
    const fetchSheetData = async () => {
      try {
        const response = await fetch("/api/getData");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setRawData(data);
      } catch (error) {
        console.log("error fetching data: ", error);
      }
    };

    fetchSheetData();
  }, [isAuthUser]);
  // console.log("raw data: ", rawData);

  // format data =======================================================
  useEffect(() => {
    const formatData = () => {
      const keys: string[] = rawData[0] as string[];
      const arrayOfObjects: SheetDataObject[] = rawData.slice(1).map((row) => {
        const obj = {} as SheetDataObject;
        row.forEach((cell, index) => {
          obj[keys[index]] = cell;
        });

        return obj;
      });
      setFormattedData(arrayOfObjects);
    };
    if (rawData.length > 0) {
      formatData();
    }
  }, [rawData]);

  // console.log("formatted data: ", formattedData);

  // save data ==============================
  useEffect(() => {
    if (selectedBarValue) {
      Cookies.set("selectedBarValue", selectedBarValue);
    } else {
      Cookies.remove("selectedBarValue");
    }
    if (ageFilter) {
      Cookies.set("ageFilter", ageFilter);
    } else {
      Cookies.remove("ageFilter");
    }
    if (genderFilter) {
      Cookies.set("genderFilter", genderFilter);
    } else {
      Cookies.remove("genderFilter");
    }
    if (startDate) {
      // Cookies.set("startDate", startDate.toString());
      Cookies.set("startDate", startDate.toISOString());
    } else {
      Cookies.remove("startDate");
    }
    if (endDate) {
      Cookies.set("endDate", endDate.toISOString());
    } else {
      Cookies.remove("endDate");
    }
  }, [selectedBarValue, ageFilter, genderFilter, startDate, endDate]);

  // ==============================================
  return (
    <ContextProvider.Provider
      value={{
        formattedDataObject: { formattedData, setFormattedData },
        selectedBarValueObject: { selectedBarValue, setSelectedBarValue },
        ageFilterObject: { ageFilter, setAgeFilter },
        genderFilterObject: { genderFilter, setGenderFilter },
        dateObject: { startDate, endDate, setEndDate, setStartDate },
        userObject: { user, setUser, isAuthUser, setIsAuthUser },
        storeAllFiltersObject: { storeAllFilters, setStoreAllFilters },
        shareableUrlObject: { shareableUrl, setShareableUrl },
      }}
    >
      {children}
    </ContextProvider.Provider>
  );
}

export const useGlobalContext = () => {
  const context = useContext(ContextProvider);
  if (!context) {
    throw new Error("useGlobalContext must be within a GlobalContextProvider");
  }
  return context;
};
