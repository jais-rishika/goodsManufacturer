export interface SearchableComponentsProps {
    availFields: string[]
    setAvailFields: (val: string) => void
    toSearch: string
    setFieldValue: (val: string) => void
    selectedField?: string
}

export interface SearchableState {
    showFields: boolean,
    currentlySelected: string,
    currentSearchValue: string,
    availFields: { email: string }[],
}

export type SearchableAction = {
    type: "SHOW_FIELDS"
} | {
    type: "CURRENTLY_SELECTED"
    value: string
} | {
    type: "SEACRH"
    value: string
}

export interface SearchableMethods {
    handleShowFields: () => void
    selectValue: (value: string) => void
}