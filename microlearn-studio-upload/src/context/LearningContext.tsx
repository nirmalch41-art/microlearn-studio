import React, { createContext, useContext, useState, useEffect } from 'react';

export type NavTab = 
  | 'dashboard'
  | 'microcontrollers'
  | 'pin-configuration'
  | 'sensors'
  | 'virtual-lab'
  | 'projects'
  | 'datasets'
  | 'protocols'
  | 'tutorials'
  | 'quizzes'
  | 'progress';

export interface Bookmark {
  id: string;
  type: 'mcu' | 'sensor' | 'experiment' | 'project' | 'protocol';
  title: string;
}

export interface Badge {
  id: string;
  name: string;
  desc: string;
  icon: string;
  unlockedAt?: string;
}

interface LearningContextType {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  selectedMcuId: string | null;
  setSelectedMcuId: (id: string | null) => void;
  selectedBoardId: string | null;
  setSelectedBoardId: (id: string | null) => void;
  selectedSensorId: string | null;
  setSelectedSensorId: (id: string | null) => void;
  selectedExperimentId: string | null;
  setSelectedExperimentId: (id: string | null) => void;
  selectedProjectId: string | null;
  setSelectedProjectId: (id: string | null) => void;
  selectedProtocolId: string | null;
  setSelectedProtocolId: (id: string | null) => void;
  selectedTutorialId: string | null;
  setSelectedTutorialId: (id: string | null) => void;
  
  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  // Theme
  isDarkMode: boolean;
  toggleTheme: () => void;

  // Progress
  completedExperiments: string[];
  toggleExperimentCompleted: (expId: string) => void;
  quizScores: Record<string, number>;
  saveQuizScore: (quizId: string, score: number) => void;
  bookmarks: Bookmark[];
  toggleBookmark: (item: Bookmark) => void;
  isBookmarked: (id: string) => boolean;
  badges: Badge[];
  navigateWithSelection: (tab: NavTab, type: string, id: string) => void;
}

const ALL_BADGES: Badge[] = [
  { id: 'first-lab', name: 'Virtual Pioneer', desc: 'Ran your first interactive microcontroller simulation', icon: 'FlaskConical' },
  { id: 'pinout-explorer', name: 'Pinout Master', desc: 'Explored detailed hardware pinout specifications', icon: 'Cpu' },
  { id: 'quiz-ace', name: 'Silicon Scholar', desc: 'Scored 100% on a technical microcontroller assessment', icon: 'Award' },
  { id: 'iot-architect', name: 'IoT Architect', desc: 'Reviewed beginner, intermediate and advanced project schematics', icon: 'Wifi' },
  { id: 'data-scientist', name: 'Telemetry Analyst', desc: 'Analyzed sensor datasets and exported telemetry records', icon: 'BarChart3' }
];

const LearningContext = createContext<LearningContextType | undefined>(undefined);

export const LearningProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [selectedMcuId, setSelectedMcuId] = useState<string | null>(null);
  const [selectedBoardId, setSelectedBoardId] = useState<string | null>('esp32-devkit-v1');
  const [selectedSensorId, setSelectedSensorId] = useState<string | null>(null);
  const [selectedExperimentId, setSelectedExperimentId] = useState<string | null>('exp-1');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [selectedProtocolId, setSelectedProtocolId] = useState<string | null>(null);
  const [selectedTutorialId, setSelectedTutorialId] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Load saved progress from localStorage
  const [completedExperiments, setCompletedExperiments] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('microlearn_completed_exp');
      return saved ? JSON.parse(saved) : ['exp-1'];
    } catch {
      return ['exp-1'];
    }
  });

  const [quizScores, setQuizScores] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem('microlearn_quiz_scores');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => {
    try {
      const saved = localStorage.getItem('microlearn_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Keep badges synced
  const [badges, setBadges] = useState<Badge[]>(ALL_BADGES);

  useEffect(() => {
    localStorage.setItem('microlearn_completed_exp', JSON.stringify(completedExperiments));
  }, [completedExperiments]);

  useEffect(() => {
    localStorage.setItem('microlearn_quiz_scores', JSON.stringify(quizScores));
  }, [quizScores]);

  useEffect(() => {
    localStorage.setItem('microlearn_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  // Handle dark mode class on root HTML element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const toggleExperimentCompleted = (expId: string) => {
    setCompletedExperiments(prev => {
      const exists = prev.includes(expId);
      const next = exists ? prev.filter(id => id !== expId) : [...prev, expId];
      return next;
    });
  };

  const saveQuizScore = (quizId: string, score: number) => {
    setQuizScores(prev => ({ ...prev, [quizId]: score }));
  };

  const toggleBookmark = (item: Bookmark) => {
    setBookmarks(prev => {
      const exists = prev.some(b => b.id === item.id);
      return exists ? prev.filter(b => b.id !== item.id) : [...prev, item];
    });
  };

  const isBookmarked = (id: string) => {
    return bookmarks.some(b => b.id === id);
  };

  const navigateWithSelection = (tab: NavTab, type: string, id: string) => {
    setActiveTab(tab);
    if (type === 'mcu') setSelectedMcuId(id);
    else if (type === 'board') setSelectedBoardId(id);
    else if (type === 'sensor') setSelectedSensorId(id);
    else if (type === 'experiment') setSelectedExperimentId(id);
    else if (type === 'project') setSelectedProjectId(id);
    else if (type === 'protocol') setSelectedProtocolId(id);
    else if (type === 'tutorial') setSelectedTutorialId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <LearningContext.Provider
      value={{
        activeTab,
        setActiveTab,
        selectedMcuId,
        setSelectedMcuId,
        selectedBoardId,
        setSelectedBoardId,
        selectedSensorId,
        setSelectedSensorId,
        selectedExperimentId,
        setSelectedExperimentId,
        selectedProjectId,
        setSelectedProjectId,
        selectedProtocolId,
        setSelectedProtocolId,
        selectedTutorialId,
        setSelectedTutorialId,
        searchQuery,
        setSearchQuery,
        isSearchOpen,
        setIsSearchOpen,
        isDarkMode,
        toggleTheme,
        completedExperiments,
        toggleExperimentCompleted,
        quizScores,
        saveQuizScore,
        bookmarks,
        toggleBookmark,
        isBookmarked,
        badges,
        navigateWithSelection
      }}
    >
      {children}
    </LearningContext.Provider>
  );
};

export const useLearning = () => {
  const context = useContext(LearningContext);
  if (!context) {
    throw new Error('useLearning must be used within a LearningProvider');
  }
  return context;
};
