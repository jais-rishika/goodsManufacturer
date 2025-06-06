import { useContext, useEffect } from "react";
import ReportArea from "../ReportArea/ReportArea";
import styles from "./ReportPage.module.scss";
import { ReportContext, withReportContext } from "./ReportPage.state";
const ReportPage = () => {
  const {
    getTopDemand,
    getTopBroken,
    getTopPriced,
    topDemand,
    topBroken,
    topPriced,
  } = useContext(ReportContext)!
 
  useEffect(() => {
    getTopDemand()
    getTopBroken()
    getTopPriced()
  }, []);

  return (
    <div className={styles.reports}>
      <ReportArea
        heading="Top 3 Tools in Demand"
        getData={getTopDemand}
        data={topDemand}
      ></ReportArea>

      <ReportArea
        heading="Top 3 Broken Tools"
        getData={getTopBroken}
        data={topBroken}
      ></ReportArea>

      <ReportArea
        heading="Highest Priced Tools"
        getData={getTopPriced}
        data={topPriced}
      ></ReportArea>
    </div>
  );
};

export default withReportContext(ReportPage);
