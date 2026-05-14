import type { ChartDataPoint } from '@/types';
import styles from './LineChart.module.css';

type LineChartProps = {
  data: ChartDataPoint[];
  color?: string;
  secondaryColor?: string;
  height?: number;
};

export default function LineChart({ data, color = '#6c63ff', secondaryColor, height = 180 }: LineChartProps) {
  const values = data.map((d) => d.value);
  const secondaryValues = data.map((d) => d.secondaryValue ?? 0);
  const allValues = secondaryColor ? [...values, ...secondaryValues] : values;
  const max = Math.max(...allValues);
  const min = Math.min(...allValues.filter((v) => v > 0));
  const range = max - min || 1;

  const toY = (value: number, h: number) => {
    const pct = (value - min) / range;
    return h - pct * (h * 0.8) - h * 0.1;
  };

  const buildPath = (vals: number[], w: number, h: number) => {
    if (vals.length === 0) return '';
    const step = w / (vals.length - 1);
    return vals
      .map((v, i) => `${i === 0 ? 'M' : 'L'} ${i * step} ${toY(v, h)}`)
      .join(' ');
  };

  const buildArea = (vals: number[], w: number, h: number) => {
    if (vals.length === 0) return '';
    const step = w / (vals.length - 1);
    const linePath = vals
      .map((v, i) => `${i === 0 ? 'M' : 'L'} ${i * step} ${toY(v, h)}`)
      .join(' ');
    return `${linePath} L ${w} ${h} L 0 ${h} Z`;
  };

  const W = 600;
  const H = height;

  return (
    <div className={styles.wrapper}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className={styles.svg}
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0.02" />
          </linearGradient>
          {secondaryColor && (
            <linearGradient id="lineGrad2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={secondaryColor} stopOpacity="0.2" />
              <stop offset="100%" stopColor={secondaryColor} stopOpacity="0.02" />
            </linearGradient>
          )}
        </defs>

        {/* Grid lines */}
        {[0.25, 0.5, 0.75].map((ratio) => (
          <line
            key={ratio}
            x1="0"
            y1={H * ratio}
            x2={W}
            y2={H * ratio}
            stroke="var(--color-border)"
            strokeWidth="1"
          />
        ))}

        {/* Area fill */}
        <path d={buildArea(values, W, H)} fill="url(#lineGrad)" />
        {secondaryColor && secondaryValues.some((v) => v > 0) && (
          <path d={buildArea(secondaryValues, W, H)} fill="url(#lineGrad2)" />
        )}

        {/* Lines */}
        <path
          d={buildPath(values, W, H)}
          fill="none"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {secondaryColor && secondaryValues.some((v) => v > 0) && (
          <path
            d={buildPath(secondaryValues, W, H)}
            fill="none"
            stroke={secondaryColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="6 3"
          />
        )}

        {/* Data points */}
        {values.map((v, i) => {
          const step = W / (values.length - 1);
          return (
            <circle
              key={i}
              cx={i * step}
              cy={toY(v, H)}
              r="4"
              fill={color}
              stroke="var(--color-bg-card)"
              strokeWidth="2"
            />
          );
        })}
      </svg>

      <div className={styles.labels}>
        {data.map((d) => (
          <span key={d.label} className={styles.label}>{d.label}</span>
        ))}
      </div>
    </div>
  );
}
