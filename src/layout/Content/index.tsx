import { Outlet } from "react-router";
import { cn } from "../../utils/className";

interface ContentProps {
  className?: string;
}

const Content: React.FC<ContentProps> = ({ className }) => {
  return (
    <div className={cn("content", className)}>
      <Outlet />;
    </div>
  );
};

export default Content;
