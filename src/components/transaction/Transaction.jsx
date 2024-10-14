import React from "react";
import { categories } from "../../utils/categories";
import carIcon from "../../assets/icons/car.svg";

import "./Transaction.scss";

const Transaction = ({ _id, from, to, value, category }) => {
  return (
    <div className="transaction" style={{ borderColor: categories[category] }}>
      <div className="transaction__container">
        <div
          className="transaction__icon"
          style={{ backgroundColor: categories[category] }}
        >
          <img src={carIcon} alt="transaction icon" />
        </div>

        <div>
          <p className="transaction__origin">{value < 0 ? to : from}</p>
          <p
            className="transaction__category"
            style={{ color: categories[category] }}
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
