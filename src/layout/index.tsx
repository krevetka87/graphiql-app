import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

export default function Layout() {
  return (
    <>
      <Header />
      <main className="flex-auto w-full">
        <Outlet />
      </main>
      <footer />
    </>
  );
}
