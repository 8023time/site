import { NavLink } from "react-router";
import { Content } from "../../layout";
import { siteData } from "../../data/site.data";
import { SiteCard } from "../../components/Card";

const Site = () => {
  return (
    <Content>
      {/* 卡片网格 */}
      {siteData.map((group, i) => (
        <div key={i}>
          <div className="flex gap-10 justify-center py-10">
            <img src={group.logo} width={35} loading="lazy" />
            <span className="font-bold text-2xl ">{group.title}</span>
          </div>
          <div key={i} className="flex flex-wrap justify-center gap-4">
            {group.list.map(site => (
              <NavLink to={site.href} key={site.name} target="_blank">
                <SiteCard {...site} />
              </NavLink>
            ))}
          </div>
        </div>
      ))}
    </Content>
  );
};

export default Site;
