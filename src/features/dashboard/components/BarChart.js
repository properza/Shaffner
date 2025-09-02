import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import TitleCard from '../../../components/Cards/TitleCard';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function BarChart() {
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  const data = {
    labels,
    datasets: [
      {
        label: 'Building A',
        data: labels.map(() => Math.random() * 1000 + 500),
        backgroundColor: '#e9b060',
      },
      {
        label: 'Building B',
        data: labels.map(() => Math.random() * 1000 + 500),
        backgroundColor: '#F08D01',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      tooltip: {
        callbacks: {
          // แสดงค่าใน tooltip พร้อมหน่วย kWh
          label: (ctx) => {
            const v = typeof ctx.raw === 'number' ? ctx.raw : Number(ctx.raw);
            return `${ctx.dataset.label}: ${v.toLocaleString()} kWh`;
          },
        },
      },
      title: {
        display: true,
        text: 'Monthly Energy Usage',
      },
    },
    scales: {
      y: {
        // ใส่ชื่อแกน (เส้นแนวแกนตั้ง) เป็น kWh
        // title: { display: true, text: 'kWh' },
        ticks: {
          // ต่อท้ายทุก tick ด้วย kWh
          callback: (value) => `${value.toLocaleString()} kWh`,
        },
      },
      x: {
        title: { display: false },
      },
    },
  };

  return (
    <TitleCard title={''}>
      <Bar options={options} data={data} />
    </TitleCard>
  );
}

export default BarChart;
