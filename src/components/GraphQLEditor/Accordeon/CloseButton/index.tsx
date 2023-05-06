import { MouseEventHandler } from 'react';
import ArrowDownIcon from './ArrowDownIcon';
import ArrowUpIcon from './ArrowUpIcon';

interface ICloseButtonProps {
  isOpen: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

function CloseButton({ isOpen, onClick }: ICloseButtonProps) {
  return (
    <button type="button" onClick={onClick}>
      {isOpen ? <ArrowDownIcon /> : <ArrowUpIcon />}
    </button>
  );
}

export default CloseButton;
