import { FaCaretDown } from "react-icons/fa";
import styles from "./MultipleSelect.module.scss";
import type { MultipleSelectProps } from "./MultipleSelect.types.ts";
import Button from "../Button/Button.tsx";
import { useContext, useEffect, type ChangeEvent } from "react";
import {
  MultipleSelectContext,
  withMultipleSelectContext,
} from "./MultipleSelect.state.tsx";

const MultipleSelectComponents = ({
  selectedFilters,
  handleFilter,
  availFilters,
  url,
}: MultipleSelectProps) => {
  const { handleShowFields, showFields } = useContext(MultipleSelectContext)!;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const currVal = e.target.value;
    const currFilters: string[] = selectedFilters;
    console.log(currFilters, selectedFilters);

    const check = currFilters.findIndex((val) => val === currVal);
    if (check === -1) {
      currFilters.push(currVal);
    } else {
      currFilters.splice(check, 1);
    }
    handleFilter(currFilters, url);
    // selectValue(currFilters);
    // const url=currFilters.reduce((a,b)=> `${a}&fields=${b}`,'')
    // getData(url)
  };

  // useEffect(() => {},[]);
  return (
    <div className={styles.DropDownBox}>
      <div className={styles.SelectedValue}>
        <input placeholder="Select Filter   " />

        <Button
          onClick={handleShowFields}
          type="button"
          className={styles.CaretDownBtn}
        >
          <FaCaretDown />
        </Button>
      </div>

      {showFields && (
        <ul className={styles.Dropdown}>
          {availFilters.length > 0 ? (
            availFilters.map((val: string) => {
              return (
                <label className={styles.Fields}>
                  <input
                    type="checkbox"
                    name={val}
                    value={val}
                    onChange={handleChange}
                    checked={selectedFilters.includes(val)}
                  />{" "}
                  {val}
                </label>
              );
            })
          ) : (
            <li>NO FIELDS AVALIABLE</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default withMultipleSelectContext(MultipleSelectComponents);
