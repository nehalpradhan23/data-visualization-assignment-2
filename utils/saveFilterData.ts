export const handleFilterChange = (
  filterName: any,
  filterValue: any,
  allFiltersStore: any,
  setAllFiltersStore: (arg0: any) => void
) => {
  const newFilters = { ...allFiltersStore, [filterName]: filterValue };
  setAllFiltersStore(newFilters);
};
