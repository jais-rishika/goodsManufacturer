import type {
  MultipleSelectAction,
  MultipleSelectState,
} from "./MultipleSelect.types";

export const initialSelectState: MultipleSelectState = {
  showFields: false,
  currentlySelected: [],
  currentSearchValue: "",
};

export const MultipleSelectReducer = (
  prevState: MultipleSelectState,
  action: MultipleSelectAction
): MultipleSelectState => {
  switch (action.type) {
    case "CURRENTLY_SELECTED":
      return { ...prevState, currentlySelected: {...action.value} , showFields: false };
    case "SEACRH":
      return { ...prevState, currentSearchValue: action.value };
    case "SHOW_FIELDS":
      return { ...prevState, showFields: !prevState.showFields };
    default:
      return prevState;
  }
};
