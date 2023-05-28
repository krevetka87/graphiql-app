import { Outlet } from 'react-router-dom';
import BurgerMenu from 'src/components/BurgerMenu';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Layout = () => {
  return (
    <>
      <BurgerMenu />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
