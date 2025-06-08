'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  BarController,
  ChartData,
  ChartOptions,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  BarController
);

export default function ChartSection() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1, // Trigger when at least 10% of the element is visible
      }
    );

    if (chartRef.current) {
      observer.observe(chartRef.current);
    }

    return () => {
      const currentRef = chartRef.current;
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const ctx = chartRef.current?.getContext('2d');
    if (ctx) {
      // Destroy existing chart if it exists
      if (ChartJS.getChart(ctx)) {
        (ChartJS.getChart(ctx) as ChartJS<'bar'>).destroy();
      }

      // Chart data
      const chartData: ChartData<'bar'> = {
        labels: [
          'Aumento da Visibilidade',
          'Geração de Leads',
          'Otimização de ROI',
          'Regeneração da Marca',
          'Crescimento de Vendas',
        ],
        datasets: [
          {
            label: 'Impacto Potencial (%)',
            data: [95, 85, 90, 88, 75],
            backgroundColor: 'rgba(109, 40, 217, 0.6)',
            borderColor: 'rgba(109, 40, 217, 1)',
            borderWidth: 1,
            borderRadius: 5,
          },
        ],
      };

      // Chart options
      const chartOptions: ChartOptions<'bar'> = {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 1000,
          easing: 'easeOutQuart',
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: '#0f172a',
            titleFont: { size: 16 },
            bodyFont: { size: 14 },
            padding: 12,
            cornerRadius: 6,
          },
        },
        scales: {
          x: {
            beginAtZero: true,
            grid: {
              color: 'rgba(203, 213, 225, 0.3)',
            },
            ticks: {
              color: '#475569',
            },
          },
          y: {
            grid: {
              display: false,
            },
            ticks: {
              color: '#334155',
              font: {
                size: 14,
              },
            },
          },
        },
      };

      new ChartJS(ctx, {
        type: 'bar',
        data: chartData,
        options: chartOptions,
      });
    }
  }, [isVisible]);

  return <canvas ref={chartRef} id="impactChart" />;
}
