import Header from "./Header";
import Footer from "./Footer";
import Content from "./Content";

export default function Layout() {
  return (
    <>
      <div className="flex min-h-screen flex-col">
        <Header className="fixed top-0 left-0" />
        <Content className="flex-1" />
        <Footer />
      </div>
    </>
  );
}
