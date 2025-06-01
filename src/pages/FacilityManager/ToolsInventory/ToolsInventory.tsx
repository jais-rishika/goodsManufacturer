import { useContext, useEffect, useRef, type ChangeEvent } from "react";
import Button from "../../../components/Button/Button.tsx";
import Card from "../../../components/Card/Card.tsx";
import Input from "../../../components/Input/Input.tsx";
import type { ToolsDetail } from "../../Admin/Tools/Tools.types.ts";
import styles from "./ToolsInventory.module.scss";
import type { ToolInventoryDetail, ToolsInventoryProps } from "./ToolsInventory.types.ts";
import {
  ToolInventoryContext,
  withToolInventory,
} from "./ToolsInventory.state.tsx";
import image from "../../../../public/vite.svg";
import Pagination from "../../../components/Pagination/Pagination.tsx";
import MultipleSelect from "../../../components/MultipleSelect/MultipleSelect.tsx";
import { hideLoader, showLoader } from "../../../components/Loader/Loader.tsx";
import SendToolModal from "./Modal/SendToolModal.tsx";

const ToolsInventory = ({}: ToolsInventoryProps) => {
  //ref
  const searchRef = useRef<HTMLInputElement>(null);

  const {
    ToolInventoryData,
    sendToolModal,
    showSendToolModal,
    getData,
    setSelected,
    //filters,
    searchValue,
    selectedFilters,
    count,
    urlFilter,
    handleUrlChange,
    handleFilterChange,
    updateSearch,
    updateMaxPrice,
    updateMinPrice,
  } = useContext(ToolInventoryContext)!;

  const handleFilter = () => {
    getData(urlFilter);
  };

  const handleMinPrice = (e: ChangeEvent<HTMLInputElement>) => {
    const val = +e.target.value;
    console.log(val);
    if (val < 1) {
      alert("Min value can't be less than 1");
      e.target.value = "";
    } else {
      updateMinPrice(val);
    }
  };
  const handleMaxPrice = (e: ChangeEvent<HTMLInputElement>) => {
    const val = +e.target.value;
    if (val < 1) {
      alert("Max value can't be less than 1");
      e.target.value = "";
    } else {
      updateMaxPrice(val);
    }
  };
  const handleSendToolModal=(data: ToolInventoryDetail)=>{
    setSelected(data)
    showSendToolModal()
  }

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
      </div>
      <div className={styles.ToolsCard}>
        {ToolInventoryData.length > 0 &&
          ToolInventoryData.map((data: ToolsDetail,idx) => (
            <Card id={data.id} photo={image}>
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
              <p>
                <span>Total:</span>
                <span>{data.isPerishable ? "YES" : "NO"}</span>
              </p>

              {/* //remove later */}
              <hr></hr>
              <div>
                <p>
                  <span>Allocated:</span>
                  <span>{data.isPerishable ? "YES" : "NO"}</span>
                </p>
                <p>
                  <span>Pending:</span>
                  <span>{data.isPerishable ? "YES" : "NO"}</span>
                </p>
                <p>
                  <span>Broken:</span>
                  <span>{data.isPerishable ? "YES" : "NO"}</span>
                </p>
              </div>
              <Button primary onClick={()=>handleSendToolModal(ToolInventoryData[idx])}>
                Send Tool
              </Button>
            </Card>
          ))}
      </div>
      <Pagination
        count={count}
        setUrl={handleUrlChange}
        url={urlFilter}
        getData={getData}
      />
      {sendToolModal && <SendToolModal />}
    </>
  );
};

export default withToolInventory(ToolsInventory);
