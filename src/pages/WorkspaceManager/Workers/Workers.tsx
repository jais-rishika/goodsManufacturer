import styles from "./Workers.module.scss";
import { useContext, useEffect, useRef, type ChangeEvent } from "react";
import type { WorkersProps, WorkersTableData } from "./Workers.types.ts";

import { WorkersContext, withWorkersContext } from "./Workers.state.tsx";
import Button from "../../../components/Button/Button.tsx";
import Input from "../../../components/Input/Input.tsx";
import MultipleSelect from "../../../components/MultipleSelect/MultipleSelect.tsx";
import Pagination from "../../../components/Pagination/Pagination.tsx";
import Table from "../../../components/Table/Table.tsx";
import type { Column } from "../../../components/Table/Table.types.ts";
import AddModal from "./Modals/AddModal.tsx";
import DeleteModal from "./Modals/DeleteModal.tsx";
import EditModal from "./Modals/EditModal.tsx";

const Workers = ({}: WorkersProps) => {
  //ref
  const searchRef = useRef<HTMLInputElement>(null);

  //useContext
  const {
    getData,
    handleAddModal,
    addModal,
    deleteModal,
    editModal,
    workersTableData,
    selected,

    //filters,
    searchValue,
    selectedFilters,
    count,
    urlFilter,
    handleUrlChange,
    handleFilterChange,
    updateSearch,
  } = useContext(WorkersContext)!;

  //columnData
  const columns: Column<WorkersTableData>[] = [
    { id: "name", label: "WorkPlace Manager Name" },
    { id: "email", label: "WorkPlace Manager Email" },
    { id: "workplaceName", label: "workplace Name" },
    { id: "workstationCode", label: "WorkStation" },
    { id: "action", label: "Actions" },
  ];

  const handleFilter = () => {
    getData(urlFilter);
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
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                updateSearch(e.target.value)
              }
            />
            <Button primary onClick={handleFilter}>
              Filter
            </Button>
          </div>
        </div>

        <Button primary onClick={handleAddModal}>
          Add WorkPlace Manager
        </Button>
      </div>

      <div className={styles.Table}>
        <Table<WorkersTableData>
          tableData={workersTableData}
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
      {selected && editModal && <EditModal />}
      {deleteModal && <DeleteModal />}
    </>
  );
};

export default withWorkersContext(Workers);
