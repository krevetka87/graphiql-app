import { MouseEventHandler } from 'react';
import { ReactComponent as ArrowDownIcon } from '../../../../assets/arrow-down.svg';
import { ReactComponent as ArrowUpIcon } from '../../../../assets/arrow-up.svg';

interface CloseButtonProps {
  isOpen: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const CloseButton = ({ isOpen, onClick }: CloseButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="[&>*:first-child]:w-4 [&>*:first-child]:h-4 md:[&>*:first-child]:w-6 md:[&>*:first-child]:h-6"
    >
      {isOpen ? <ArrowDownIcon /> : <ArrowUpIcon />}
    </button>
  );
};

export default CloseButton;
