import { FaCaretDown } from "react-icons/fa";
import styles from "./SearchableComponents.module.scss";
import type { SearchableComponentsProps } from "./SearchableComponents.types.ts";
import Button from "../Button/Button.tsx";
import { useContext, type ChangeEvent } from "react";
import {
  SearchableContext,
  withSearchableContext,
} from "./SearchableComponent.state.tsx";

const SearchableComponents =({
  availFields,
  setAvailFields,
  toSearch
  // register
}: SearchableComponentsProps) => {
  const {
    handleShowFields,
    selectValue,
    currentlySelected,
    currentSearchValue,
    showFields,
  } = useContext(SearchableContext)!;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAvailFields(e.target.value);
  };

  return (
    <div className={styles.DropDownBox}>
      <div className={styles.SelectedValue}>
        <input placeholder="Select" value={currentlySelected}/>

        <Button
          onClick={handleShowFields}
          type="button"
          className={styles.CaretDownBtn}
        >
          <FaCaretDown />
        </Button>
      </div>

      {showFields && (
        <div className={styles.Dropdown}>
          <div>
            <input
              type="text"
              placeholder={`Search ${toSearch}...`}
              defaultValue={currentSearchValue}
              onChange={handleChange}
            />
          </div>

          <ul>
            {availFields.length > 0 ? (
              availFields.map((val) => (
                <li onClick={() => selectValue(val)}>{val}</li>
              ))
            ) : (
              <li>NO FIELDS AVALIABLE</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default withSearchableContext(SearchableComponents);
