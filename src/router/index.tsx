import { Navigate, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Welcome from '../pages/Welcome';
import Main from '../pages/Main';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import Layout from '../layout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Welcome />} />
      <Route path="/main" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/not-found" />} />
    </Route>
  )
);

export default router;
