import BackGround from './background/index';
import Content from '@layout/Content/index';
import MDXContent from '@generated/test';

export default function Home() {
  return (
    <>
      <div className='z-0 w-full'>
        <BackGround />
      </div>
      <Content>
        <MDXContent></MDXContent>
      </Content>
    </>
  );
}
