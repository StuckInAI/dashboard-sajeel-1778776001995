import styles from './ProgressRing.module.css';

type ProgressRingProps = {
  value: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  label?: string;
};

export default function ProgressRing({ value, size = 64, strokeWidth = 6, color = '#6c63ff', label }: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className={styles.wrapper} style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--color-border)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: 'stroke-dashoffset 0.6s ease' }}
        />
      </svg>
      <div className={styles.center}>
        <span className={styles.value}>{value}%</span>
        {label && <span className={styles.label}>{label}</span>}
      </div>
    </div>
  );
}
