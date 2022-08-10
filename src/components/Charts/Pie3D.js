import React from 'react';
// Include the react-fusioncharts component
import ReactFC from 'react-fusioncharts';
// Include the fusioncharts library
import FusionCharts from 'fusioncharts';
// Include the chart type
import Chart from 'fusioncharts/fusioncharts.charts';
// Include the theme as fusion
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

const Pie3D = ({ chartData }) => {
  // console.log(chartData);
  const chartConfigs = {
    type: 'pie3d', // The chart type
    width: '100%', // Width of the chart
    height: '400', // Height of the chart
    dataFormat: 'json', // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        //Set the chart caption
        caption: 'Languages',
        //Set the chart subcaption
        subCaption: 'Languages used in repo projects',
        pieRadius: '30%',
        theme: 'fusion',
      },
      // Chart Data
      data: chartData,
    },
  };
  return <ReactFC {...chartConfigs} />;
};

export default Pie3D;
