export type NavItem = {
  label: string;
  path: string;
  icon: string;
};

export type StatCard = {
  id: string;
  title: string;
  value: string;
  change: number;
  changeLabel: string;
  gradient: string;
  icon: string;
};

export type ActivityItem = {
  id: string;
  user: string;
  avatar: string;
  action: string;
  target: string;
  time: string;
  type: 'commit' | 'review' | 'deploy' | 'issue' | 'comment';
};

export type Project = {
  id: string;
  name: string;
  description: string;
  progress: number;
  status: 'active' | 'paused' | 'completed';
  team: string[];
  dueDate: string;
  tasks: number;
  completedTasks: number;
  color: string;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: 'online' | 'offline' | 'busy' | 'away';
  email: string;
  projects: number;
  tasks: number;
  joined: string;
};

export type ChartDataPoint = {
  label: string;
  value: number;
  secondaryValue?: number;
};
