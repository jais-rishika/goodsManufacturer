import Button from "../../../components/Button/Button.tsx";
import Input from "../../../components/Input/Input.tsx";
import MultipleSelect from "../../../components/MultipleSelect/MultipleSelect.tsx";
import Pagination from "../../../components/Pagination/Pagination.tsx";
import Table from "../../../components/Table/Table.tsx";
import type { Column } from "../../../components/Table/Table.types.ts";
import AddModal from "./Modals/AddModal.tsx";
import DeleteModal from "./Modals/DeleteModal.tsx";
import EditModal from "./Modals/EditModal.tsx";
import styles from "./WorkStation.module.scss";
import { useContext, useEffect, useRef, type ChangeEvent } from "react";
import { withWorkStation, WorkStationContext } from "./WorkStation.state.tsx";
import type {
  WorkStationProps,
  WorkStationTableData,
} from "./WorkStation.types.ts";

const WorkStation = ({}: WorkStationProps) => {
  //useContext
  const {
    getData,
    handleAddModal,
    addModal,
    deleteModal,
    editModal,
    workStationTableData,
    selected,

    //filters,
    updateUrl,
    searchValue,
    selectedFilters,
    count,
    urlFilter,
    handleUrlChange,
    handleFilterChange,
    updateSearch,
  } = useContext(WorkStationContext)!;

  //ref
  const searchRef = useRef<HTMLInputElement>(null);

  //columnData
  const columns: Column<WorkStationTableData>[] = [
    { id: "name", label: "WorkStation Name" },
    { id: "workerName", label: "WorkStation Manager Name" },
    { id: "workerEmail", label: "WorkStation Manager Email" },
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
                availFilters={["workerName", "workerEmail", "name"]}
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

        <Button primary onClick={handleAddModal}>
          Add WorkStation
        </Button>
      </div>

      <div className={styles.Table}>
        <Table<WorkStationTableData>
          tableData={workStationTableData}
          columnData={columns}
        />
      </div>

      <Pagination
        count={count}
        url={urlFilter}
        setUrl={handleUrlChange}
        getData={getData}
      />
      {addModal && <AddModal />}
      {selected && editModal && <EditModal />}
      {deleteModal && <DeleteModal />}
    </div>
  );
};

export default withWorkStation(WorkStation);
