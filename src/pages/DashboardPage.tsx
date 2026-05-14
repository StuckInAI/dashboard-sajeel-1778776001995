import { statCards, recentActivity, revenueData, trafficData } from '@/lib/data';
import StatCard from '@/components/ui/StatCard';
import ActivityFeed from '@/components/ui/ActivityFeed';
import LineChart from '@/components/ui/LineChart';
import BarChart from '@/components/ui/BarChart';
import styles from './DashboardPage.module.css';

export default function DashboardPage() {
  return (
    <div className={styles.page}>
      {/* Stats Row */}
      <div className={styles.statsGrid}>
        {statCards.map((card) => (
          <StatCard key={card.id} card={card} />
        ))}
      </div>

      {/* Charts Row */}
      <div className={styles.chartsRow}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div>
              <h2 className={styles.cardTitle}>Revenue Overview</h2>
              <p className={styles.cardSubtitle}>Monthly revenue vs target</p>
            </div>
            <div className={styles.legend}>
              <div className={styles.legendItem}>
                <span className={styles.legendDot} style={{ background: '#6c63ff' }} />
                <span>Actual</span>
              </div>
              <div className={styles.legendItem}>
                <span className={styles.legendDot} style={{ background: '#10b981' }} />
                <span>Target</span>
              </div>
            </div>
          </div>
          <LineChart
            data={revenueData}
            color="#6c63ff"
            secondaryColor="#10b981"
            height={180}
          />
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div>
              <h2 className={styles.cardTitle}>Weekly Traffic</h2>
              <p className={styles.cardSubtitle}>Visitors this week</p>
            </div>
          </div>
          <BarChart
            data={trafficData}
            color="#6c63ff"
            height={160}
          />
        </div>
      </div>

      {/* Bottom Row */}
      <div className={styles.bottomRow}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Recent Activity</h2>
          </div>
          <ActivityFeed items={recentActivity} />
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Quick Stats</h2>
          </div>
          <div className={styles.quickStats}>
            <div className={styles.quickStatItem}>
              <div className={styles.quickStatTop}>
                <span className={styles.quickStatLabel}>Avg. Session</span>
                <span className={styles.quickStatValue}>4m 32s</span>
              </div>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: '62%', background: '#6c63ff' }} />
              </div>
            </div>
            <div className={styles.quickStatItem}>
              <div className={styles.quickStatTop}>
                <span className={styles.quickStatLabel}>Bounce Rate</span>
                <span className={styles.quickStatValue}>24.8%</span>
              </div>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: '25%', background: '#ef4444' }} />
              </div>
            </div>
            <div className={styles.quickStatItem}>
              <div className={styles.quickStatTop}>
                <span className={styles.quickStatLabel}>Pages / Visit</span>
                <span className={styles.quickStatValue}>3.7</span>
              </div>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: '48%', background: '#10b981' }} />
              </div>
            </div>
            <div className={styles.quickStatItem}>
              <div className={styles.quickStatTop}>
                <span className={styles.quickStatLabel}>Goal Completion</span>
                <span className={styles.quickStatValue}>78%</span>
              </div>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: '78%', background: '#f59e0b' }} />
              </div>
            </div>
            <div className={styles.quickStatItem}>
              <div className={styles.quickStatTop}>
                <span className={styles.quickStatLabel}>Server Uptime</span>
                <span className={styles.quickStatValue}>99.97%</span>
              </div>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: '99%', background: '#3b82f6' }} />
              </div>
            </div>
            <div className={styles.quickStatItem}>
              <div className={styles.quickStatTop}>
                <span className={styles.quickStatLabel}>Error Rate</span>
                <span className={styles.quickStatValue}>0.12%</span>
              </div>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: '2%', background: '#ec4899' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
