import Card from "../base";

interface SiteCardprops {
  name: string;
  logo: string;
  tags: string[];
  description: string;
}

const SiteCard = ({ name, logo, tags, description }: SiteCardprops) => {
  return (
    <Card
      width={270}
      height={110}
      bgColor="#fff"
      borderColor="transparent"
      hoverBorderColor="#22c55e" // hover 边框色
      shadow={true}
      className="relative cursor-pointer shadow-md dark:shadow-[0_4px_6px_-1px_rgba(255,255,255,0.1)] transition-all duration-200"
    >
      {/* 内容容器 */}
      <div className="flex flex-col gap-3 h-full p-4">
        {/* 顶部：Logo + 名称 + 标签 */}
        <div className="flex items-center gap-2">
          <img
            src={logo}
            alt="logo"
            width={40}
            height={40}
            className="object-contain"
            loading="lazy"
            onError={e => {
              (e.currentTarget as HTMLImageElement).setAttribute("data-error", "1");
            }}
          />
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-1">
              <div className="text-lg font-semibold">{name}</div>
            </div>
            <div className="flex flex-wrap gap-1 text-xs text-slate-400 font-thin">
              {tags.map(tag => (
                <span
                  key={tag}
                  className="inline-flex items-center text-[10px]/3 px-1.5 py-1 gap-1 font-medium text-default bg-elevated rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 底部描述 */}
        <div className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-6">{description}</div>
      </div>

      {/* 右上角操作按钮容器（保持骨架） */}
      <div className="flex gap-1 absolute top-2 right-2">{/* 可放按钮或图标 */}</div>
    </Card>
  );
};

export default SiteCard;
