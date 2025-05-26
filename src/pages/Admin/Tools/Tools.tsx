import { useContext, useEffect } from "react";
import Card from "../../../components/Card/Card.tsx";
import styles from "./Tools.module.scss";
import type { ToolsProps, ToolsDetail } from "./Tools.types.ts";
import { ToolsContext, withToolContext } from "./Tools.state.tsx";
import { FaEdit, FaTrash } from "react-icons/fa";
import Button from "../../../components/Button/Button.tsx";
import Input from "../../../components/Input/Input.tsx";
import AddModal from "./Modals/AddModal.tsx";
import EditModal from "./Modals/EditModal.tsx";
import DeleteModal from "./Modals/DeleteModal.tsx";
import image from "../../../../public/vite.svg"

const Tools = ({}: ToolsProps) => {
  const {
    toolsData,
    getData,
    handleAddModal,
    handleDeleteModal,
    handleEditModal,
    setSelected,
    addModal,
    editModal,
    deleteModal
  } = useContext(ToolsContext)!;

  useEffect(() => {
    getData();
  }, []);

  const newdata: ToolsDetail[] = [
    {
      id: "10",
      name: "Adnis",
      price: 12,
      photo:
        "https://www.google.com/search?q=image+&sca_esv=ef0fcb99cdf186c7&udm=2&biw=1600&bih=699&ei=Wz8xaI-UPKCAvr0Pjt2f2Q4&ved=0ahUKEwjPraWol7uNAxUggK8BHY7uJ-sQ4dUDCBE&uact=5&oq=image+&gs_lp=EgNpbWciBmltYWdlIDINEAAYgAQYsQMYQxiKBTIIEAAYgAQYsQMyCBAAGIAEGLEDMgUQABiABDIIEAAYgAQYsQMyCBAAGIAEGLEDMgsQABiABBixAxiDATIIEAAYgAQYsQMyBRAAGIAEMggQABiABBixA0jjE1CYEViYEXACeACQAQCYAW-gAW-qAQMwLjG4AQPIAQD4AQGYAgOgAooBwgIGEAAYBxgewgIKEAAYgAQYQxiKBZgDAIgGAZIHAzIuMaAHlAWyBwMwLjG4B3w&sclient=img#vhid=-mNI5DBCB_iEPM&vssid=mosaic",
      fineAmount: 23,
      category: "NORMAL",
      isPerishable: "false",
      returnPeriod: 4,
    },
    {
      id: "10",
      name: "Adnis",
      price: 12,
      photo:
        "https://www.google.com/search?q=image+&sca_esv=ef0fcb99cdf186c7&udm=2&biw=1600&bih=699&ei=Wz8xaI-UPKCAvr0Pjt2f2Q4&ved=0ahUKEwjPraWol7uNAxUggK8BHY7uJ-sQ4dUDCBE&uact=5&oq=image+&gs_lp=EgNpbWciBmltYWdlIDINEAAYgAQYsQMYQxiKBTIIEAAYgAQYsQMyCBAAGIAEGLEDMgUQABiABDIIEAAYgAQYsQMyCBAAGIAEGLEDMgsQABiABBixAxiDATIIEAAYgAQYsQMyBRAAGIAEMggQABiABBixA0jjE1CYEViYEXACeACQAQCYAW-gAW-qAQMwLjG4AQPIAQD4AQGYAgOgAooBwgIGEAAYBxgewgIKEAAYgAQYQxiKBZgDAIgGAZIHAzIuMaAHlAWyBwMwLjG4B3w&sclient=img#vhid=-mNI5DBCB_iEPM&vssid=mosaic",
      fineAmount: 23,
      category: "NORMAL",
      isPerishable: "false",
      returnPeriod: 4,
    },
    {
      id: "10",
      name: "Adnis",
      price: 12,
      photo:
        "https://www.google.com/search?q=image+&sca_esv=ef0fcb99cdf186c7&udm=2&biw=1600&bih=699&ei=Wz8xaI-UPKCAvr0Pjt2f2Q4&ved=0ahUKEwjPraWol7uNAxUggK8BHY7uJ-sQ4dUDCBE&uact=5&oq=image+&gs_lp=EgNpbWciBmltYWdlIDINEAAYgAQYsQMYQxiKBTIIEAAYgAQYsQMyCBAAGIAEGLEDMgUQABiABDIIEAAYgAQYsQMyCBAAGIAEGLEDMgsQABiABBixAxiDATIIEAAYgAQYsQMyBRAAGIAEMggQABiABBixA0jjE1CYEViYEXACeACQAQCYAW-gAW-qAQMwLjG4AQPIAQD4AQGYAgOgAooBwgIGEAAYBxgewgIKEAAYgAQYQxiKBZgDAIgGAZIHAzIuMaAHlAWyBwMwLjG4B3w&sclient=img#vhid=-mNI5DBCB_iEPM&vssid=mosaic",
      fineAmount: 23,
      category: "NORMAL",
      isPerishable: "false",
      returnPeriod: 4,
    },
    {
      id: "10",
      name: "Adnis",
      price: 12,
      photo:
        "https://www.google.com/search?q=image+&sca_esv=ef0fcb99cdf186c7&udm=2&biw=1600&bih=699&ei=Wz8xaI-UPKCAvr0Pjt2f2Q4&ved=0ahUKEwjPraWol7uNAxUggK8BHY7uJ-sQ4dUDCBE&uact=5&oq=image+&gs_lp=EgNpbWciBmltYWdlIDINEAAYgAQYsQMYQxiKBTIIEAAYgAQYsQMyCBAAGIAEGLEDMgUQABiABDIIEAAYgAQYsQMyCBAAGIAEGLEDMgsQABiABBixAxiDATIIEAAYgAQYsQMyBRAAGIAEMggQABiABBixA0jjE1CYEViYEXACeACQAQCYAW-gAW-qAQMwLjG4AQPIAQD4AQGYAgOgAooBwgIGEAAYBxgewgIKEAAYgAQYQxiKBZgDAIgGAZIHAzIuMaAHlAWyBwMwLjG4B3w&sclient=img#vhid=-mNI5DBCB_iEPM&vssid=mosaic",
      fineAmount: 23,
      category: "NORMAL",
      isPerishable: "false",
      returnPeriod: 4,
    },
    {
      id: "10",
      name: "Adnis",
      price: 12,
      photo:
        "https://www.google.com/search?q=image+&sca_esv=ef0fcb99cdf186c7&udm=2&biw=1600&bih=699&ei=Wz8xaI-UPKCAvr0Pjt2f2Q4&ved=0ahUKEwjPraWol7uNAxUggK8BHY7uJ-sQ4dUDCBE&uact=5&oq=image+&gs_lp=EgNpbWciBmltYWdlIDINEAAYgAQYsQMYQxiKBTIIEAAYgAQYsQMyCBAAGIAEGLEDMgUQABiABDIIEAAYgAQYsQMyCBAAGIAEGLEDMgsQABiABBixAxiDATIIEAAYgAQYsQMyBRAAGIAEMggQABiABBixA0jjE1CYEViYEXACeACQAQCYAW-gAW-qAQMwLjG4AQPIAQD4AQGYAgOgAooBwgIGEAAYBxgewgIKEAAYgAQYQxiKBZgDAIgGAZIHAzIuMaAHlAWyBwMwLjG4B3w&sclient=img#vhid=-mNI5DBCB_iEPM&vssid=mosaic",
      fineAmount: 23,
      category: "NORMAL",
      isPerishable: "false",
      returnPeriod: 4,
    },
  ];
  return (
    <>
      <div className={styles.Top}>
        <div>
          <div className={styles.Filter}>
            <label>
              <select>
                <option value="name">Tool Name</option>
                <option value="special">Special</option>
                <option value="normal">Normal</option>
                <option value="isPerishable">IsPerishable</option>
              </select>
            </label>

            <Input type="text" placeholder="search" />
            <div className={styles.PriceFilter}>
              <Input placeholder="MinPrice" type="number" min={1} className={styles.Price} />
              <Input placeholder="MaxPrice" type="number" className={styles.Price}/>
            </div>
            <Button primary>Filter</Button>
          </div>
        </div>

        <Button primary onClick={handleAddModal}>
          Add Tool
        </Button>
      </div>
      <div className={styles.ToolsCard}>
        {toolsData.length>0 && toolsData.map((data: (ToolsDetail)) => (
          <Card
            id={data.id}
            photo={image}
            handleDeleteModal={handleDeleteModal}
            handleEditModal={handleEditModal}
          >
            <p>
              <span>Name:</span>
              <span>{data.name}</span>
            </p>
            <p>
              <span>Price:</span>
              <span>{data.price}</span>
            </p>
            <p>
              <span>Fine:</span>
              <span>{data.fineAmount}</span>
            </p>
            {!data.isPerishable && <p>
              <span>Return Period:</span>
              <span>{data.returnPeriod}</span>
            </p>}
            <p>
              <span>Category:</span>
              <span>{data.category}</span>
            </p>
            <p>
              <span>Perishable:</span>
              <span>{data.isPerishable?"YES":"NO"}</span>
            </p>
            <div className={styles.ToolActions}>
              <Button
                primary
                onClick={() => {
                  setSelected(data);
                  handleEditModal();
                }}
              >
                <FaEdit />
              </Button>
              <Button
                danger
                onClick={() => {
                  setSelected(data);
                  handleDeleteModal();
                }}
              >
                <FaTrash />
              </Button>
            </div>
          </Card>
        ))}
      </div>
      {addModal && <AddModal/>}
      {editModal && <EditModal/>}
      {deleteModal && <DeleteModal/>}
    </>
  );
};

export default withToolContext(Tools);
