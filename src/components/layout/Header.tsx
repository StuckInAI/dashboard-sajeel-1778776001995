import { useLocation } from 'react-router-dom';
import { Search, Bell, Moon, Plus } from 'lucide-react';
import styles from './Header.module.css';

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  '/dashboard': { title: 'Dashboard', subtitle: 'Welcome back, Jane! Here\'s what\'s happening.' },
  '/analytics': { title: 'Analytics', subtitle: 'Track your key metrics and performance.' },
  '/projects': { title: 'Projects', subtitle: 'Manage and track all your projects.' },
  '/team': { title: 'Team', subtitle: 'View and manage your team members.' },
  '/settings': { title: 'Settings', subtitle: 'Configure your workspace preferences.' },
};

export default function Header() {
  const location = useLocation();
  const current = pageTitles[location.pathname] || { title: 'Dashboard', subtitle: '' };

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <h1 className={styles.title}>{current.title}</h1>
        <p className={styles.subtitle}>{current.subtitle}</p>
      </div>
      <div className={styles.right}>
        <div className={styles.searchBox}>
          <Search size={15} className={styles.searchIcon} />
          <input className={styles.searchInput} placeholder="Search..." />
        </div>
        <button className={styles.iconBtn} aria-label="Notifications">
          <Bell size={18} />
          <span className={styles.badge}>3</span>
        </button>
        <button className={styles.iconBtn} aria-label="Toggle theme">
          <Moon size={18} />
        </button>
        <button className={styles.primaryBtn}>
          <Plus size={16} />
          <span>New</span>
        </button>
      </div>
    </header>
  );
}
