import styles from "./AllEmployee.module.scss";
import { useContext, useEffect, useRef } from "react";
import {
  AllEmployeeContext,
  withAllEmployeeContext,
} from "./AllEmployee.state.tsx";
import Button from "../../../components/Button/Button.tsx";
import Input from "../../../components/Input/Input.tsx";
import MultipleSelect from "../../../components/MultipleSelect/MultipleSelect.tsx";
import Pagination from "../../../components/Pagination/Pagination.tsx";
import Table from "../../../components/Table/Table.tsx";
import type { Column } from "../../../components/Table/Table.types.ts";
import AddModal from "../Tools/Modals/AddModal.tsx";
import DeleteModal from "../Tools/Modals/DeleteModal.tsx";
import EditModal from "../Tools/Modals/EditModal.tsx";
import type { AllEmployeeProps, AllEmployeeTableData } from "./AllEmployee.types.ts";


const AllEmployeePage = ({}: AllEmployeeProps) => {
  //ref
  const searchRef=useRef<HTMLInputElement>(null)

  //useContext
  const {
    getData,
    // handleAddModal,
    // addModal,
    // deleteModal,
    // editModal,
    AllEmployeeTableData,
    // selected,

    //filters,
    searchValue,
    selectedFilters,
    count,
    urlFilter,
    updateUrl,
    handleUrlChange,
    handleFilterChange,
    updateSearch,
  } = useContext(AllEmployeeContext)!;

  //columnData
  const columns: Column<AllEmployeeTableData>[] = [
    { id: "name", label: "Employee Name" },
    { id: "email", label: "Employee Email" },
    { id: "role", label: "Role" },
    { id: "location", label: "Location" },
    // { id: "action", label: "Actions" },
  ];

  const handleFilter = () => {
    updateUrl(urlFilter);
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
                availFilters={["worker","owner","facilitymanager","workplacemanager","toolcribmanager", "email"]}
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

        {/* <Button primary onClick={handleAddModal}>
          Add Facility Manager
        </Button> */}
      </div>

      <div className={styles.Table}>
        <Table<AllEmployeeTableData>
          tableData={AllEmployeeTableData}
          columnData={columns}
        />
      </div>
      <Pagination
        count={count}
        setUrl={handleUrlChange}
        url={urlFilter}
        getData={getData}
      />
      {/* {addModal && <AddModal />}
      {selected && editModal && <EditModal />}
      {deleteModal && <DeleteModal />} */}
    </>
  );
};

export default withAllEmployeeContext(AllEmployeePage);
