import { teamMembers } from '@/lib/data';
import type { TeamMember } from '@/types';
import { Mail, Briefcase, CheckSquare, Calendar } from 'lucide-react';
import styles from './TeamPage.module.css';

const statusColors: Record<TeamMember['status'], string> = {
  online: 'var(--color-accent-green)',
  offline: 'var(--color-text-muted)',
  busy: 'var(--color-accent-red)',
  away: 'var(--color-accent-yellow)',
};

const statusLabels: Record<TeamMember['status'], string> = {
  online: 'Online',
  offline: 'Offline',
  busy: 'Busy',
  away: 'Away',
};

export default function TeamPage() {
  return (
    <div className={styles.page}>
      <div className={styles.grid}>
        {teamMembers.map((member) => (
          <div key={member.id} className={styles.card}>
            <div className={styles.cardTop}>
              <div className={styles.avatarWrap}>
                <div className={styles.avatar}>{member.avatar}</div>
                <div
                  className={styles.statusDot}
                  style={{ background: statusColors[member.status] }}
                  title={statusLabels[member.status]}
                />
              </div>
              <div className={styles.memberInfo}>
                <h3 className={styles.memberName}>{member.name}</h3>
                <span className={styles.memberRole}>{member.role}</span>
              </div>
              <div
                className={styles.statusBadge}
                style={{
                  color: statusColors[member.status],
                  background: `${statusColors[member.status]}22`,
                }}
              >
                {statusLabels[member.status]}
              </div>
            </div>

            <div className={styles.metaRow}>
              <div className={styles.metaItem}>
                <Mail size={13} />
                <span className={styles.metaText}>{member.email}</span>
              </div>
              <div className={styles.metaItem}>
                <Calendar size={13} />
                <span className={styles.metaText}>Joined {member.joined}</span>
              </div>
            </div>

            <div className={styles.statsRow}>
              <div className={styles.stat}>
                <Briefcase size={14} className={styles.statIcon} />
                <div className={styles.statContent}>
                  <span className={styles.statValue}>{member.projects}</span>
                  <span className={styles.statLabel}>Projects</span>
                </div>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.stat}>
                <CheckSquare size={14} className={styles.statIcon} />
                <div className={styles.statContent}>
                  <span className={styles.statValue}>{member.tasks}</span>
                  <span className={styles.statLabel}>Tasks</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
