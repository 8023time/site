import { NavLink } from "react-router";
import { Typewriter } from "../../../components/Typewriter";
import { backgroundData } from "../../../data/background.data";
import { WavesLoader, CatLoader } from "../../../components/Loader";
import { InfiniteViewBackground } from "../../../components/Background";

export default function IndexPage() {
  return (
    <div className="relative w-full h-full rounded-3xl overflow-hidden ">
      {/* 无限视图层 */}
      <InfiniteViewBackground src={backgroundData} />

      {/* 内容层 */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-8 text-center">
        {/* 小猫 */}
        <NavLink
          to="/"
          className="block transform transition-transform duration-300 hover:scale-100 active:scale-95 text-xs"
        >
          <CatLoader />
        </NavLink>

        {/* 打字机 */}
        <Typewriter
          texts={[
            "你好,我是8023time,欢迎来到我的个人网站!",
            "欢迎探索我的数字世界！",
            "代码、创意、无限可能。",
            "一起构建未来的Web!",
          ]}
          textColor="auto"
          mask={true}
          textSize={25}
          className="text-black text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold drop-shadow-2xl leading-relaxed"
        />
      </div>

      <div className="absolute bottom-0 left-0 w-full h-16 z-10">
        <WavesLoader />
      </div>
    </div>
  );
}
