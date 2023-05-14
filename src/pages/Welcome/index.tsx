import { Link } from 'react-router-dom';

const Welcome = () => {
  return (
    <div className="flex flex-col gap-4 items-start justify-start">
      <h2>Welcome</h2>
      <Link to="/main" className="px-4 py-2 border border-purple-500 rounded-xl">
        To Main
      </Link>
      <Link to="/login" className="px-4 py-2 border border-purple-500 rounded-xl">
        To Login
      </Link>
    </div>
  );
};

export default Welcome;
