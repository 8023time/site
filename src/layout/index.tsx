import Header from "./Header";
import Footer from "./Footer";
import Content from "./Content";

export default function Layout() {
  return (
    <>
      <div className="flex min-h-screen flex-col">
        <Header />
        <Content className="flex-1" />
        <Footer className="" />
      </div>
    </>
  );
}
