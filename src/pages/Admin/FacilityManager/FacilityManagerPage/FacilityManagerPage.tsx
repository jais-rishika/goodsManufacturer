import styles from "./FacilityManagerPage.module.scss";
import { useContext, useEffect } from "react";
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

const FacilityManagerPage = ({}: FacilityManagerProps) => {
  //useContext
  const {
    handleAddModal,
    handleEditModal,
    handleDeleteModal,
    getData,
    addModal,
    deleteModal,
    editModal,
    facilityManagerTableData,
    selected
  } = useContext(FacilityManagerContext)!;

  //columnData
  const columns: Column<FacilityManagerTableData>[] = [
    { id: "name", label: "Facility Manager Name" },
    { id: "email", label: "Facility Manager Email" },
    { id: "createdAt", label: "Joined ON" },
    { id: "facilityName", label: "Facility" },
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
        <Table<FacilityManagerTableData> tableData={facilityManagerTableData} columnData={columns} />
      </div>

      {addModal && <AddModal handleModal={handleAddModal} updateData={getData} />}
      {selected && editModal && <EditModal handleModal={handleEditModal} updateData={getData} id={selected?.id} name={selected?.name} email={selected?.email}/>}
      {deleteModal && <DeleteModal handleModal={handleDeleteModal} updateData={getData} id={selected?.id}/>}
    </div>
  );
};

export default withFacilityManagerContext(FacilityManagerPage);
