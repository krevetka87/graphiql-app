import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';

export default function Layout() {
  return (
    <>
      <header className="flex-initial" />
      <main className="flex-auto flex flex-col">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
