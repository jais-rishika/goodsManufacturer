import type { CardProps } from "./Card.types";
import style from "./Card.module.scss";

const Card = ({ children, id, name, price, point ,src ,actions ,qty}: CardProps) => {
    
  return (
    <div className={style.card}>
      {actions}
      <div className={style.imgContainer}>
        <img src={src}/>
      </div>
      <div className={style.details}>
        
      </div>
    </div>
  );
};

export default Card;
