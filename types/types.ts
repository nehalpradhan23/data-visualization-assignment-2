export interface SheetDataObject {
  Day: string;
  Age: string;
  Gender: string;
  A: string;
  B: string;
  C: string;
  D: string;
  E: string;
  F: string;
  [key: string]: string;
}

export interface GlobalContextType {
  formattedDataObject: {
    formattedData: SheetDataObject[];
    setFormattedData: React.Dispatch<React.SetStateAction<SheetDataObject[]>>;
  };
  selectedBarValueObject: {
    selectedBarValue: string | null;
    setSelectedBarValue: React.Dispatch<React.SetStateAction<string | null>>;
  };
  ageFilterObject: {
    ageFilter: string | null;
    setAgeFilter: React.Dispatch<React.SetStateAction<string | null>>;
  };
  genderFilterObject: {
    genderFilter: string | null;
    setGenderFilter: React.Dispatch<React.SetStateAction<string | null>>;
  };
  dateObject: {
    startDate: Date | null;
    setStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
    endDate: Date | null;
    setEndDate: React.Dispatch<React.SetStateAction<Date | null>>;
  };
  userObject: {
    user: undefined;
    setUser: React.Dispatch<React.SetStateAction<undefined>>;
    isAuthUser: boolean | undefined;
    setIsAuthUser: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  };
}
