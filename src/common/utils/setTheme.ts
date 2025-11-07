export function setTheme(theme: string) {
  document.documentElement.setAttribute('data-theme', theme);
}

export function toggleTheme(currentTheme: string) {
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
  return newTheme;
}
