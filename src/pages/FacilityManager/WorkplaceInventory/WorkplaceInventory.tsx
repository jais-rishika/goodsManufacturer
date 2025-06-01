import { useContext, useEffect } from "react";
import Button from "../../../components/Button/Button.tsx";
import Card from "../../../components/Card/Card.tsx";
import Input from "../../../components/Input/Input.tsx";
import styles from "./WorkplaceInventory.module.scss";
import type {
  WorkplaceInventoryProps,
  WorkplaceInventoryDetail,
} from "./WorkplaceInventory.types.ts";
import {
  withWorkplaceInventory,
  WorkplaceInventoryContext,
} from "./WorkplaceInventory.state.tsx";
import Pagination from "../../../components/Pagination/Pagination.tsx";
import MultipleSelect from "../../../components/MultipleSelect/MultipleSelect.tsx";
import { useParams } from "react-router";



const WorkplaceInventory = ({}: WorkplaceInventoryProps) => {  
  const param=useParams();
  
  const {
    ToolInventoryData,
    getData,
    
    //filters,
    updateUrl,
    searchValue,
    selectedFilters,
    count,
    urlFilter,
    handleUrlChange,
    handleFilterChange,
    updateSearch,
  } = useContext(WorkplaceInventoryContext)!;

  const handleFilter = () => {
    updateUrl(urlFilter);
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
                availFilters={["filterLowStock"]}
                getData={getData}
                url={urlFilter}
              />
            </label>

            <Input
              type="text"
              placeholder="search"
              defaultValue={searchValue}
              onChange={(e) => updateSearch(e.target.value)}
            />
      
            <Button primary onClick={handleFilter}>
              Filter
            </Button>
          </div>
        </div>
      </div>
      <div className={styles.ToolsCard}>
        {ToolInventoryData.length > 0 ?
          ToolInventoryData.map((data: WorkplaceInventoryDetail) => (
            <Card id={data.toolId} photo={data.toolImageUrl}>
              <p>
                <span>Name:</span>
                <span>{data.toolName}</span>
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
                <span>{data.toolCategory}</span>
              </p>
              <p>
                <span>Perishable:</span>
                <span>{data.isPerishable ? "YES" : "NO"}</span>
              </p>
              <p>
                <span>Total:</span>
                <span>{data.totalQuantity}</span>
              </p>

              <div>
                <p>
                  <span>Allocated:</span>
                  <span>
                    {data.totalQuantity -
                    data.availableQuantity -
                    data.brokenQuantity
                      ? data.brokenQuantity
                      : 0}
                  </span>
                </p>
                <p>
                  <span>Pending:</span>
                  <span>{data.availableQuantity}</span>
                </p>
                <p>
                  <span>Broken:</span>
                  <span>{data.brokenQuantity ? data.brokenQuantity : 0}</span>
                </p>
              </div>
            </Card>
          )):(
            <h1 className={styles.empty}>No Tool In The Inventory</h1>
          )}
      </div>
        <Pagination
          count={count}
          setUrl={handleUrlChange}
          url={urlFilter}
          getData={getData}
          paramId={param.id}
        />
    </>
  );
};

export default withWorkplaceInventory(WorkplaceInventory);
