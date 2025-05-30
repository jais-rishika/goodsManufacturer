import { useContext, useEffect, useRef } from "react";
import Button from "../../../components/Button/Button.tsx";
import Input from "../../../components/Input/Input.tsx";
import Table from "../../../components/Table/Table.tsx";
import type { Column } from "../../../components/Table/Table.types.ts";
import AddModal from "./Modals/AddModal.tsx";
import DeleteModal from "./Modals/DeleteModal.tsx";
import EditModal from "./Modals/EditModal.tsx";
import styles from "./WorkPlace.module.scss";
import type { WorkPlaceProps, WorkPlaceTableData } from "./WorkPlace.types.ts";
import { withWorkPlace, WorkPlaceContext } from "./WorkPlace.state.tsx";
import MultipleSelect from "../../../components/MultipleSelect/MultipleSelect.tsx";
import Pagination from "../../../components/Pagination/Pagination.tsx";

const WorkPlace = ({}: WorkPlaceProps) => {
  //useContext
  const {
    handleAddModal,
    getData,
    addModal,
    deleteModal,
    editModal,
    workplaceTableData,
    selected,

    //filters,
    searchValue,
    selectedFilters,
    count,
    urlFilter,
    handleUrlChange,
    handleFilterChange,
    updateSearch,
  } = useContext(WorkPlaceContext)!;

  //ref
  const searchRef = useRef<HTMLInputElement>(null);

  //columnData
  const columns: Column<WorkPlaceTableData>[] = [
    { id: "name", label: "WorkPlace Name" },
    { id: "workplaceManagerName", label: "WorkPlace Manager Name" },
    { id: "workplaceManagerEmail", label: "WorkPlace Manager Email" },
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
            <Button primary onClick={handleFilter}>
              Filter
            </Button>
          </div>
        </div>

        <Button primary onClick={handleAddModal}>
          Add WorkPlace
        </Button>
      </div>
      <div className={styles.Table}>
        <Table<WorkPlaceTableData>
          tableData={workplaceTableData}
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

export default withWorkPlace(WorkPlace);
