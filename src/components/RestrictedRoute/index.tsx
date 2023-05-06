import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { RoutePath } from '../../constants/common';
import { auth } from '../../firebase';

interface PrivateRouteProps {
  type: 'auth' | 'nonAuth';
}

export default function RestrictedRoute({ type }: PrivateRouteProps) {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (type === 'auth' && !loading && !user) {
      navigate(RoutePath.welcome);
    }

    if (type === 'nonAuth' && user) {
      navigate(RoutePath.main);
    }
  }, [loading, user, type, navigate]);

  return (
    <>
      {loading && <h3>Loading...</h3>}
      {type === 'auth' && !loading && user && <Outlet />}
      {type === 'nonAuth' && !loading && !user && <Outlet />}
    </>
  );
}
