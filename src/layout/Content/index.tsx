import { cn } from "../../utils/className";

interface ContentProps {
  className?: string;
  children?: React.ReactNode;
}

const Content: React.FC<ContentProps> = ({ className, children }) => {
  return (
    <main className={cn("w-full flex justify-center px-[clamp(1rem,5vw,4rem)] pt-20", className)}>
      <div className="w-full max-w-[1440px]">{children}</div>
    </main>
  );
};

export default Content;
