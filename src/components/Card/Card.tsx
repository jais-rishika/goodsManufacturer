import type { CardProps } from "./Card.types";
import style from "./Card.module.scss";

const Card = ({photo, children}: CardProps) => {
  return (
    <div className={style.card}>
      <div className={style.ImgContainer}>
        <img src={photo} />
      </div>
      <div className={style.Details}>{children}</div>
    </div>
  );
};

export default Card;
