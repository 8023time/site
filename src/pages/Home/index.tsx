import BackGround from "./background/index";
import Content from "../../layout/Content/index";
import MDXContent from "../../generated/test";

export default function Home() {
  return (
    <>
      <div className=" w-full h-250 z-0">
        <BackGround />
      </div>
      <Content>
        <MDXContent></MDXContent>
      </Content>
    </>
  );
}
