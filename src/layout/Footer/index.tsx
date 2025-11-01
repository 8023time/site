import { Typewriter } from "../../components/Typewriter/index";

export default function Footer() {
  return (
    <footer className="w-full h-14 flex justify-between items-center shadow-md dark:shadow-white/10 backdrop-blur px-10 z-50 ">
      {/* 左侧：版权信息 */}
      <span className="text-sm text-muted-foreground">
        ©2024-2025 By 8023time
      </span>
      {/* 右侧：打字机效果 */}
      <Typewriter
        texts={[
          "云雾依稀折柳枝",
          "凭栏更待青云月",
          "请君莫辞凌烟走",
          "惟愿神秀尽前时",
        ]}
        className="text-sm text-muted-foreground"
      />
    </footer>
  );
}
