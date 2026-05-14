import { useState } from 'react';
import { projects } from '@/lib/data';
import ProgressRing from '@/components/ui/ProgressRing';
import type { Project } from '@/types';
import styles from './ProjectsPage.module.css';

type FilterType = 'all' | 'active' | 'paused' | 'completed';

export default function ProjectsPage() {
  const [filter, setFilter] = useState<FilterType>('all');

  const filtered = filter === 'all' ? projects : projects.filter((p) => p.status === filter);

  const statusColors: Record<Project['status'], string> = {
    active: 'var(--color-accent-green)',
    paused: 'var(--color-accent-yellow)',
    completed: 'var(--color-accent-blue)',
  };

  const statusLabels: Record<Project['status'], string> = {
    active: 'Active',
    paused: 'Paused',
    completed: 'Completed',
  };

  return (
    <div className={styles.page}>
      <div className={styles.toolbar}>
        <div className={styles.filters}>
          {(['all', 'active', 'paused', 'completed'] as FilterType[]).map((f) => (
            <button
              key={f}
              className={`${styles.filterBtn} ${filter === f ? styles.filterActive : ''}`}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <span className={styles.count}>{filtered.length} projects</span>
      </div>

      <div className={styles.grid}>
        {filtered.map((project) => (
          <div key={project.id} className={styles.card}>
            <div className={styles.cardTop}>
              <div className={styles.projectColor} style={{ background: project.color }} />
              <div className={styles.projectInfo}>
                <h3 className={styles.projectName}>{project.name}</h3>
                <p className={styles.projectDesc}>{project.description}</p>
              </div>
              <div
                className={styles.statusBadge}
                style={{
                  color: statusColors[project.status],
                  background: `${statusColors[project.status]}1a`,
                }}
              >
                {statusLabels[project.status]}
              </div>
            </div>

            <div className={styles.progressRow}>
              <ProgressRing value={project.progress} size={56} strokeWidth={5} color={project.color} />
              <div className={styles.taskInfo}>
                <span className={styles.taskCount}>
                  {project.completedTasks} / {project.tasks} tasks
                </span>
                <div className={styles.taskBar}>
                  <div
                    className={styles.taskFill}
                    style={{
                      width: `${(project.completedTasks / project.tasks) * 100}%`,
                      background: project.color,
                    }}
                  />
                </div>
              </div>
            </div>

            <div className={styles.cardFooter}>
              <div className={styles.teamAvatars}>
                {project.team.map((initials) => (
                  <div key={initials} className={styles.teamAvatar}>{initials}</div>
                ))}
              </div>
              <span className={styles.dueDate}>Due {project.dueDate}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
