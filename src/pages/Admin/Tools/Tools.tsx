import { useContext, useEffect, useRef, type ChangeEvent } from "react";
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
import MultipleSelect from "../../../components/MultipleSelect/MultipleSelect.tsx";
import Pagination from "../../../components/Pagination/Pagination.tsx";
import image from "../../../../public/No_Image_Available.jpg"


const Tools = ({}: ToolsProps) => {
  //ref
  const searchRef = useRef<HTMLInputElement>(null);

  const {
    getData,
    setSelected,
    handleDeleteModal,
    handleEditModal,
    handleAddModal,
    toolsData,
    addModal,
    editModal,
    deleteModal,

    //filters,
    updateUrl,
    searchValue,
    selectedFilters,
    count,
    urlFilter,
    handleUrlChange,
    handleFilterChange,
    updateSearch,
    updateMaxPrice,
    updateMinPrice,
  } = useContext(ToolsContext)!;

  const handleFilter = () => {
    updateUrl(urlFilter);
  };

  const handleMinPrice = (e: ChangeEvent<HTMLInputElement>) => {
    
    const val = +e.target.value;
    console.log(val);
    if (val < 1) {
      alert("Min value can't be less than 1");
      e.target.value=""
    } else {
      updateMinPrice(val);
    }
  };
  const handleMaxPrice = (e: ChangeEvent<HTMLInputElement>) => {
    const val = +e.target.value;
    if (val < 1) {
      alert("Max value can't be less than 1");
      e.target.value="";
    } else {
      updateMaxPrice(val);
    }
  };

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
                availFilters={["name", "special", "normal", "isPerishable"]}
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

            <div className={styles.PriceFilter}>
              <Input
                placeholder="MinPrice"
                type="number"
                min={1}
                onChange={handleMinPrice}
                className={styles.Price}
              />
              <Input
                placeholder="MaxPrice"
                type="number"
                min={1}
                onChange={handleMaxPrice}
                className={styles.Price}
              />
            </div>
            <Button primary onClick={handleFilter}>
              Filter
            </Button>
          </div>
        </div>

        <Button primary onClick={handleAddModal}>
          Add Tool
        </Button>
      </div>
      <div className={styles.ToolsCard}>
        {toolsData.length > 0 &&
          toolsData.map((data: ToolsDetail) => {
            return (
              <Card id={data.id} photo={data.toolImageUrl || image}>
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
                {!data.isPerishable && (
                  <p>
                    <span>Return Period:</span>
                    <span>{data.returnPeriod}</span>
                  </p>
                )}
                <p>
                  <span>Category:</span>
                  <span>{data.category}</span>
                </p>
                <p>
                  <span>Perishable:</span>
                  <span>{data.isPerishable ? "YES" : "NO"}</span>
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
            );
          })}
      </div>
      <Pagination
        count={count}
        setUrl={handleUrlChange}
        url={urlFilter}
        getData={getData}
      />
      {addModal && <AddModal />}
      {editModal && <EditModal />}
      {deleteModal && <DeleteModal />}
    </>
  );
};

export default withToolContext(Tools);
