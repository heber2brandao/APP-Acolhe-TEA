
export enum TeaLevel {
  LEVEL_1 = 1,
  LEVEL_2 = 2,
  LEVEL_3 = 3,
}

export enum ActivityCategory {
  COMMUNICATION = 'Comunicação',
  SENSORY = 'Sensorial',
  COGNITIVE = 'Cognitivo',
  OT = 'Terapia Ocupacional', // Motor
  FEEDING = 'Alimentação',
  SOCIAL = 'Socialização',
}

export interface ChildProfile {
  name: string;
  age: number;
  level: TeaLevel;
  hasFoodSelectivity: boolean;
  hasSpeechDelay: boolean;
  hasMotorDifficulty: boolean;
  hasSensoryIssues: boolean;
}

export interface Activity {
  id: string;
  title: string;
  category: ActivityCategory;
  objective: string;
  scientificBasis: string; // New field for validation
  durationMin: number;
  materials: string[];
  steps: string[];
  benefits: string[];
  suitableFor: {
    minAge?: number;
    maxAge?: number;
    levels?: TeaLevel[];
    needsFoodFocus?: boolean;
    needsSpeechFocus?: boolean;
    needsMotorFocus?: boolean;
    needsSensoryFocus?: boolean;
  };
}

export interface CompletedActivity {
  activityId: string;
  date: string; // ISO Date string
  feedback: 'easy' | 'medium' | 'hard' | 'skipped';
}

export interface NotificationSettings {
  enabled: boolean;
  morningReminder: string; // "09:00"
  afternoonReminder: string; // "15:00"
  smartTips: boolean; // Suggestions based on evolution
  inactivityAlert: boolean; // Reminder to log progress
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'reminder' | 'tip' | 'achievement' | 'system';
  isRead: boolean;
  createdAt: string;
}

// --- NOVOS TIPOS PARA A BIBLIOTECA ---
export interface LibraryArticle {
  id: string;
  title: string;
  readTime: string;
  content: string[]; // Parágrafos
  tipBox?: string;
}

export interface LibraryModule {
  id: string;
  title: string;
  desc: string;
  icon: string;
  color: string;
  articles: LibraryArticle[];
}

export interface AppState {
  user: {
    name: string;
    email: string;
    phone: string;
  } | null;
  child: ChildProfile | null;
  onboardingComplete: boolean;
  history: CompletedActivity[];
  notifications: AppNotification[];
  settings: NotificationSettings;
  lastNotificationCheck: string; // Date string to prevent duplicate daily notifs
}