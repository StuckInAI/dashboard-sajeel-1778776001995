import { revenueData, trafficData } from '@/lib/data';
import LineChart from '@/components/ui/LineChart';
import BarChart from '@/components/ui/BarChart';
import styles from './AnalyticsPage.module.css';

const kpiData = [
  { label: 'Total Visits', value: '248,891', change: '+14.2%', color: '#6c63ff' },
  { label: 'Unique Users', value: '87,403', change: '+9.8%', color: '#10b981' },
  { label: 'Total Revenue', value: '$1.02M', change: '+21.5%', color: '#3b82f6' },
  { label: 'Avg Order Value', value: '$127.40', change: '+3.1%', color: '#ec4899' },
  { label: 'Refund Rate', value: '1.2%', change: '-0.3%', color: '#f59e0b' },
  { label: 'CSAT Score', value: '94.5%', change: '+2.0%', color: '#06b6d4' },
];

const channelData = [
  { label: 'Organic', value: 42 },
  { label: 'Direct', value: 28 },
  { label: 'Referral', value: 18 },
  { label: 'Social', value: 8 },
  { label: 'Email', value: 4 },
];

export default function AnalyticsPage() {
  return (
    <div className={styles.page}>
      <div className={styles.kpiGrid}>
        {kpiData.map((kpi) => (
          <div key={kpi.label} className={styles.kpiCard}>
            <div className={styles.kpiIndicator} style={{ background: kpi.color }} />
            <span className={styles.kpiLabel}>{kpi.label}</span>
            <span className={styles.kpiValue}>{kpi.value}</span>
            <span
              className={styles.kpiChange}
              style={{ color: kpi.change.startsWith('-') ? 'var(--color-accent-red)' : 'var(--color-accent-green)' }}
            >
              {kpi.change}
            </span>
          </div>
        ))}
      </div>

      <div className={styles.chartsRow}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div>
              <h2 className={styles.cardTitle}>Annual Revenue Trend</h2>
              <p className={styles.cardSubtitle}>Revenue vs target — full year</p>
            </div>
          </div>
          <LineChart data={revenueData} color="#6c63ff" secondaryColor="#10b981" height={200} />
        </div>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Traffic Channels</h2>
          </div>
          <div className={styles.channelList}>
            {channelData.map((ch) => (
              <div key={ch.label} className={styles.channelItem}>
                <div className={styles.channelMeta}>
                  <span className={styles.channelLabel}>{ch.label}</span>
                  <span className={styles.channelPct}>{ch.value}%</span>
                </div>
                <div className={styles.channelBar}>
                  <div
                    className={styles.channelFill}
                    style={{ width: `${ch.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.bottomRow}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Daily Traffic</h2>
          </div>
          <BarChart data={trafficData} color="#3b82f6" height={180} />
        </div>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Top Pages</h2>
          </div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Page</th>
                <th>Views</th>
                <th>Bounce</th>
                <th>Avg Time</th>
              </tr>
            </thead>
            <tbody>
              {[
                { page: '/home', views: '52,480', bounce: '22%', time: '3m 12s' },
                { page: '/pricing', views: '31,200', bounce: '31%', time: '4m 08s' },
                { page: '/features', views: '24,910', bounce: '28%', time: '2m 55s' },
                { page: '/blog', views: '18,320', bounce: '41%', time: '5m 22s' },
                { page: '/docs', views: '14,700', bounce: '18%', time: '6m 40s' },
              ].map((row) => (
                <tr key={row.page}>
                  <td className={styles.pageCell}>{row.page}</td>
                  <td>{row.views}</td>
                  <td>{row.bounce}</td>
                  <td>{row.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
