import { Outlet } from 'react-router-dom';
import BurgerMenu from 'src/components/BurgerMenu';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Layout = () => {
  return (
    <>
      <BurgerMenu />
      <Header className="flex-initial" />
      <main className="flex-auto flex">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
