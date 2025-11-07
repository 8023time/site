import { cn } from '@utils/className';

interface ContentProps {
  className?: string;
  children?: React.ReactNode;
}

const Content: React.FC<ContentProps> = ({ className, children }) => {
  return (
    <main
      className={cn(
        'flex w-full justify-center px-[clamp(1rem,4vw,2rem)] sm:px-[clamp(1.5rem,5vw,3rem)] md:px-[clamp(2rem,6vw,4rem)]',
        className,
      )}
    >
      <div className='w-full max-w-[min(1440px,95%)]'>{children}</div>
    </main>
  );
};

export default Content;
