import { Navigate, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { RoutePath } from '../constants/common';
import Welcome from '../pages/Welcome';
import Main from '../pages/Main';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import Layout from '../layout';
import RestrictedRoute from '../components/RestrictedRoute';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={RoutePath.welcome} element={<Layout />}>
      <Route index element={<Welcome />} />
      <Route element={<RestrictedRoute type="auth" />}>
        <Route path={RoutePath.main} element={<Main />} />
      </Route>
      <Route element={<RestrictedRoute type="nonAuth" />}>
        <Route path={RoutePath.login} element={<Login />} />
      </Route>
      <Route path={RoutePath.notFound} element={<NotFound />} />
      <Route path="*" element={<Navigate to={RoutePath.notFound} />} />
    </Route>
  )
);

export default router;
