import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import styles from "./Pagination.module.scss";
import { useEffect, useReducer, type ChangeEvent } from "react";
import type { PaginationProps } from "./Pagination.types";
import Button from "../Button/Button";
import { initialPaginationState, PaginationReducer } from "./Pagination.state";
const Pagination = ({
  count,
  setUrl,
  url,
  getData,
  scrollRef,
}: PaginationProps) => {
  
  const [{ currPage, limit, prevStatus,nextStatus }, dispatch] = useReducer(
    PaginationReducer,
    initialPaginationState
  );

  useEffect(() => {
    if (scrollRef) scrollRef.scrollTo(0, 0);
    dispatch({ type: "PREV", status: !!!(currPage === 1) });
    dispatch({ type: "NEXT", status: currPage < Math.ceil(count / limit) });

    //set limit and page
    const param = new URLSearchParams(url);
    param.set("limit", `${limit}`);
    param.set("page", `${currPage}`);
    setUrl(`${param}`);

    getData();
  }, [currPage, limit, count]);

  const handlePrev = () => dispatch({ type: "CurrPage", page: currPage - 1 });

  const handleNext = () => dispatch({ type: "CurrPage", page: currPage + 1 });

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: "LIMIT", limit: +e.target.value });
    dispatch({ type: "CurrPage", page: 1 });
  };
  return (
    <div className={styles.pagination}>
      <select onChange={handleChange}>
        {new Array(6).fill(0).map((_, idx) => {
          return (
            <option key={idx} value={5 * (idx + 1)}>
              {5 * (idx + 1)}
            </option>
          );
        })}
      </select>
      <Button
        className={styles.btn}
        disabled={!prevStatus}
        onClick={handlePrev}
      >
        <FaArrowLeft />
      </Button>
      <p>{currPage}</p>
      <Button
        className={styles.btn}
        disabled={!nextStatus}
        onClick={handleNext}
      >
        <FaArrowRight />
      </Button>
    </div>
  );
};

export default Pagination;
