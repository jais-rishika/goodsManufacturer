import { useContext, useEffect, useRef, type ChangeEvent } from "react";
import Button from "../../../components/Button/Button.tsx";
import Card from "../../../components/Card/Card.tsx";
import Input from "../../../components/Input/Input.tsx";
import styles from "./ToolsInventory.module.scss";
import type {
  ReqTable,
  ToolInventoryDetail,
  ToolsInventoryProps,
} from "./ToolsInventory.types.ts";
import {
  ToolInventoryContext,
  withToolInventory,
} from "./ToolsInventory.state.tsx";
import Pagination from "../../../components/Pagination/Pagination.tsx";
import MultipleSelect from "../../../components/MultipleSelect/MultipleSelect.tsx";
import Table from "../../../components/Table/Table.tsx";
import type { Column } from "../../../components/Table/Table.types.ts";
import { sendToolReq } from "../../../services/Requests.service.ts";
import { useNavigate } from "react-router";
import ReqToolModal from "./Modal/ReqToolModal.tsx";
import { toast } from "react-toastify";

const ToolsInventory = ({}: ToolsInventoryProps) => {
  const navigate = useNavigate();
  //ref
  const removeRef = useRef<HTMLInputElement>(null);

  const {
    ToolInventoryData,
    reqToolModal,
    reqTableData,
    showReqToolModal,
    getData,
    setSelected,
    updateReqTable,

    //filters,
    searchValue,
    selectedFilters,
    count,
    urlFilter,
    updateUrl,
    handleUrlChange,
    handleFilterChange,
    updateSearch,
    updateMaxPrice,
    updateMinPrice,
  } = useContext(ToolInventoryContext)!;

  const handleFilter = () => {
    updateUrl(urlFilter);
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

  const handleReqToolModal = (data: ToolInventoryDetail) => {
    setSelected(data);
    showReqToolModal();
  };

  useEffect(() => {
    getData(urlFilter);
  }, []);

  //right Half
  useEffect(() => {
    const data = JSON.parse(
      localStorage.getItem("reqTable") || JSON.stringify([])
    );
    updateReqTable(data);
  }, []);

  const columns: Column<ReqTable>[] = [
    { id: "id", label: "Item ID." },
    { id: "name", label: "Tool Name" },
    { id: "qty", label: "Quantity" },
  ];

  const removeItem = () => {
    const ref = removeRef.current as HTMLInputElement;
    const itemId = ref.value;
    const newTable = [...reqTableData];
    const reqIndex = newTable.findIndex((val) => val.id === itemId);
    newTable.splice(reqIndex, 1);
    updateReqTable(newTable);
  };

  const sendReq = async () => {
    const payload = reqTableData.map((row) => {
      return {
        toolId: row.id,
        reqQuantity: row.qty,
      };
    });
    const obj = { items: payload };
    console.log(payload);

    try {
      const res = await sendToolReq(obj);
      toast.success("Request Added");
      localStorage.removeItem("reqTable")
      navigate("/worker/requests");
    } catch (error) {
      toast.error("Request Failed");
    }
  };
  return (
    <>
      <div className={styles.MainContainer}>
        <div>
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
              ToolInventoryData.map((data: ToolInventoryDetail) => (
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

                  {/* //remove later */}
                  <hr></hr>
                  <div>
                    <p>
                      <span>Allocated:</span>
                      <span>{data.totalQuantity - data.availableQuantity - data.brokenQuantity?data.brokenQuantity:0}</span>
                    </p>
                    <p>
                      <span>Pending:</span>
                      <span>{data.availableQuantity}</span>
                    </p>
                    <p>
                      <span>Broken:</span>
                      <span>{data.brokenQuantity?data.brokenQuantity:0}</span>
                    </p>
                  </div>
                  <Button primary onClick={() => handleReqToolModal(data)}>
                    REQ Tool
                  </Button>
                </Card>
              ))}
            <Pagination
              count={count}
              setUrl={handleUrlChange}
              url={urlFilter}
              getData={getData}
            />
          </div>
        </div>

        <div className={styles.Request}>
          <div className={styles.RemoveReq}>
            <Input
              placeholder="Remove item id."
              type="number"
              ref={removeRef}
            />
            <Button danger onClick={removeItem}>
              Remove
            </Button>
          </div>
          <Table<ReqTable> columnData={columns} tableData={reqTableData}>
            <tr>
              <td colSpan={3}>
                <Button onClick={sendReq}>Send REQ</Button>
              </td>
            </tr>
          </Table>
        </div>
      </div>
      {reqToolModal && <ReqToolModal />}
    </>
  );
};

export default withToolInventory(ToolsInventory);
