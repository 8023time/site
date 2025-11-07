import { Container, Logo } from './components';
import { skills } from '@data/skill.data';
import { Tag } from '@components/Tag';
import { Content } from '@layout/index';

export default function Skill() {
  return (
    <Content>
      {skills.map((item, index) => (
        <Container key={item.name} speed={50} gap={40} direction={index % 2 === 0 ? 'left' : 'right'}>
          {item.list.map((item) => (
            <div className='flex flex-col items-center justify-center gap-2'>
              <Logo key={item.name} name={item.name} src={item.src} hoverColor={item.color} />
              <Tag>{item.name}</Tag>
            </div>
          ))}
        </Container>
      ))}
    </Content>
  );
}
