import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';

const Layout = () => {
  return (
    <>
      <header className="flex-initial" />
      <main className="flex-auto flex">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
