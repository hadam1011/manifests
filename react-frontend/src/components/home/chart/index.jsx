import React, { useEffect, useState } from "react";
import ReactApexChart from 'react-apexcharts'
import { convertToSeriesData, fileterUsername } from "../../../utils";

const ColumnChart = (props) => {
    const { state } = props;

    const [data, setData] = useState({
        series: [
            convertToSeriesData('databases', state.data),
            convertToSeriesData('metrics', state.data),
            convertToSeriesData('queries', state.data),
        ],
        options: {
            chart: {
              type: 'bar',
              height: 350
            },
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
              },
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              show: true,
              width: 2,
              colors: ['transparent']
            },
            xaxis: {
              categories: fileterUsername(state.data),
            },
            fill: {
              opacity: 1
            },
        },
    })

    useEffect(() => {
        setData({
            ...data,
            series: [
                convertToSeriesData('databases', state.data),
                convertToSeriesData('metrics', state.data),
                convertToSeriesData('queries', state.data),
            ],
        })
    }, [state.data])

    return (
        <div>
          <div id="chart">
            <ReactApexChart options={data.options} series={data.series} type="bar" height={350} />
          </div>
          <div id="html-dist"></div>
        </div>
      );
}

export default ColumnChart;