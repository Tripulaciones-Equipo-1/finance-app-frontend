import React from "react";
import "./GraphicDoughnut.scss";

import Chart from "chart.js/auto";
import { Pie } from "react-chartjs-2";
import { categories } from "../../utils/categories";

const GraphicDoughnut = ({ transactionsList }) => {
  const category_amount = (transactions) => {
    let res = {};

    transactions.map((transaction) => {
      if (!res[transaction.category]) {
        res[transaction.category] = 0;
      }

      res[transaction.category] += transaction.value;
    });

    return res;
  };

  const categoryObject = category_amount(transactionsList);

  const colors = Object.keys(categoryObject).map((cat) => {
    return categories[cat].color;
  });

  const data = {
    //Object.keys(ct)
    labels: Object.keys(categoryObject),
    datasets: [
      {
        label: "",
        // Object.values(ct)
        data: Object.values(categoryObject),
        backgroundColor: colors,
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="anual-donut">
      <Pie data={data} />
    </div>
  );
};

export default GraphicDoughnut;
