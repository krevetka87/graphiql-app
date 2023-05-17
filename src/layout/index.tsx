import { Outlet } from 'react-router-dom';
import BurgerMenu from 'src/components/BurgerMenu';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Layout = () => {
  return (
    <>
      <BurgerMenu />
      <Header />
      <main className="flex-auto w-full lg:min-h-0">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
