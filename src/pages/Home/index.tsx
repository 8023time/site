import BackGround from "./background/index";

import { toast } from "../../components/Toast/base/index";

export default function Home() {
  toast.success("开发中.........", 100000000000000000000);

  return (
    <>
      <div className=" w-full h-full z-0">
        <BackGround />
      </div>
      <div className="w-full h-300"></div>
    </>
  );
}
