import styles from "./FacilityManagerPage.module.scss";
import { useContext, useEffect, useRef } from "react";
import type {
  FacilityManagerProps,
  FacilityManagerTableData,
} from "./FacilityManagerPage.types.ts";
import Button from "../../../../components/Button/Button.tsx";
import Input from "../../../../components/Input/Input.tsx";
import Table from "../../../../components/Table/Table.tsx";

import type { Column } from "../../../../components/Table/Table.types.ts";
import AddModal from "../Modals/AddModal.tsx";
import DeleteModal from "../Modals/DeleteModal.tsx";
import EditModal from "../Modals/EditModal.tsx";
import {
  FacilityManagerContext,
  withFacilityManagerContext,
} from "./FacilityManager.state.tsx";
import Pagination from "../../../../components/Pagination/Pagination.tsx";
import MultipleSelect from "../../../../components/MultipleSelect/MultipleSelect.tsx";

const FacilityManagerPage = ({}: FacilityManagerProps) => {
    //ref
    const searchRef=useRef<HTMLInputElement>(null)

  //useContext
  const {
    getData,
    handleAddModal,
    addModal,
    deleteModal,
    editModal,
    facilityManagerTableData,
    selected,

    //filters,
    searchValue,
    selectedFilters,
    count,
    urlFilter,
    handleUrlChange,
    handleFilterChange,
    updateSearch,
  } = useContext(FacilityManagerContext)!;

  //columnData
  const columns: Column<FacilityManagerTableData>[] = [
    { id: "name", label: "Facility Manager Name" },
    { id: "email", label: "Facility Manager Email" },
    { id: "createdAt", label: "Joined ON" },
    { id: "facilityName", label: "Facility" },
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
          Add Facility Manager
        </Button>
      </div>

      <div className={styles.Table}>
        <Table<FacilityManagerTableData>
          tableData={facilityManagerTableData}
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
    </div>
  );
};

export default withFacilityManagerContext(FacilityManagerPage);
