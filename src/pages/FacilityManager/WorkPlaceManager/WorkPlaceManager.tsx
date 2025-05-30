import { useContext, useEffect, useRef } from "react";
import Button from "../../../components/Button/Button.tsx";
import Input from "../../../components/Input/Input.tsx";
import Table from "../../../components/Table/Table.tsx";
import type { Column } from "../../../components/Table/Table.types.ts";
import AddModal from "./Modals/AddModal.tsx";
import DeleteModal from "./Modals/DeleteModal.tsx";
import EditModal from "./Modals/EditModal.tsx";
import styles from "./WorkPlaceManager.module.scss";
import {
  withWorkPlaceManagerContext,
  WorkPlaceManagerContext,
} from "./WorkPlaceManager.state.tsx";
import type {
  WorkPlaceManagerProps,
  WorkPlaceManagerTableData,
} from "./WorkPlaceManager.types.ts";
import MultipleSelect from "../../../components/MultipleSelect/MultipleSelect.tsx";
import Pagination from "../../../components/Pagination/Pagination.tsx";

const WorkPlaceManager = ({}: WorkPlaceManagerProps) => {
  //ref
  const searchRef = useRef<HTMLInputElement>(null);

  //useContext
  const {
    handleAddModal,
    getData,
    addModal,
    deleteModal,
    editModal,
    workPlaceManagerTableData,

    //filters,
    searchValue,
    selectedFilters,
    count,
    urlFilter,
    handleUrlChange,
    handleFilterChange,
    updateSearch,
  } = useContext(WorkPlaceManagerContext)!;

  //columnData
  const columns: Column<WorkPlaceManagerTableData>[] = [
    { id: "name", label: "Workplace Manager Name" },
    { id: "email", label: "Workplace Manager Email" },
    { id: "createdAt", label: "Joined ON" },
    { id: "workplaceName", label: "WorkPlace" },
    { id: "action", label: "Actions" },
  ];

  const handleFilter = () => {
    getData(urlFilter);
  };

  //useEffect
  useEffect(() => {
    console.log("getting Data");
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
            <Button primary onClick={handleFilter}>Filter</Button>
          </div>
        </div>

        <Button primary onClick={handleAddModal}>
          Add WorkPlace Manager
        </Button>
      </div>

      <div className={styles.Table}>
        <Table<WorkPlaceManagerTableData>
          tableData={workPlaceManagerTableData}
          columnData={columns}
        />
      </div>
      <Pagination
        count={count}
        setUrl={handleUrlChange}
        url={urlFilter}
        getData={getData}
      />
      {addModal && <AddModal />}
      {editModal && <EditModal />}
      {deleteModal && <DeleteModal />}
    </div>
  );
};

export default withWorkPlaceManagerContext(WorkPlaceManager);
