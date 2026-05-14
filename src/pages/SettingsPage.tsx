import { useState } from 'react';
import { User, Bell, Shield, Palette, Globe, Database } from 'lucide-react';
import styles from './SettingsPage.module.css';

type Tab = 'profile' | 'notifications' | 'security' | 'appearance' | 'language' | 'data';

const tabs: { id: Tab; label: string; icon: React.ComponentType<{ size?: number }> }[] = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'language', label: 'Language', icon: Globe },
  { id: 'data', label: 'Data & Privacy', icon: Database },
];

type ToggleProps = {
  checked: boolean;
  onChange: (val: boolean) => void;
};

function Toggle({ checked, onChange }: ToggleProps) {
  return (
    <button
      className={`${styles.toggle} ${checked ? styles.toggleOn : ''}`}
      onClick={() => onChange(!checked)}
      aria-label="toggle"
    >
      <span className={styles.toggleThumb} />
    </button>
  );
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('profile');
  const [notifs, setNotifs] = useState({
    email: true,
    push: true,
    slack: false,
    weekly: true,
    mentions: true,
    updates: false,
  });

  return (
    <div className={styles.page}>
      <div className={styles.sidebar}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              className={`${styles.tabBtn} ${activeTab === tab.id ? styles.tabActive : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className={styles.content}>
        {activeTab === 'profile' && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Profile Settings</h2>
            <div className={styles.avatarSection}>
              <div className={styles.bigAvatar}>JD</div>
              <div>
                <button className={styles.outlineBtn}>Change Avatar</button>
                <p className={styles.hint}>JPG, PNG or GIF. Max 2MB.</p>
              </div>
            </div>
            <div className={styles.formGrid}>
              <div className={styles.field}>
                <label className={styles.label}>First Name</label>
                <input className={styles.input} defaultValue="Jane" />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Last Name</label>
                <input className={styles.input} defaultValue="Doe" />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Email</label>
                <input className={styles.input} defaultValue="jane.doe@company.io" type="email" />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Role</label>
                <input className={styles.input} defaultValue="Administrator" readOnly />
              </div>
              <div className={`${styles.field} ${styles.fieldFull}`}>
                <label className={styles.label}>Bio</label>
                <textarea className={styles.textarea} rows={3} defaultValue="Product-focused engineer and team lead at Nexus." />
              </div>
            </div>
            <div className={styles.actions}>
              <button className={styles.primaryBtn}>Save Changes</button>
              <button className={styles.outlineBtn}>Cancel</button>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Notification Preferences</h2>
            <div className={styles.toggleList}>
              {([
                { key: 'email', label: 'Email Notifications', desc: 'Receive updates via email' },
                { key: 'push', label: 'Push Notifications', desc: 'Browser push notifications' },
                { key: 'slack', label: 'Slack Integration', desc: 'Send alerts to Slack' },
                { key: 'weekly', label: 'Weekly Digest', desc: 'Weekly summary report' },
                { key: 'mentions', label: 'Mentions', desc: 'When someone mentions you' },
                { key: 'updates', label: 'Product Updates', desc: 'New features and releases' },
              ] as { key: keyof typeof notifs; label: string; desc: string }[]).map((item) => (
                <div key={item.key} className={styles.toggleRow}>
                  <div className={styles.toggleInfo}>
                    <span className={styles.toggleLabel}>{item.label}</span>
                    <span className={styles.toggleDesc}>{item.desc}</span>
                  </div>
                  <Toggle
                    checked={notifs[item.key]}
                    onChange={(val) => setNotifs((prev) => ({ ...prev, [item.key]: val }))}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Security Settings</h2>
            <div className={styles.formGrid}>
              <div className={`${styles.field} ${styles.fieldFull}`}>
                <label className={styles.label}>Current Password</label>
                <input className={styles.input} type="password" placeholder="••••••••" />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>New Password</label>
                <input className={styles.input} type="password" placeholder="••••••••" />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Confirm Password</label>
                <input className={styles.input} type="password" placeholder="••••••••" />
              </div>
            </div>
            <div className={styles.actions}>
              <button className={styles.primaryBtn}>Update Password</button>
            </div>
            <div className={styles.dangerZone}>
              <h3 className={styles.dangerTitle}>Danger Zone</h3>
              <p className={styles.dangerDesc}>Once you delete your account, there is no going back.</p>
              <button className={styles.dangerBtn}>Delete Account</button>
            </div>
          </div>
        )}

        {(activeTab === 'appearance' || activeTab === 'language' || activeTab === 'data') && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {tabs.find((t) => t.id === activeTab)?.label} Settings
            </h2>
            <div className={styles.placeholder}>
              <p>This section is coming soon.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
