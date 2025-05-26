import { useContext, useEffect } from "react";
import Button from "../../../components/Button/Button.tsx";
import Input from "../../../components/Input/Input.tsx";
import Table from "../../../components/Table/Table.tsx";
import type { Column } from "../../../components/Table/Table.types.ts";
import type { FacilityManagerTableData } from "../../Admin/FacilityManager/FacilityManagerPage/FacilityManagerPage.types.ts";
import AddModal from "./Modals/AddModal.tsx";
import DeleteModal from "./Modals/DeleteModal.tsx";
import EditModal from "./Modals/EditModal.tsx";
import styles from "./WorkPlaceManager.module.scss";
import { withWorkPlaceManagerContext, WorkPlaceManagerContext } from "./WorkPlaceManager.state.tsx";
import type { WorkPlaceManagerProps, WorkPlaceManagerTableData } from "./WorkPlaceManager.types.ts";

const WorkPlaceManager = ({}: WorkPlaceManagerProps) => {

  //useContext
  const {
    handleAddModal,
    getData,
    addModal,
    deleteModal,
    editModal,
    workPlaceManagerTableData,
    selected,
  } = useContext(WorkPlaceManagerContext)!;

  //columnData
  const columns: Column<WorkPlaceManagerTableData>[] = [
    { id: "name", label: "Workplace Manager Name" },
    { id: "email", label: "Workplace Manager Email" },
    { id: "createdAt", label: "Joined ON" },
    { id: "workPlaceName", label: "WorkPlace" },
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
                <option value="email">Facility Manager Email</option>
              </select>
            </label>

            <Input type="text" placeholder="search" />
            <Button primary>Filter</Button>
          </div>
        </div>

        <Button primary onClick={handleAddModal}>
          Add Facility Manager
        </Button>
      </div>

      <div className={styles.Table}>
        <Table<WorkPlaceManagerTableData>
          tableData={workPlaceManagerTableData}
          columnData={columns}
        />
      </div>

      {addModal && <AddModal />}
      {selected && editModal && <EditModal />}
      {deleteModal && <DeleteModal />}
    </div>
  );
};

export default withWorkPlaceManagerContext(WorkPlaceManager);
