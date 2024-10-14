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

  const transactionsArray = [
    {
      _id: "670d4ef568b07e6365b2b7a5",
      to: "hora diferente",
      value: -111000,
      category: "Coche",
      account: "67095bf2c8ff5febb9e401b8",
      date: "2024-10-14 ",
      hour: "19:03:49",
      createdAt: "2024-10-14T17:03:49.504Z",
      updatedAt: "2024-10-14T17:03:49.504Z",
      __v: 0,
    },
    {
      _id: "670d4f490f8cfdb5c9b8684c",
      to: "hora diferente",
      value: -111000,
      category: "Salud",
      account: "67095bf2c8ff5febb9e401b8",
      date: "2024-10-14  19:05:13",
      createdAt: "2024-10-14T17:05:13.798Z",
      updatedAt: "2024-10-14T17:05:13.798Z",
      __v: 0,
    },
    {
      _id: "670d4f59206e650a87332029",
      to: "hora diferente",
      value: -111000,
      category: "Ocio",
      account: "67095bf2c8ff5febb9e401b8",
      date: "2024-10-14 19:05:29",
      createdAt: "2024-10-14T17:05:29.444Z",
      updatedAt: "2024-10-14T17:05:29.444Z",
      __v: 0,
    },
    {
      _id: "670d4f900de96223529f0e24",
      to: "hora diferente",
      value: -111000,
      category: "Ocio",
      account: "67095bf2c8ff5febb9e401b8",
      date: "2024-10-14 19:06:24",
      __v: 0,
    },
    {
      _id: "670d4fa80de96223529f0e2d",
      to: "hora diferente",
      value: -111000,
      category: "Salud",
      account: "67095bf2c8ff5febb9e401b8",
      date: "2024-10-14 19:06:48",
      __v: 0,
    },
  ];

  const CategoryObject = category_amount(transactionsArray);

  const colors = Object.keys(CategoryObject).map((cat) => {
    return categories[cat];
  });

  const data = {
    //Object.keys(ct)
    labels: Object.keys(CategoryObject),
    datasets: [
      {
        label: "",
        // Object.values(ct)
        data: Object.values(CategoryObject),
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
