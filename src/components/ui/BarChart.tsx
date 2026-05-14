import type { ChartDataPoint } from '@/types';
import styles from './BarChart.module.css';

type BarChartProps = {
  data: ChartDataPoint[];
  color?: string;
  title?: string;
  height?: number;
};

export default function BarChart({ data, color = '#6c63ff', title, height = 160 }: BarChartProps) {
  const max = Math.max(...data.map((d) => d.value));

  return (
    <div className={styles.wrapper}>
      {title && <h3 className={styles.title}>{title}</h3>}
      <div className={styles.chart} style={{ height }}>
        {data.map((item) => {
          const pct = max > 0 ? (item.value / max) * 100 : 0;
          return (
            <div key={item.label} className={styles.barGroup}>
              <div className={styles.barWrap}>
                <div
                  className={styles.bar}
                  style={{ height: `${pct}%`, background: color }}
                  title={String(item.value)}
                />
              </div>
              <span className={styles.label}>{item.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
