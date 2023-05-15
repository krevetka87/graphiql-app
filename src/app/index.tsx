import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import router from '../router';
import '../localization';
import 'react-toastify/dist/ReactToastify.min.css';

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position="bottom-right" />
    </>
  );
};

export default App;
