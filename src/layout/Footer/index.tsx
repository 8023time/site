import { useState, useEffect } from 'react';
import { Typewriter } from '@components/Typewriter/index';
import { cn } from '@utils/className';
import Content from '@layout/Content/index';

// 提取公共 Tailwind 类到常量
const styles = {
  sectionTitle: 'text-xs font-semibold tracking-wider uppercase text-gray-900 dark:text-gray-100',
  link: 'text-sm text-gray-600 transition-colors duration-200 hover:text-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:text-gray-300 dark:hover:text-blue-400',
  socialButton:
    'relative flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-transform duration-200 hover:scale-110 hover:bg-blue-500 hover:text-white focus:scale-110 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-blue-500',
  themeButton:
    'flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600 transition-colors duration-200 hover:bg-blue-500 hover:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-blue-500',
  border: 'border-t border-gray-200/10 dark:border-gray-800/10',
};

// 导航链接组件
const NavigationLinks = ({ links }: { links: { name: string; href: string }[] }) => (
  <div className='flex flex-col items-center gap-4 md:items-start'>
    <h4 className={styles.sectionTitle}>Navigation</h4>
    <ul className='flex flex-col items-center gap-2 md:items-start'>
      {links.map((link) => (
        <li key={link.name}>
          <a href={link.href} className={styles.link} tabIndex={0}>
            {link.name}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

// 社交链接组件
const SocialLinks = ({ links }: { links: { name: string; href: string; icon: string; label: string }[] }) => (
  <div className='flex flex-col items-center gap-4 md:items-start'>
    <h4 className={styles.sectionTitle}>Connect</h4>
    <div className='flex gap-2'>
      {links.map((link) => (
        <a
          key={link.name}
          href={link.href}
          target='_blank'
          rel='noopener noreferrer'
          className={styles.socialButton}
          aria-label={link.label}
          title={link.name}
          tabIndex={0}
        >
          <span className='text-base'>{link.icon}</span>
          <span className='absolute -top-8 rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-200 hover:opacity-100'>
            {link.name}
          </span>
        </a>
      ))}
    </div>
  </div>
);

// 主题切换组件
const ThemeToggle = ({ theme, toggleTheme }: { theme: 'light' | 'dark'; toggleTheme: () => void }) => (
  <div className='flex flex-col items-center gap-4 md:items-start'>
    <h4 className={styles.sectionTitle}>Theme</h4>
    <button
      onClick={toggleTheme}
      className={styles.themeButton}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      tabIndex={0}
    >
      <span>{theme === 'dark' ? '🌙' : '☀️'}</span>
      {theme === 'dark' ? 'Dark' : 'Light'} Mode
    </button>
  </div>
);

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(
    typeof window !== 'undefined' ? (localStorage.getItem('theme') as 'light' | 'dark') || 'dark' : 'dark',
  );
  const [uptime, setUptime] = useState({ days: 0, hours: 0, minutes: 0 });
  const [isEasterEggActive, setIsEasterEggActive] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const startDate = new Date('2024-10-14').getTime();
    const updateUptime = () => {
      const now = new Date().getTime();
      const diff = now - startDate;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      setUptime({ days, hours, minutes });
    };
    updateUptime();
    const interval = setInterval(updateUptime, 60000);
    return () => clearInterval(interval);
  }, []);

  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/8023time', icon: '🐙', label: 'Visit GitHub' },
    { name: 'Website', href: 'https://www.8023time.com', icon: '🌐', label: 'Visit personal website' },
    { name: 'Twitter', href: 'mailto:contact@8023time.com', icon: '📧', label: 'Send email' },
    { name: 'YouTube', href: 'mailto:contact@8023time.com', icon: '📧', label: 'Send email' },
    { name: 'Facebook', href: 'mailto:contact@8023time.com', icon: '📧', label: 'Send email' },
  ];

  const footerLinks = [
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Projects', href: '/projects' },
    { name: 'Links', href: '/links' },
  ];

  const poetryTexts = ['云雾依稀折柳枝', '凭栏更待青云月', '请君莫辞凌烟走', '惟愿神秀尽前时', '山川远阔心流连'];

  const handleLogoClick = () => {
    setIsEasterEggActive(true);
    setTimeout(() => setIsEasterEggActive(false), 2000);
  };

  return (
    <footer
      className={cn('mt-auto w-full bg-gray-50/50 shadow-sm dark:bg-gray-900/50', styles.border, className)}
      role='contentinfo'
    >
      <Content>
        <div className='py-8'>
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(200px,1fr))]'>
            {/* Brand & Description */}
            <div className='flex flex-col items-center gap-4 text-center md:items-start md:text-left'>
              <h3
                className={cn(
                  'cursor-pointer bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-2xl font-bold text-transparent transition-transform duration-500',
                  isEasterEggActive && 'animate-easter-egg',
                )}
                onClick={handleLogoClick}
                role='button'
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleLogoClick()}
                aria-label='8023time logo with easter egg'
              >
                8023time
              </h3>
              <p className='max-w-xs text-sm text-gray-600 dark:text-gray-300'>
                A personal space to explore technology and share knowledge.
              </p>
              <div className='animate-fade-in'>
                <Typewriter
                  texts={[poetryTexts[Math.floor(Math.random() * poetryTexts.length)]]}
                  className='text-xs text-gray-500 italic dark:text-gray-400'
                />
              </div>
            </div>

            <NavigationLinks links={footerLinks} />
            <SocialLinks links={socialLinks} />
            <ThemeToggle theme={theme} toggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
          </div>
        </div>

        <div className={cn('py-4', styles.border)}>
          <div className='flex flex-col items-center gap-3 text-xs text-gray-600 md:flex-row md:justify-between dark:text-gray-300'>
            <span>
              © {new Date().getFullYear()} 8023time. Built with{' '}
              <span className='animate-heartbeat inline-block text-red-500'>❤️</span> using React
            </span>
            <span className='flex items-center gap-2'>
              <span className='h-2 w-2 animate-pulse rounded-full bg-green-400'></span>
              Running for {uptime.days} days, {uptime.hours} hours, {uptime.minutes} minutes
            </span>
          </div>
        </div>
      </Content>
    </footer>
  );
};

export default Footer;
