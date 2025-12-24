import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
  theme: string;
  toggleTheme: () => void;
  setTheme: (theme: string) => void;
  initializeTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'dark', // Default to dark as per user preference for "pitch black"
      toggleTheme: () => set((state: ThemeState) => {
        const newTheme = state.theme === 'light' ? 'dark' : 'light';
        
        // Apply class to html element
        if (newTheme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        
        return { theme: newTheme };
      }),
      setTheme: (theme: string) => {
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        set({ theme });
      },
      // Initialize theme from system or storage
      initializeTheme: () => {
        // storage is handled by persist middleware, but we need to apply the class
        // This is usually done in a useEffect in the main layout, but we can helper here
      }
    }),
    {
      name: 'theme-storage',
      onRehydrateStorage: () => (state) => {
        if (state) {
          if (state.theme === 'dark') {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        }
      }
    }
  )
);
