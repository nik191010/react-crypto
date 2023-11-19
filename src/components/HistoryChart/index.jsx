import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment/moment';
import { chartDays } from '../../config/data';
import styles from './HistoryChart.module.scss';

import {
  Chart as ChartJS,
  TimeScale,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  Decimation,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  TimeScale,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  Decimation,
);

const HistoryChart = () => {
  const params = useParams();
  const [chartData, setChartData] = React.useState([]);
  const [days, setDays] = React.useState(1);
  const [format, setFormat] = React.useState('H:mm');
  const [active, setActive] = React.useState(0);

  // Creates an array with 2 properties x-date,y-price
  const coinChartData = chartData.prices?.map((value) => ({
    x: value[0],
    y: value[1].toFixed(2),
  }));

  // Name of the currency with the first letter capitalised
  const labelName = params.coinId[0].toUpperCase() + params.coinId.slice(1);
  const url = `${process.env.REACT_APP_API_COINS_URL}/${params.coinId}/market_chart?vs_currency=usd&days=${days}`;

  // Fetches data for the chart
  React.useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setChartData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [days]);

  // const uniq = [...new Set(coinChartData?.map((value) => moment(value.x).format('MMMDD')))];

  // Options for the chart
  const options = {
    responsive: true,
    animation: days === 'max' ? false : true,
    elements: {
      point: {
        radius: days === 'max' ? 0 : 3,
      },
    },
    plugins: {
      decimation: {
        enabled: true,
        algorithm: 'lttb',
        samples: 10,
        threshold: 20,
      },
      tooltip: {
        titleFont: {
          size: 16,
        },
        bodyFont: {
          size: 14,
        },
        callbacks: {
          label: function (context) {
            let label = 'USD' || '';

            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(context.parsed.y);
            }
            return label;
          },
          labelColor: function (context) {
            return {
              backgroundColor: '#ff9332',
              caretSize: 21,
            };
          },
        },
      },
    },
  };

  // Date and prices are set
  const data = {
    labels: coinChartData?.map((value) => moment(value.x).format(format)),
    datasets: [
      {
        fill: true,
        label: labelName.toUpperCase(),
        data: coinChartData?.map((value) => value.y),
        borderColor: '#ff9332',
      },
    ],
  };

  // Changes the chart data depending on the users' input
  // e.g. 1W-1 week, index-1, days-7, format-MMM'DD
  const handleClick = (index, day) => {
    setActive(index);
    setDays(day.value);
    setFormat(day.format);
  };

  return (
    <div className={styles.root}>
      <div className={styles.chartWrap}>
        <Line options={options} data={data} />
      </div>
      <div className={styles.options}>
        {chartDays.map((day, index) => (
          <span
            key={index}
            id={index}
            className={`${styles.item} ${active === index ? styles.item_active : ''}`}
            onClick={() => {
              handleClick(index, day);
            }}>
            {day.label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default HistoryChart;
