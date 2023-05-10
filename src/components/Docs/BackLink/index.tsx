import { schemaStore } from '../../../store';
import { ReactComponent as BackArrowIcon } from '../../../assets/back-arrow.svg';

interface BackLinkProps {
  handleBackHistory: () => void;
}

function BackLink({ handleBackHistory }: BackLinkProps) {
  return (
    <div className="flex items-center">
      <BackArrowIcon className="mr-1 w-arrow h-arrow " />
      <span className="hover:underline cursor-pointer" onClick={handleBackHistory}>
        {schemaStore.backText}
      </span>
    </div>
  );
}

export default BackLink;
