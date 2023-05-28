import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface LinkWithBorderProps {
  to: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}
const LinkWithBorder = ({ to, children, className, onClick }: LinkWithBorderProps) => {
  return (
    <Link
      className={`text-xl font-semibold after:transition-all after:content-[''] after:block after:border-b after:scale-x-0 hover:after:scale-100 ${className}`}
      to={to}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

LinkWithBorder.defaultProps = {
  className: '',
  onClick: () => {},
};

export default LinkWithBorder;
