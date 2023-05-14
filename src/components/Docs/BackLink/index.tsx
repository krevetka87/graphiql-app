import { schemaStore } from '../../../store';
import { ReactComponent as BackArrowIcon } from '../../../assets/back-arrow.svg';

interface BackLinkProps {
  handleBackHistory: () => void;
}

const BackLink = ({ handleBackHistory }: BackLinkProps) => {
  const { backText } = schemaStore;

  return (
    <div className="flex items-center">
      <BackArrowIcon className="mr-1 w-arrow h-arrow " />
      <span className="hover:underline cursor-pointer" onClick={handleBackHistory}>
        {backText}
      </span>
    </div>
  );
};

export default BackLink;
