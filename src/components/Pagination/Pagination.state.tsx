import type { PaginationAction, PaginationState } from "./Pagination.types";

export const initialPaginationState: PaginationState = {
  prevStatus: false,
  nextStatus: true,
  currPage: 1,
  limit: 5,
};

export const PaginationReducer = (
  prevState: PaginationState,
  action: PaginationAction
): PaginationState => {
  switch (action.type) {
    case "PREV":
      return { ...prevState };
    case "NEXT":
      return { ...prevState };
    case "CurrPage":
      return { ...prevState, currPage: action.page };
    case "LIMIT":
      return { ...prevState, currPage: 1, limit: action.limit };
  }
};
