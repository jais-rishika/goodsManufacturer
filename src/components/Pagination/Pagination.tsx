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
  const [{ currPage, size}, dispatch] = useReducer(
    PaginationReducer,
    initialPaginationState
  );

  useEffect(() => {
    if (scrollRef) scrollRef.scrollTo(0, 0);
    setUrl(size, currPage);
  }, [currPage, size, count]);

  useEffect(()=>{
    getData(url);
  },[url])
  const handlePrev = () => dispatch({ type: "CurrPage", page: currPage - 1 });

  const handleNext = () => dispatch({ type: "CurrPage", page: currPage + 1 });

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: "SIZE", size: +e.target.value });
    dispatch({ type: "CurrPage", page: 0 });
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
          disabled={!(currPage >0)}
          onClick={handlePrev}
        >
          <FaArrowLeft />
        </Button>
      <p>{currPage + 1}</p>
        <Button
          className={styles.btn}
          disabled={!(currPage < Math.ceil(count / size) - 1)}
          onClick={handleNext}
        >
          <FaArrowRight />
        </Button>
    </div>
  );
};

export default Pagination;
