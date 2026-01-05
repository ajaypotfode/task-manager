"use client"
import React, { useState } from "react";
// import { createRoot } from "react-dom/client";
import { AgCharts } from "ag-charts-react";
import { getData } from "@/src/startiicData";
// import { AgChartOptions} from 'ag-charts-community';

import {
  LegendModule,
  BarSeriesModule,
  CategoryAxisModule,
  LineSeriesModule,
  ModuleRegistry,
  NumberAxisModule,
  AgChartOptions
} from "ag-charts-community";

ModuleRegistry.registerModules([
  BarSeriesModule,
  CategoryAxisModule,
  LegendModule,
  LineSeriesModule,
  NumberAxisModule,
]);

const SummaryChart = () => {


  const options = {
    data: getData(),
    series: [
      {
        type: "bar",
        xKey: "day",
        yKey: "complete",
        itemStyler: ({ datum, fill, highlightState }) => {
          return {
            fill: '#6207ff',
            // datum.month === 'Jul'
            //   ? highlightState === 'highlighted-item'
            //     ? 'lime'
            // : 
            // '#f44'
            // : fill,
          };
        
        },
        // yName: "Complete",
      },
      {
        type: "bar",
        xKey: "day",
        yKey: "pending",
        itemStyler: ({ datum, fill, highlightState }) => {
          return {
            fill: '#ededed'
            // datum.month === 'Jul'
            //   ? highlightState === 'highlighted-item'
            //     ? 'lime'
            // : 
            // '#f44'
            // : fill,
          };
        },
        // yName: "Pending",
      }
      // {
      //     type: "line",
      //     xKey: "year",
      //     yKey: "portions",
      //     yName: "Portions",
      //     yKeyAxis: "ySecondary",
      // },
    ],
    axes: {
      y: {
        type: "number",
        title: {
          text: "Adults Who Eat 5 A Day (%)",
        },
        label: {
          formatter: ({ value }: { value: number }) => value,
        },
      },
      ySecondary: {
        type: "number",
        position: "right",
        title: {
          text: "Portions Consumed (Per Day)",
        },
      },
    },
  };


  return (
    <AgCharts className="w-full" options={options as AgChartOptions} />
  )
};

export default SummaryChart
