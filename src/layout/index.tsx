import Header from "./Header";
import Footer from "./Footer";
import Content from "./Content";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <>
      <Header className="" />
      <Content>
        <main className="flex-1">
          <Outlet />
        </main>
      </Content>
      <Footer />
    </>
  );
};

export default Layout;
export { Header, Footer, Content };
