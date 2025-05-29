import styles from "./ToolCribManager.module.scss";
import { useContext, useEffect, useRef, type ChangeEvent } from "react";

import type {
  ToolCribManagerProps,
  ToolCribManagerTableData,
} from "./ToolCribManager.types.ts";

import {
  ToolCribManagerContext,
  withToolCribManagerContext,
} from "./ToolCribManager.state.tsx";

import Button from "../../../components/Button/Button.tsx";
import Input from "../../../components/Input/Input.tsx";
import MultipleSelect from "../../../components/MultipleSelect/MultipleSelect.tsx";
import Pagination from "../../../components/Pagination/Pagination.tsx";
import Table from "../../../components/Table/Table.tsx";
import type { Column } from "../../../components/Table/Table.types.ts";
import AddModal from "./Modals/AddModal.tsx";
import DeleteModal from "./Modals/DeleteModal.tsx";
import EditModal from "./Modals/EditModal.tsx";


const ToolCribManager = ({}: ToolCribManagerProps) => {
  //ref
  const searchRef=useRef<HTMLInputElement>(null)

  //useContext
  const {
    getData,
    handleAddModal,
    addModal,
    deleteModal,
    editModal,
    ToolCribManagerTableData,
    selected,

    //filters,
    searchValue,
    selectedFilters,
    count,
    urlFilter,
    handleUrlChange,
    handleFilterChange,
    updateSearch,
  } = useContext(ToolCribManagerContext)!;

  //columnData
  const columns: Column<ToolCribManagerTableData>[] = [
    { id: "name", label: "ToolCrib Manager Name" },
    { id: "email", label: "ToolCrib Manager Email" },
    { id: "createdAt", label: "Joined ON" },
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
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateSearch(e.target.value)}
            />
            <Button primary onClick={handleFilter}>Filter</Button>
          </div>
        </div>

        <Button primary onClick={handleAddModal}>
          Add ToolCrib Manager
        </Button>
      </div>

      <div className={styles.Table}>
        <Table<ToolCribManagerTableData>
          tableData={ToolCribManagerTableData}
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

export default withToolCribManagerContext(ToolCribManager);
