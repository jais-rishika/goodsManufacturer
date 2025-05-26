export interface MultipleSelectProps {
    url: string
    selectedFilters: string[],
    handleFilter: (val: string[],url: string) => void,
    availFilters: string[] 
    getData: (val: string)=> void   
}

export interface MultipleSelectState {
    showFields: boolean,
    currentlySelected: string[],
    currentSearchValue: string,
}

export type MultipleSelectAction = {
    type: "SHOW_FIELDS"
} | {
    type: "CURRENTLY_SELECTED"
    value: string[]
} | {
    type: "SEACRH"
    value: string
} | {
    type: "SET_URL"
    val: string
}

export interface MultipleSelectMethods {
    handleShowFields: () => void
    selectValue: (value: string[]) => void
}