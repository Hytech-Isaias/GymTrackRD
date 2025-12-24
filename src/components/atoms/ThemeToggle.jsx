import React, { useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { useThemeStore } from '../../store/themeStore';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeStore();
  const isDark = theme === 'dark';

  // Ensure theme is applied on mount
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <motion.button
      onClick={toggleTheme}
      className={`relative w-18 h-8 rounded-full flex items-center p-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary hover:cursor-pointer ${
        isDark ? 'bg-surface-primary ring-2 ring-primary' : 'bg-surface-primary ring-2 ring-primary'
      }`}
      aria-label="Toggle Theme"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="w-8 h-8 rounded-full bg-surface-secondary shadow-sm flex items-center justify-center relative overflow-hidden"
        animate={{
          x: isDark ? 36 : -2,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Moon Icon */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={false}
          animate={{
            scale: isDark ? 1 : 0,
            rotate: isDark ? -20 : 90,
            opacity: isDark ? 1 : 0,
            transition: { duration: 0.2 }
          }}
        >
          <Moon size={18} className="text-primary fill-primary/70" />
        </motion.div>

        {/* Sun Icon */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={false}
          animate={{
            scale: !isDark ? 1 : 0,
            rotate: !isDark ? 90 : -90,
            opacity: !isDark ? 1 : 0,
            transition: { duration: 0.2 }
          }}
        >
          <Sun size={18} className="text-amber-500 fill-amber-500/20" />
        </motion.div>
      </motion.div>
    </motion.button>
  );
};
