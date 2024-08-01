/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";
import ChartWrapper from "./Chart.style";

const chartOptions = (chartData) => {
  let cValues = []
  let cLabels = []
  chartData.map((data) => cValues.push(data.obtain_marks))
  chartData.map((data) => cLabels.push(data.subject_name))
  const labelColor = "#2B2B40";

  return {
    // series: cValues,
    series: [
      {
        name: "Marks",
        data: cValues,
      },
      // {
      //   name: "Commerce",
      //   data: [76, 85, 101, 98, 87],
      // },
      // {
      //   name: "Arts",
      //   data: [35, 41, 36, 26, 45],
      // },
    ],
    legend: {
      show: true,
      labels: {
        colors: "#FFFFFF",
      },
    },
    chart: {
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
      fontFamily: "inherit",
      type: "bar",
      defaultLocale: "en",
      height: 350,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 0,
        horizontal: false,
        columnWidth: "50%",
        barHeight: "70%",
      },
    },
    responsive: [
      {
        breakpoint: 1000,
        options: {
          chart: {
            width: 300,
          },
          plotOptions: {
            bar: {
              horizontal: false,
            },
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    dataLabels: {
      enabled: false,
    },
    colors: ["#FBBE22"], //["#FBBE22", "#3bb0de", "#ff4d6a"]
    xaxis: {
      categories: cLabels,
      labels: {
        style: {
          fontSize: "11px",
          colors: "#FFFFFF",
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
          colors: "#FFFFFF",
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
      },
      theme: "dark",
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
};

const BarChart = ({ className, chartData }) => {
  const chartRef = useRef(null);
  const refreshMode = () => {
    if (!chartRef?.current) {
      return;
    }
    const chart = new ApexCharts(chartRef?.current, chartOptions(chartData));
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
      <div className={`card w-100 ${className}`} style={{ height: "550px" }}>
        {/* begin::Body */}
        <div className="card-body d-flex flex-column p-0 w-100 position-relative">
          {/* begin::Chart */}
          <div
            ref={chartRef}
            id={"kt_bar_chart_widget"}
            className="chart-container mixed-widget-7-chart card-rounded-bottom"
          ></div>
          {/* end::Chart */}
        </div>
        {/* end::Body */}
      </div>
    </ChartWrapper>
  );
};

export { BarChart };
