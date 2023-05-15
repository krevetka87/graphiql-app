import { Outlet } from 'react-router-dom';
import BurgerMenu from 'src/components/BurgerMenu';
import Header from '../components/Header';

export default function Layout() {
  return (
    <>
      <BurgerMenu />
      <Header />
      <main className="flex-auto w-full">
        <Outlet />
      </main>
      <footer />
    </>
  );
}
