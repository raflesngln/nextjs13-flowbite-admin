import { useEffect, useState } from 'react';

function useDarkMode() {
  const [darkMode, setDarkMode] = useState(false);

  // Load dark mode preference from localStorage when the component mounts
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'true') {
      setDarkMode(true);
    }
  }, []);

  // Toggle dark mode and update localStorage
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode.toString());
  };

  return [darkMode, toggleDarkMode];
}

export default useDarkMode;
