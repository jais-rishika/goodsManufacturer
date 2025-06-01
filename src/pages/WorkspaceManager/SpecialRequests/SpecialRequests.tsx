import { useContext, useEffect, useRef, type ChangeEvent } from "react";
import Button from "../../../components/Button/Button.tsx";
import Input from "../../../components/Input/Input.tsx";
import MultipleSelect from "../../../components/MultipleSelect/MultipleSelect.tsx";
import styles from "./SpecialRequests.module.scss";
import type {
  SpecialRequestsProps,
  SpRequestsTableData,
} from "./SpecialRequests.types.ts";
import {
  SpecialRequestsContext,
  withSpecialReqContext,
} from "./SpecialRequests.state.tsx";
import type { Column } from "../../../components/Table/Table.types.ts";
import ShowReqModal from "../../Worker/ToolsInventory/Modal/ReqToolModal.tsx";
import Pagination from "../../../components/Pagination/Pagination.tsx";
import Table from "../../../components/Table/Table.tsx";
import { formatDate } from "./SpecialRequests.reducer.tsx";

const SpecialRequests = ({}: SpecialRequestsProps) => {
  //ref
  const searchRef = useRef<HTMLInputElement>(null);

  //useContext
  const {
    getData,
    ReqDetailModal,
    RequestsData,

    //filters,
    searchValue,
    selectedFilters,
    count,
    urlFilter,
    maxDate,
    minDate,
    updateUrl,
    handleUrlChange,
    handleFilterChange,
    updateSearch,
    updateMaxDate,
    updateMinDate,
  } = useContext(SpecialRequestsContext)!;

  //columnData
  const columns: Column<SpRequestsTableData>[] = [
    { id: "requestDate", label: "Request Date" },
    { id: "workerName", label: "Worker Name" },
    { id: "toolName", label: "Tool Name" },
    { id: "reqQuantity", label: "Quantity" },
    { id: "approvalStatus", label: "Approved Status Details" },
    { id: "returnStatus", label: "Return Status Details" },
  ];

  const handleFilter = () => {
    updateUrl(urlFilter);
  };

  const handleMinDate = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    updateMinDate(val);
  };
  const handleMaxDate = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    updateMaxDate(val);
  };

  //useEffect
  useEffect(() => {
    getData(urlFilter);
  }, []);

  return (
    <>
      <div className={styles.Top}>
        <div>
          <div className={styles.Filter}>
            <label>
              <MultipleSelect
                selectedFilters={selectedFilters}
                handleFilter={handleFilterChange}
                availFilters={["name", "email"]}
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

            <div className={styles.DateFilter}>
              <Input
                placeholder="MinDate"
                type="date"
                min={"2025-01-20"}
                max={maxDate}
                onChange={handleMinDate}
                className={styles.Price}
              />
              <Input
                placeholder="MaxDate"
                type="date"
                min={minDate}
                max={formatDate(new Date())}
                onChange={handleMaxDate}
                className={styles.Price}
              />
            </div>

            <Button primary onClick={handleFilter}>
              Filter
            </Button>
          </div>
        </div>
      </div>
      <div className={styles.Table}>
        <Table<SpRequestsTableData>
          tableData={RequestsData}
          columnData={columns}
        />
      </div>
      <Pagination
        count={count}
        setUrl={handleUrlChange}
        url={urlFilter}
        getData={getData}
      />
      {ReqDetailModal && <ShowReqModal />}
    </>
  );
};

export default withSpecialReqContext(SpecialRequests);
