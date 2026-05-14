import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  BarChart3,
  FolderKanban,
  Users,
  Settings,
  Zap,
  Bell,
} from 'lucide-react';
import styles from './Sidebar.module.css';

const navItems = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Analytics', path: '/analytics', icon: BarChart3 },
  { label: 'Projects', path: '/projects', icon: FolderKanban },
  { label: 'Team', path: '/team', icon: Users },
  { label: 'Settings', path: '/settings', icon: Settings },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <div className={styles.logoIcon}>
          <Zap size={18} />
        </div>
        <span className={styles.logoText}>Nexus</span>
      </div>

      <nav className={styles.nav}>
        <div className={styles.navSection}>
          <span className={styles.navLabel}>Main Menu</span>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
              >
                <Icon size={18} className={styles.navIcon} />
                <span>{item.label}</span>
                {isActive && <div className={styles.activeDot} />}
              </NavLink>
            );
          })}
        </div>
      </nav>

      <div className={styles.footer}>
        <div className={styles.notification}>
          <Bell size={16} className={styles.notifIcon} />
          <div className={styles.notifContent}>
            <span className={styles.notifTitle}>3 new alerts</span>
            <span className={styles.notifSub}>View notifications</span>
          </div>
          <div className={styles.notifBadge}>3</div>
        </div>
        <div className={styles.user}>
          <div className={styles.avatar}>JD</div>
          <div className={styles.userInfo}>
            <span className={styles.userName}>Jane Doe</span>
            <span className={styles.userRole}>Administrator</span>
          </div>
          <div className={styles.onlineDot} />
        </div>
      </div>
    </aside>
  );
}
