import { NavLink } from 'react-router';
import { Typewriter } from '../../../components/Typewriter';
import { backgroundData } from '../../../common/data/background.data';
import { WavesLoader, CatLoader } from '../../../components/Loader';
import { InfiniteViewBackground } from '../../../components/Background';

export default function IndexPage() {
  return (
    <div className='relative aspect-[16/9] h-full w-full overflow-hidden rounded-3xl'>
      {/* 无限视图层 */}
      <InfiniteViewBackground src={backgroundData} />

      {/* 内容层 */}
      <div className='relative z-10 flex h-full flex-col items-center justify-center space-y-8 text-center'>
        {/* 小猫 */}
        <NavLink
          to='/'
          className='block transform text-xs transition-transform duration-300 hover:scale-100 active:scale-95'
        >
          <CatLoader />
        </NavLink>

        {/* 打字机 */}
        <Typewriter
          texts={[
            '你好,我是8023time,欢迎来到我的个人网站!',
            '欢迎探索我的数字世界！',
            '代码、创意、无限可能。',
            '一起构建未来的Web!',
          ]}
          textColor='auto'
          mask={true}
          textSize={25}
          className='text-xl leading-relaxed font-bold text-black drop-shadow-2xl sm:text-2xl md:text-3xl lg:text-4xl'
        />
      </div>

      <div className='absolute bottom-0 left-0 z-10 h-16 w-full'>
        <WavesLoader />
      </div>
    </div>
  );
}
