/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";
import ChartWrapper from "./Chart.style";

const DonutChart = ({ className }) => {
  const chartRef = useRef(null);
  const refreshMode = () => {
    if (!chartRef?.current) {
      return;
    }
    const chart = new ApexCharts(chartRef?.current, getChartOptions());
    if (chart !== undefined) {
      setTimeout(() => {
        chart?.render();
      }, 1000);
    }
    return chart;
  };

  useEffect(() => {
    const chart = refreshMode();
    return () => {
      if (chart !== undefined) {
        setTimeout(() => {
          chart?.destroy();
        }, 1000);
      }
    };
  }, [chartRef]);

  return (
    <ChartWrapper>
      <div className={`card ${className}`} style={{ height: "550px" }}>
        <div className="card-header border-0 pt-6 px-6">
          <h3 className="card-title align-items-start flex-column"></h3>
        </div>
        <div className="card-body p-0 ps-6">
          <div
            ref={chartRef}
            id="kt_donut_chart_widget"
            className="chart-container"
            // style={{ height: '450px' }}
          ></div>
        </div>
      </div>
    </ChartWrapper>
  );
};

export { DonutChart };

function getChartOptions() {
  const labelColor = "#ffffff";
  return {
    series: [44, 55, 41, 17, 15],
    labels: ["Arts", "Commerce", "Science", "Management", "IT"],
    legend: {
      show: true,
      position: "left",
      itemMargin: {
        horizontal: 0,
        vertical: 10,
      },
      offsetX: 0,
      offsetY: 0,
      labels: {
        colors: "#ffffff",
        useSeriesColors: false,
      },
      // formatter: function (val: any, opts: any) {
      // 	return (val ? t(val) : val) + " : " + graphData[opts.seriesIndex]
      // }
      formatter: function (val) {
        return '<span class="w-275px d-inline-block ms-2">' + val + "</span>";
      },
    },
    chart: {
      fontFamily: "inherit",
      type: "pie",
      defaultLocale: "en",
      height: 550,
      // offsetX: 80,
      offsetY: 0,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "65%",
        },
      },
    },
    responsive: [
      {
        breakpoint: 1000,
        options: {
          chart: {
            width: 300,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    colors: ["#1a75ff", "#999900", "#F18137", "#006666", "#3bb0de"],
    // ['#006666', '#FBBE22', '#3bb0de', '#ff4d6a', '#990099', '#a52a2a', '#1a75ff', '#DD3434', '#ace600', '#F18137', '#50CD89', '#999900'],
    xaxis: {
      labels: {
        style: {
          colors: labelColor,
          fontSize: "11px",
        },
        formatter: function (val) {
          return val;
        },
      },
    },
    yaxis: {
      labels: {
        align: "left",
        style: {
          colors: "#ffffff",
        },
      },
    },
    tooltip: {
      style: {
        fontSize: "12px",
      },
      y: {
        formatter: function (val) {
          return val;
        },
        title: {
          formatter: (seriesName) => seriesName,
        },
      },
      // theme: themeName
    },
    grid: {
      borderColor: labelColor,
      strokeDashArray: 4,
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
  };
}
