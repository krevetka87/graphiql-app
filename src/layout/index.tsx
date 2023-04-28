import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <header />
      <main className="flex-auto w-full">
        <Outlet />
      </main>
      <footer />
    </>
  );
}
