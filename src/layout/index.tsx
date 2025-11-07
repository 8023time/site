import Header from './Header';
import Footer from './Footer';
import Content from './Content';
import { Outlet } from 'react-router';

const Layout = () => {
  return (
    <div className='flex min-h-screen flex-col justify-between'>
      <Header />
      <Content>
        <main className='flex-1'>
          <Outlet />
        </main>
      </Content>
      <Footer />
    </div>
  );
};

export default Layout;
export { Header, Footer, Content };
