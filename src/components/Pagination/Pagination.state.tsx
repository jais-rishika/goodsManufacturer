import type { PaginationAction, PaginationState } from "./Pagination.types";

export const initialPaginationState: PaginationState = {
  currPage: 0,
  size: 5,
};

export const PaginationReducer = (
  prevState: PaginationState,
  action: PaginationAction
): PaginationState => {
  switch (action.type) {
    case "CurrPage":
      return { ...prevState, currPage: action.page };
    case "SIZE":
      return { ...prevState, currPage: 0, size: action.size };
  }
};
