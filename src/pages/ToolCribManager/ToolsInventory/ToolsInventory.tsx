import { useContext, useEffect } from "react";
import Button from "../../../components/Button/Button.tsx";
import Card from "../../../components/Card/Card.tsx";
import Input from "../../../components/Input/Input.tsx";
import styles from "./ToolsInventory.module.scss";
import type {
  ToolInventoryDetail,
  ToolsInventoryProps,
} from "./ToolsInventory.types.ts";
import {
  ToolInventoryContext,
  withToolInventory,
} from "./ToolsInventory.state.tsx";
import Pagination from "../../../components/Pagination/Pagination.tsx";
import MultipleSelect from "../../../components/MultipleSelect/MultipleSelect.tsx";
import image from "../../../../public/No_Image_Available.jpg"

const ToolsInventory = ({}: ToolsInventoryProps) => {
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
  } = useContext(ToolInventoryContext)!;

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
                availFilters={[
                  "name",
                  "special",
                  "normal",
                  "isPerishable",
                  "notPerishable",
                ]}
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
        {ToolInventoryData.length > 0 &&
          ToolInventoryData.map((data: ToolInventoryDetail) => (
            <Card id={data.toolId} photo={data.toolImageUrl || image}>
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

              <div className={styles.Line}></div>
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
          ))}
      </div>
      <Pagination
        count={count}
        setUrl={handleUrlChange}
        url={urlFilter}
        getData={getData}
      />
    </>
  );
};

export default withToolInventory(ToolsInventory);
