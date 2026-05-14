import { TrendingUp, TrendingDown, DollarSign, Users, ShoppingBag, BarChart2 } from 'lucide-react';
import type { StatCard as StatCardType } from '@/types';
import styles from './StatCard.module.css';

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  dollar: DollarSign,
  users: Users,
  shopping: ShoppingBag,
  chart: BarChart2,
};

type StatCardProps = {
  card: StatCardType;
};

export default function StatCard({ card }: StatCardProps) {
  const Icon = iconMap[card.icon] || DollarSign;
  const isPositive = card.change >= 0;

  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <div className={styles.info}>
          <span className={styles.title}>{card.title}</span>
          <span className={styles.value}>{card.value}</span>
        </div>
        <div className={styles.iconWrap} style={{ background: card.gradient }}>
          <Icon size={22} />
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={`${styles.change} ${isPositive ? styles.positive : styles.negative}`}>
          {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          <span>{isPositive ? '+' : ''}{card.change}%</span>
        </div>
        <span className={styles.changeLabel}>{card.changeLabel}</span>
      </div>
      <div className={styles.bar}>
        <div className={styles.barFill} style={{ background: card.gradient, width: `${Math.abs(card.change) * 8}%` }} />
      </div>
    </div>
  );
}
