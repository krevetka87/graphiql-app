import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { RoutePath } from 'src/constants/common';
import { auth } from 'src/firebase';
import spinner from 'src/assets/spinner.svg';

interface PrivateRouteProps {
  type: 'auth' | 'nonAuth';
}

const RestrictedRoute = ({ type }: PrivateRouteProps) => {
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
      {loading && <img className="m-auto" src={spinner} alt="spinner" />}
      {type === 'auth' && !loading && user && <Outlet />}
      {type === 'nonAuth' && !loading && !user && <Outlet />}
    </>
  );
};

export default RestrictedRoute;
