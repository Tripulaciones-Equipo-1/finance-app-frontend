import React from "react";
import { categories } from "../../utils/categories";
import carIcon from "../../assets/icons/car.svg";

import "./Transaction.scss";

const Transaction = ({ _id, concept, value, category }) => {
  return (
    <div
      className="transaction"
      style={{ borderColor: categories[category].color }}
    >
      <div className="transaction__container">
        <div
          className="transaction__icon"
          style={{ backgroundColor: categories[category].color }}
        >
          <img src={categories[category].icon} alt="transaction icon" />
        </div>

        <div>
          <p className="transaction__origin">{concept}</p>
          <p
            className="transaction__category"
            style={{ color: categories[category].color }}
          >
            {category}
          </p>
        </div>
      </div>

      <p
        className={`transaction__value ${
          value > 0
            ? "transaction__value--positive"
            : "transaction__value--negative"
        }`}
      >
        {value.toLocaleString("en", { useGrouping: true })}€
      </p>
    </div>
  );
};

export default Transaction;
