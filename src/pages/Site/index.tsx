import { NavLink } from 'react-router';
import { Content } from '@layout/index';
import { siteData } from '@data/site.data';
import { SiteCard } from '@components/Card';

const Site = () => {
  return (
    <Content>
      {/* 卡片网格 */}
      {siteData.map((group, i) => (
        <div key={i}>
          <div className='flex justify-center gap-10 py-10'>
            <img src={group.logo} width={35} loading='lazy' />
            <span className='text-2xl font-bold'>{group.title}</span>
          </div>
          <div key={i} className='flex flex-wrap justify-center gap-4'>
            {group.list.map((site) => (
              <NavLink to={site.href} key={site.name} target='_blank'>
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
