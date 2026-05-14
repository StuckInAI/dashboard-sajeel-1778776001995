import { GitCommit, GitPullRequest, Rocket, AlertCircle, MessageSquare } from 'lucide-react';
import type { ActivityItem } from '@/types';
import styles from './ActivityFeed.module.css';

const typeConfig: Record<ActivityItem['type'], { icon: React.ComponentType<{ size?: number }>, color: string }> = {
  commit: { icon: GitCommit, color: '#6c63ff' },
  review: { icon: GitPullRequest, color: '#10b981' },
  deploy: { icon: Rocket, color: '#3b82f6' },
  issue: { icon: AlertCircle, color: '#ef4444' },
  comment: { icon: MessageSquare, color: '#f59e0b' },
};

type ActivityFeedProps = {
  items: ActivityItem[];
};

export default function ActivityFeed({ items }: ActivityFeedProps) {
  return (
    <div className={styles.feed}>
      {items.map((item, idx) => {
        const config = typeConfig[item.type];
        const Icon = config.icon;
        return (
          <div key={item.id} className={styles.item}>
            <div className={styles.avatarWrap}>
              <div className={styles.avatar}>{item.avatar}</div>
              <div className={styles.typeIcon} style={{ background: config.color }}>
                <Icon size={10} />
              </div>
            </div>
            {idx < items.length - 1 && <div className={styles.line} />}
            <div className={styles.content}>
              <p className={styles.text}>
                <span className={styles.user}>{item.user}</span>
                {' '}{item.action}{' '}
                <span className={styles.target}>{item.target}</span>
              </p>
              <span className={styles.time}>{item.time}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
