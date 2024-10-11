import React from "react";
import { categories } from "../../utils/categories";

import "./Transaction.scss";

const Transaction = ({ _id, from, to, value, category }) => {
  return (
    <div
      className="transaction"
      style={{ "border-color": categories[category] }}
    >
      <div>
        <p className="transaction__origin">{value < 0 ? to : from}</p>
        <p
          className="transaction__category"
          style={{ color: categories[category] }}
        >
          {category}
        </p>
      </div>

      <p
        className={`transaction__value ${
          value > 0
            ? "transaction__value--positive"
            : "transaction__value--negative"
        }`}
      >
        {value}€
      </p>
    </div>
  );
};

export default Transaction;
