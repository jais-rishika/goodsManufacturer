import type {
  SearchableAction,
  SearchableState,
} from "./SearchableComponents.types";

export const initialSelectState: SearchableState = {
  showFields: false,
  currentlySelected: "",
  currentSearchValue: "",
  availFields: [],
};

export const searchableReducer = (
  prevState: SearchableState,
  action: SearchableAction
): SearchableState => {
  switch (action.type) {
    case "CURRENTLY_SELECTED":
      return { ...prevState, currentlySelected: action.value , showFields: false };
    case "SEACRH":
      return { ...prevState, currentSearchValue: action.value };
    case "SHOW_FIELDS":
      return { ...prevState, showFields: !prevState.showFields };
    default:
      return prevState;
  }
};
