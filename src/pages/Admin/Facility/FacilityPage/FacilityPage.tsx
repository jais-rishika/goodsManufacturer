import styles from "./FacilityPage.module.scss";
import { useContext, useEffect, useRef } from "react";
import Button from "../../../../components/Button/Button.tsx";
import Input from "../../../../components/Input/Input.tsx";
import Table from "../../../../components/Table/Table.tsx";

import type { Column } from "../../../../components/Table/Table.types.ts";
import AddModal from "../Modals/AddModal.tsx";
import DeleteModal from "../Modals/DeleteModal.tsx";
import EditModal from "../Modals/EditModal.tsx";

import type { FacilityProps, FacilityTableData } from "./FacilityPage.types.ts";
import { FacilityContext, withFacilityContext } from "./FacilityPage.state.tsx";
import MultipleSelect from "../../../../components/MultipleSelect/MultipleSelect.tsx";
import Pagination from "../../../../components/Pagination/Pagination.tsx";

const FacilityPage = ({}: FacilityProps) => {
  //useContext
  const {
    getData,
    handleAddModal,
    addModal,
    deleteModal,
    editModal,
    facilityTableData,
    selected,

    //filters,
    searchValue,
    selectedFilters,
    count,
    urlFilter,
    handleUrlChange,
    handleFilterChange,
    updateSearch
  } = useContext(FacilityContext)!;

  //ref
  const searchRef=useRef<HTMLInputElement>(null)

  //columnData
  const columns: Column<FacilityTableData>[] = [
    { id: "name", label: "Facility Name" },
    { id: "address", label: "Facility Address" },
    { id: "facilityManagerEmail", label: "Facility Manager Email" },
    { id: "action", label: "Actions" },
  ];

  const handleFilter=()=>{
    getData(urlFilter);
  }

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
                availFilters={["name", "address"]}
                getData={getData}
                url={urlFilter}
              />
            </label>

            <Input type="text" placeholder="search" ref={searchRef} defaultValue={searchValue} onChange={(e)=>updateSearch(e.target.value)}/>
            <Button primary onClick={handleFilter} >Filter</Button>
          </div>
        </div>

        <Button primary onClick={handleAddModal}>
          Add Facility
        </Button>
      </div>

      <div className={styles.Table}>
        <Table<FacilityTableData>
          tableData={facilityTableData}
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

export default withFacilityContext(FacilityPage);
