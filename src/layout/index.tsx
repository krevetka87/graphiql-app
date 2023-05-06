import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <header />
      <main className="flex-auto m-5 flex flex-col">
        <Outlet />
      </main>
      <footer />
    </>
  );
}
