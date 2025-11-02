import { NavLink } from "react-router";
import logo from "../../assets/logo.svg";
import { cn } from "../../utils/className";
import { Tooltip } from "../../components/Tooltip";
import { Button } from "../../components/Button/index";
import { MAIN_NAV_CONFIG } from "../../data/header.data";
import { SunRiseIcon, _8023timeIcon, GithubIcon } from "../../components/Icon";

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header
      className={cn(
        "flex gap-4 justify-between items-center h-14 p-10 dark:shadow-white-500/50 backdrop-blur transition-all w-full dark:shadow-[0_4px_6px_-1px_rgb(255,255,255,0.1)] z-50 ",
        className
      )}
    >
      <NavLink to="/">
        <img src={logo} className="w-35" />
      </NavLink>

      <div className="flex gap-4">
        {MAIN_NAV_CONFIG.map(item => (
          <NavLink to={item.href ?? ""}>
            <Button variant="text">{item.name}</Button>
          </NavLink>
        ))}
      </div>

      <div className="flex align-middle gap-4">
        <Tooltip content="切换黑暗模式" placement="bottom">
          <SunRiseIcon />
        </Tooltip>
        <Tooltip content="寻觅~流光的网站" placement="bottom">
          <NavLink to="https://www.8023time.com" target="_blank">
            <_8023timeIcon />
          </NavLink>
        </Tooltip>
        <Tooltip content="Github" placement="bottom">
          <NavLink to="https://www.github.com/8023time" target="_blank">
            <GithubIcon />
          </NavLink>
        </Tooltip>
      </div>
    </header>
  );
};

export default Header;
