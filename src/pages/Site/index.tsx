import { SiteCard } from "../../components/Card";
import { siteData } from "../../data/site.data";
import { Content } from "../../layout";

const Site = () => {
  return (
    <Content>
      {/* 页面标题区域 - 增加视觉引导 */}
      <div className="mb-12 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">AI 模型资源集合</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          精选各类人工智能模型与工具，助力高效工作与创新探索
        </p>
      </div>

      {/* 卡片网格 - 优化响应式布局 */}
      <div className="flex flex-wrap justify-center gap-4">
        {siteData.map(site => (
          <SiteCard key={site.name} {...site} />
        ))}
      </div>
    </Content>
  );
};

export default Site;
