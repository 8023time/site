import { NavLink } from 'react-router';
import logo from '@assets/logo.svg';
import { cn } from '@utils/className';
import { Tooltip } from '@components/Tooltip';
import { Button } from '@components/Button/index';
import { MAIN_NAV_CONFIG } from '@data/header.data';
import { SunRiseIcon, _8023timeIcon, GithubIcon } from '@components/Icon';
import Content from '@layout/Content/index';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header
      className={cn(
        'z-50 flex h-14 w-full items-center justify-between px-10 py-4 backdrop-blur transition-all',
        className,
      )}
    >
      <Content>
        <div className='flex h-full items-center justify-between'>
          <NavLink to='/'>
            <img src={logo} width={120} className='h-full object-contain' />
          </NavLink>

          <div className='flex items-center gap-4'>
            {MAIN_NAV_CONFIG.map((item) => (
              <NavLink to={item.href ?? ''} key={item.name}>
                <Button variant='text' className='flex h-full items-center'>
                  {item.name}
                </Button>
              </NavLink>
            ))}
          </div>

          <div className='flex items-center gap-4'>
            <Tooltip content='切换黑暗模式' placement='bottom'>
              <SunRiseIcon className='h-full' />
            </Tooltip>
            <Tooltip content='寻觅~流光的网站' placement='bottom'>
              <NavLink to='https://www.8023time.com' target='_blank'>
                <_8023timeIcon className='h-full' />
              </NavLink>
            </Tooltip>
            <Tooltip content='Github' placement='bottom'>
              <NavLink to='https://www.github.com/8023time' target='_blank'>
                <GithubIcon className='h-full' />
              </NavLink>
            </Tooltip>
          </div>
        </div>
      </Content>
    </header>
  );
};

export default Header;
