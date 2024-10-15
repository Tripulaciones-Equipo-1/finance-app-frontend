import React from "react";
import { months } from "../../utils/months";

import "./MonthCard.scss";

const MonthCard = ({ year, month, data, handleClick }) => {
  const income = data.income.reduce((acc, trans) => acc + trans.value, 0);
  const costs = data.costs.reduce((acc, trans) => acc + trans.value, 0);
  const dif = income + costs;

  return (
    <div onClick={() => handleClick(data)} className="month-card">
      <div className="month-card__header">
        <p>
          {months[month - 1]} {year}
        </p>

        <p
          className={`month-card__dif month-card__dif${
            dif > 0 ? "--income" : "--cost"
          }`}
        >
          {dif}€
        </p>
      </div>

      <div className="month-card__data">
        <p>
          Ingresos: <span className="month-card__income">{income}€</span>
        </p>
        <p>
          Gastos: <span className="month-card__costs">{costs}€</span>
        </p>
      </div>
    </div>
  );
};

export default MonthCard;
