import styles from "./FacilityPage.module.scss";
import { useContext, useEffect } from "react";
import Button from "../../../../components/Button/Button.tsx";
import Input from "../../../../components/Input/Input.tsx";
import Table from "../../../../components/Table/Table.tsx";

import type { Column } from "../../../../components/Table/Table.types.ts";
import AddModal from "../Modals/AddModal.tsx";
import DeleteModal from "../Modals/DeleteModal.tsx";
import EditModal from "../Modals/EditModal.tsx";

import type { FacilityProps, FacilityTableData } from "./FacilityPage.types.ts";
import { FacilityContext, withFacilityContext } from "./FacilityPage.state.tsx";

const FacilityPage = ({}: FacilityProps) => {
  //useContext
  const {
    handleAddModal,
    getData,
    // getAvailablelFacilityManagers,
    addModal,
    deleteModal,
    editModal,
    facilityTableData,
    selected,
    // facilityManagers
  } = useContext(FacilityContext)!;

  //columnData
  const columns: Column<FacilityTableData>[] = [
    { id: "name", label: "Facility Name" },
    { id: "address", label: "Facility Address" },
    { id: "facilityManagerEmail", label: "Facility Manager Email" },
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
        <Table<FacilityTableData> tableData={facilityTableData} columnData={columns} />
      </div>

      {addModal && <AddModal/>}
      {selected && editModal && <EditModal />}
      {deleteModal && <DeleteModal />}
    </div>
  );
};

export default withFacilityContext(FacilityPage);
