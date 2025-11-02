import "./App.css";
import router from "./router/index";
import Cursor from "./components/Cursor";
import { RouterProvider } from "react-router";
import { GridBackground } from "./components/Background";
import { ToastContainer } from "./components/Toast/base/index";

export default function App() {
  return (
    <>
      {/* {Toast信息提示容器} */}
      <ToastContainer />
      {/* {鼠标效果} */}
      <Cursor />
      {/* {背景效果} */}
      <div className="fixed top-0 left-0 w-full h-full -z-1">
        <GridBackground direction="diagonal" speed={0.3} squareSize={35} borderColor="#eaeaea" />
      </div>
      {/* {路由} */}
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}
