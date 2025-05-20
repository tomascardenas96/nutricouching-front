import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import "./ViandCmsCard.css";

import React from "react";
import { HOST } from "../../../api/data";

function ViandCmsCard({
  viand,
  handleModifyViandModal,
  setSelectedViand,
  openDeleteViandModal,
}) {
  const handleModifyViandModalWidthData = () => {
    handleModifyViandModal();
    setSelectedViand(viand);
  };

  return (
    <>
      <td className="cms-viand-card_name">
        <img src={`${HOST}/uploads/viands/${viand.image}`} alt="viand-image" />
        <h1>{viand.name}</h1>
        <p className="stock-amount">Unidades en stock: {viand.stock}</p>
      </td>
      <td className="cms-viand-card_price">${viand.price}</td>
      <td className="cms-viand-card_options">
        <FaRegEdit onClick={handleModifyViandModalWidthData} />
        <FaRegTrashAlt onClick={() => openDeleteViandModal(viand.viandId)} />
      </td>
    </>
  );
}

export default ViandCmsCard;
