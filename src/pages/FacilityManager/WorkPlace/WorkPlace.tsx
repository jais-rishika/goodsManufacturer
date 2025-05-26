import { useContext, useEffect } from "react";
import Button from "../../../components/Button/Button.tsx";
import Input from "../../../components/Input/Input.tsx";
import Table from "../../../components/Table/Table.tsx";
import type { Column } from "../../../components/Table/Table.types.ts";
import type { FacilityTableData } from "../../Admin/Facility/FacilityPage/FacilityPage.types.ts";
import AddModal from "./Modals/AddModal.tsx";
import DeleteModal from "./Modals/DeleteModal.tsx";
import EditModal from "./Modals/EditModal.tsx";
import styles from "./WorkPlace.module.scss";
import type { WorkPlaceProps, WorkPlaceTableData } from "./WorkPlace.types.ts";
import { WorkPlaceContext } from "./WorkPlace.state.tsx";

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
  } = useContext(WorkPlaceContext)!;

  //columnData
  const columns: Column<WorkPlaceTableData>[] = [
    { id: "name", label: "WorkPlace Name" },
    { id: "workPlaceManagerName", label: "WorkPlace Manager Name" },
    { id: "workPlaceManagerEmail", label: "WorkPlace Manager Email" },
    { id: "action", label: "Actions" },
  ];

  //useEffect
  useEffect(() => {
    console.log("getting Data");
    getData();
  }, []);

  return (
    <div>
      <div className={styles.Top}>
        <div>
          <div className={styles.Filter}>
            <label>
              <select>
                <option value="name">Facility Name</option>
                <option value="email">Facility Location</option>
              </select>
            </label>

            <Input type="text" placeholder="search" />
            <Button primary>Filter</Button>
          </div>
        </div>

        <Button primary onClick={handleAddModal}>
          Add Facility
        </Button>
      </div>

      <div className={styles.Table}>
        <Table<WorkPlaceTableData>
          tableData={workplaceTableData}
          columnData={columns}
        />
      </div>

      {addModal && <AddModal />}
      {selected && editModal && <EditModal />}
      {deleteModal && <DeleteModal />}
    </div>
  );
};

export default WorkPlace;
