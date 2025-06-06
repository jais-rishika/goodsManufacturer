import { type ChangeEvent } from "react";
import styles from "./Filter.module.scss";
import Button from "../Button/Button";
import Input from "../Input/Input";
import MultipleSelect from "../MultipleSelect/MultipleSelect";
import type { FilterProps } from "./Filter.types";
import { withFilterContext } from "./Filter.state";

const Filter = ({
  selectedFilters,
  handleFilterChange,
  urlFilter,
  searchValue,
  minDate,
  maxDate,
  updateSearch,
  getData,

  updateMinPrice,
  updateMaxPrice,

  updateMinDate,
  updateMaxDate,
}: FilterProps) => {
  const handleFilter = () => {
    getData(urlFilter);
  };

  const handleMinPrice = (e: ChangeEvent<HTMLInputElement>) => {
    const val = +e.target.value;
    console.log(val);
    if (val < 1) {
      alert("Min value can't be less than 1");
      e.target.value = "";
    } else {
      updateMinPrice(val);
    }
  };
  const handleMaxPrice = (e: ChangeEvent<HTMLInputElement>) => {
    const val = +e.target.value;
    if (val < 1) {
      alert("Max value can't be less than 1");
      e.target.value = "";
    } else {
      updateMaxPrice(val);
    }
  };

  const handleMinDate = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    console.log(val);
    //error handling
    updateMinDate(val);
  };
  const handleMaxDate = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    // errorHandling
    updateMaxDate(val);
  };

  return (
    <div>
      <div className={styles.Filter}>
        <label>
          <MultipleSelect
            selectedFilters={selectedFilters}
            handleFilter={handleFilterChange}
            availFilters={["name", "address"]}
            getData={getData}
            url={urlFilter}
          />
        </label>

        <Input
          type="text"
          placeholder="search"
          //   ref={searchRef}
          defaultValue={searchValue}
          onChange={(e) => updateSearch(e.target.value)}
        />

        <div className={styles.PriceFilter}>
          <Input
            placeholder="MinPrice"
            type="number"
            min={1}
            onChange={handleMinPrice}
            className={styles.Price}
          />
          <Input
            placeholder="MaxPrice"
            type="number"
            min={1}
            onChange={handleMaxPrice}
            className={styles.Price}
          />
        </div>

        <div className={styles.DateFilter}>
          <Input
            placeholder="MinDate"
            type="date"
            min={minDate}
            max={maxDate}
            onChange={handleMinDate}
            className={styles.Price}
          />
          <Input
            placeholder="MaxDate"
            type="date"
            min={minDate}
            max={maxDate}
            onChange={handleMaxDate}
            className={styles.Price}
          />
        </div>

        <Button primary onClick={handleFilter}>
          Filter
        </Button>
      </div>
    </div>
  );
};

export default withFilterContext(Filter);
