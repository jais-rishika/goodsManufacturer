export interface FilterProps {
  selectedFilters: string[];
  handleFilterChange: (val: string[], url: string) => void;
  availFilters: string[];
  urlFilter: string;
  searchValue: string;
  minDate: string;
  maxDate: string;

  updateSearch: (val: string) => void;
  getData: (val: string) => void;

  updateMinPrice: (value: number) => void;
  updateMaxPrice: (value: number) => void;

  updateMinDate: (value: string) => void;
  updateMaxDate: (value: string) => void;
}

export interface FilterState{
    selectedFilters: string[],
    searchValue: string,
    minDate: string,
    maxDate: string,
    minPrice: number,
    maxPrice: number,
    urlFilter: string,
}

export interface FilterMethods {
  handleFilterChange: (val: string[], url: string) => void;
  handleUrlChange: (size: number, page: number) => void;
  updateSearch: (val: string) => void;
  updateMinDate: (value: string) => void;
  updateMaxDate: (value: string) => void;
  updateMinPrice: (value: number) => void;
  updateMaxPrice: (value: number) => void;
}

export type FilterAction = {
      type: "SET_FILTERS";
      data: string[];
} | {
      type: "SET_SEARCH";
      data: string;
} | {
      type: "SET_MINDATE";
      data: string;
} | {
      type: "SET_MAXDATE";
      data: string;
} | {
      type: "SET_MINPRICE";
      data: number;
} | {
      type: "SET_MAXPRICE";
      data: number;
};
