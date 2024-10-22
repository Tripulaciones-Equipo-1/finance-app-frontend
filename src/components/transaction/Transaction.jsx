import React from "react";
import { categories } from "../../utils/categories";

import "./Transaction.scss";

const Transaction = ({ _id, concept, value, category, date }) => {
  const [_, month, day] = date.split(/[-T:. ]/);
  const { color, icon } = categories[category] || categories["Otros"];

  return (
    <a
      href={`/transaction/${_id}`}
      className="transaction"
      style={{ borderColor: color }}
    >
      <div className="transaction__container">
        <div className="transaction__icon" style={{ backgroundColor: color }}>
          <img src={icon} alt="transaction icon" />
        </div>

        <p className="transaction__date">
          {day}/{month}
        </p>

        <p className="transaction__concept">{concept}</p>
      </div>

      <p
        className={`transaction__value ${
          value > 0
            ? "transaction__value--positive"
            : "transaction__value--negative"
        }`}
      >
        {value.toLocaleString("es", {
          useGrouping: true,
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
        €
      </p>
    </a>
  );
};

export default Transaction;
