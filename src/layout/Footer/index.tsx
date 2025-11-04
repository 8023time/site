import { Typewriter } from "../../components/Typewriter/index";
import { cn } from "../../utils/className";
import Content from "../Content/index";

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <footer
      className={cn(
        "w-full h-14 flex justify-between items-center shadow-md dark:shadow-white/10 bg-[#F7F7F9] px-10 z-50",
        className
      )}
    >
      <Content>
        <div className="flex justify-between align-middle">
          {/* 左侧：版权信息 */}
          <span className="text-sm text-muted-foreground flex justify-between items-center">
            ©2024-2025 By 8023time
          </span>
          {/* 右侧：打字机效果 */}
          <Typewriter
            texts={["云雾依稀折柳枝", "凭栏更待青云月", "请君莫辞凌烟走", "惟愿神秀尽前时"]}
            className="text-sm text-muted-foreground"
          />
        </div>
      </Content>
    </footer>
  );
};

export default Footer;
