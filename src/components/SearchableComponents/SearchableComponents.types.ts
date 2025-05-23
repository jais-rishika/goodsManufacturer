import type { RegisterOptions, UseFormRegisterReturn } from "react-hook-form"

export interface SearchableComponentsProps{
    availFields: string[]
    setAvailFields: (val: string)=> void
    register: any
 }

export interface SearchableState {
    showFields: boolean,
    currentlySelected: string,
    currentSearchValue: string,
    availFields: { email: string }[],
}

export type SearchableAction={
    type: "SHOW_FIELDS"
}|{
    type: "CURRENTLY_SELECTED"
    value: string
}|{
    type: "SEACRH"
    value: string
}

export interface SearchableMethods {
    handleShowFields: () => void
    selectValue: (value: string)=> void
}