import { useContext, useEffect, useRef } from "react";
import Button from "../../../components/Button/Button.tsx";
import Input from "../../../components/Input/Input.tsx";
import Table from "../../../components/Table/Table.tsx";
import type { Column } from "../../../components/Table/Table.types.ts";
import styles from "./ToolCribs.module.scss";
import type { ToolCribsProps, ToolCribsTableData } from "./ToolCribs.types.ts";
import { withToolCribs, ToolCribsContext } from "./ToolCribs.state.tsx";
import MultipleSelect from "../../../components/MultipleSelect/MultipleSelect.tsx";
import Pagination from "../../../components/Pagination/Pagination.tsx";

const ToolCribs = ({}: ToolCribsProps) => {
  //useContext
  const {
    getData,
    ToolCribsTableData,
    //filters,
    updateUrl,
    searchValue,
    selectedFilters,
    count,
    urlFilter,
    handleUrlChange,
    handleFilterChange,
    updateSearch,
  } = useContext(ToolCribsContext)!;

  //ref
  const searchRef = useRef<HTMLInputElement>(null);

  //columnData
  const columns: Column<ToolCribsTableData>[] = [
    { id: "name", label: "ToolCribs Name" },
    { id: "ToolCribManager", label: "ToolCribs Managers" },
    { id: "workplaceName", label: "Work Place" },
    { id: "action", label: "Actions" },
  ];

  const handleFilter = () => {
    updateUrl(urlFilter);
  };

  //useEffect
  useEffect(() => {
    getData(urlFilter);
  }, []);

  return (
    <div>
      <div className={styles.Top}>
        <div>
          <div className={styles.Filter}>
            <label>
              <MultipleSelect
                selectedFilters={selectedFilters}
                handleFilter={handleFilterChange}
                availFilters={["name", "workplaceName", "toolCribManagerEmail"]}
                getData={getData}
                url={urlFilter}
              />
            </label>

            <Input
              type="text"
              placeholder="search"
              ref={searchRef}
              defaultValue={searchValue}
              onChange={(e) => updateSearch(e.target.value)}
            />
            <Button primary onClick={handleFilter}>
              Filter
            </Button>
          </div>
        </div>
      </div>
      <div className={styles.Table}>
        <Table<ToolCribsTableData>
          tableData={ToolCribsTableData}
          columnData={columns}
        />
      </div>
      <Pagination
        count={count}
        url={urlFilter}
        setUrl={handleUrlChange}
        getData={getData}
      />
    </div>
  );
};

export default withToolCribs(ToolCribs);
