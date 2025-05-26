import type { CardProps } from "./Card.types";
import style from "./Card.module.scss";
import image from "../../../public/vite.svg";
import { FaEdit, FaTrash } from "react-icons/fa";
import Button from "../Button/Button";

const Card = ({ id, photo, children , handleEditModal, handleDeleteModal}: CardProps) => {
  return (
    <div className={style.card}>
      <div className={style.ImgContainer}>
        <img src={image} />
      </div>
      <div className={style.Details}>{children}</div>
    </div>
  );
};

export default Card;
