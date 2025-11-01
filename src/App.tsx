import "./App.css";
import router from "./router/index";
import Cursor from "./components/Cursor";
import { RouterProvider } from "react-router";
import { GridBackground } from "./components/Background";

export default function App() {
  return (
    <>
      {/* {鼠标效果} */}
      <Cursor />
      {/* {背景效果} */}
      <div className="fixed top-0 left-0 w-full h-full -z-1">
        {/* <ParticlesBackground
          particleColors={["#ffffff", "#ffffff"]}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        /> */}
        <GridBackground
          direction="diagonal"
          speed={0.3}
          squareSize={35}
          borderColor="#eaeaea"
        />
      </div>
      {/* {路由 */}
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}
