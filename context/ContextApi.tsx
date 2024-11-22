"use client";
import { GlobalContextType, SheetDataObject } from "@/types/types";
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
// import { usePathname, useRouter, useSearchParams } from "next/navigation";

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

  const [storeAllFilters, setStoreAllFilters] = useState({}); // store for filters for sharing

  const [shareableUrl, setShareableUrl] = useState<string>(""); // sharable url

  // const [storeSearchParams, setStoreSearchParams] = useState("");

  // const [sharableQuery, setSharableQuery] = useState(
  //   Cookies.get("sharableQuery") || ""
  // );

  const router = useRouter();

  // console.log("All filters: ", storeAllFilters);

  // store sharable url query =========================================
  useEffect(() => {
    const query = new URLSearchParams(storeAllFilters).toString();
    // Cookies.set("sharableQuery", sharableQuery);
    setShareableUrl(query);
    // setSharableQuery(shareableUrl);
  }, [storeAllFilters]);

  // authenticate ---------------------------
  useEffect(() => {
    // if (sharableQuery) setShareableUrl(sharableQuery);
    if (Cookies.get("token") !== undefined) {
      setIsAuthUser(true);
      const userData: any = JSON.parse(localStorage.getItem("user")!) || {};
      setUser(userData);
    } else {
      setIsAuthUser(false);
      router.push("/login");
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
      Cookies.set("startDate", startDate.toISOString());
    } else {
      Cookies.remove("startDate");
    }
    if (endDate) {
      Cookies.set("endDate", endDate.toISOString());
    } else {
      Cookies.remove("endDate");
    }
    // if (storeAllFilters) {
    //   Cookies.set("sharableQuery", shareableUrl);
    // }
  }, [
    selectedBarValue,
    ageFilter,
    genderFilter,
    startDate,
    endDate,
    // storeAllFilters,
  ]);

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
