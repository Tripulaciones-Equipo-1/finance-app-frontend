import React from "react";
import { months } from "../../utils/months";

import "./MonthCard.scss";

const MonthCard = ({ year, month, data }) => {
  const income = data.positive.reduce((acc, trans) => acc + trans.value, 0);
  const costs = data.costs.reduce((acc, trans) => acc + trans.value, 0);
  const dif = income + costs;

  return (
    <div className="month-card">
      <div className="month-card__header">
        <p>
          {months[month - 1]} {year}
        </p>

        <p className="">{dif}€</p>
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
