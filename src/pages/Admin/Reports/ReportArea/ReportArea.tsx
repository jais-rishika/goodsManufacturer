import styles from "./ReportArea.module.scss";
import type { ReportAreaProps } from "./ReportArea.types.ts";

const ReportArea = ({ heading, data }: ReportAreaProps) => {
  return (
    <div className={styles.report}>
      <h1>{heading}</h1>
      <div className={styles.container}>
        {data.map((curr) => {
          return (
            <>
              <div>
                <h2>TOOl NAME: </h2>
                <p>{curr.toolName}</p>
                <h2>VALUE: </h2>
                <p>{curr.value}</p>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default ReportArea;
