import { useContext, useEffect, useRef, type ChangeEvent } from "react";
import Button from "../../../components/Button/Button.tsx";
import Input from "../../../components/Input/Input.tsx";
import MultipleSelect from "../../../components/MultipleSelect/MultipleSelect.tsx";
import styles from "./WorkerRequests.module.scss";
import type { Column } from "../../../components/Table/Table.types.ts";
import Pagination from "../../../components/Pagination/Pagination.tsx";
import Table from "../../../components/Table/Table.tsx";
import { withWorkersRequestsContext, WorkersRequestsContext } from "./WorkerRequests.states.tsx";
import type { WorkerRequestsProps, WorkerRequestsTableData } from "./WorkerRequests.types.ts";
import { formatDate } from "./WorkerRequests.reducer.ts";
import ReturnModal from "./Modals/ReturnModal.tsx";
import WorkerModal from "./Modals/WorkerModal.tsx";

const Requests = ({}: WorkerRequestsProps) => {
  //ref
  const searchRef = useRef<HTMLInputElement>(null);

  //useContext
  const {
    getData,
    WorkerRequestsData,
    returnModal,
    workerDetailModal,

    //filters,
    updateUrl,
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
  } = useContext(WorkersRequestsContext)!;

  //columnData
  const columns: Column<WorkerRequestsTableData>[] = [
    { id: "requestDate", label: "Request Date" },
    { id: "workerName", label: "Worker Name" },
    { id: "toolName", label: "Tool Name" },
    { id: "reqQuantity", label: "Quantity" },
    { id: "approvalStatus", label: "Approved Status Details" },
    {id: "returnDate", label: "Return Date"},
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
                availFilters={["workerName", "toolName"]}
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
                max={formatDate(new Date)}
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
        <Table<WorkerRequestsTableData>
          tableData={WorkerRequestsData}
          columnData={columns}
        />
      </div>
      <Pagination
        count={count}
        setUrl={handleUrlChange}
        url={urlFilter}
        getData={getData}
      />
      {returnModal && <ReturnModal/>}
      {workerDetailModal && <WorkerModal/>}
    </>
  );
};

export default withWorkersRequestsContext(Requests);
