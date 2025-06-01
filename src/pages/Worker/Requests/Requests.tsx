import { useContext, useEffect, useRef, type ChangeEvent } from "react";
import Button from "../../../components/Button/Button.tsx";
import Input from "../../../components/Input/Input.tsx";
import MultipleSelect from "../../../components/MultipleSelect/MultipleSelect.tsx";
import styles from "./Requests.module.scss";
import type { RequestsProps, RequestsTableData } from "./Requests.types.ts";
import { RequestsContext, withReqContext } from "./Requests.state.tsx";
import type { Column } from "../../../components/Table/Table.types.ts";
import ShowReqModal from "../ToolsInventory/Modal/ReqToolModal.tsx";
import Pagination from "../../../components/Pagination/Pagination.tsx";
import Table from "../../../components/Table/Table.tsx";

const Requests = ({}: RequestsProps) => {
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
    handleUrlChange,
    handleFilterChange,
    updateSearch,
    updateMaxDate,
    updateMinDate,
    maxDate,
    minDate,
  } = useContext(RequestsContext)!;

  //columnData
  const columns: Column<RequestsTableData>[] = [
    { id: "requestDate", label: "Request Date" },
    { id: "toolName", label: "Tool Name" },
    { id: "reqQuantity", label: "Quantity" },
    { id: "approvalStatus", label: "Approved Status Details" },
    {id: "returnDate", label: "Return Date"},
    { id: "returnStatus", label: "Return Status Details" },
  ];

  const handleFilter = () => {
    getData(urlFilter);
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

  //useEffect
  useEffect(() => {
    const date = new Date();
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
      </div>
      <div className={styles.Table}>
        <Table<RequestsTableData>
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

export default withReqContext(Requests);
